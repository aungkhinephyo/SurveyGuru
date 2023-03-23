import { useStateContext } from "../contexts/ContextProvider";
import PageComponent from "../components/PageComponent";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { TButton } from "../components/core/TButton";
import { SurveyListItem } from "../components/SurveyListItem";
import { useEffect, useState } from "react";
import axiosClient from '../axios';
import { PaginationLinks } from "../components/PaginationLinks";
import { Loading } from '../components/core/Loading';
import { useNavigate } from "react-router-dom";

export default function Surveys() {
  const { showToast } = useStateContext();
  // console.log(surveys);

  const [loading,setLoading] = useState(true);
  const [surveys,setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  
  const getSurveys = (url = '/survey') => {
    axiosClient.get(url)
      .then(({ data }) => {
        setSurveys(data.data);
        setMeta(data.meta);
        setLoading(false);
      })
  }

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure to delete this survey?')) {
      axiosClient.delete(`/survey/${id}`)
        .then(() => {
          getSurveys();
          showToast("The survey is deleted.");
      })
    }
  }

  const onPageClick = (link) => {
    getSurveys(link.url);
  }

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <PageComponent title="Survey"
      buttons={(
        <TButton color="green" to="/surveys/create" >
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Create New
        </TButton>
      )}
    >
      {loading && <Loading/>}
      {!loading && surveys.length === 0 && <div className="text-center text-gray-700 font-bold py-7">There is no survey you created.</div>}
      {!loading && 
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {
              surveys.map((survey) => {
                return <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
              })
            }
          </div>

          {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} /> }
        </div>
      }
    </PageComponent>
  );
}
