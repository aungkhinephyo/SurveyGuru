import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios";
import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TButton } from "../components/core/TButton";
import { SurveyQuestions } from "../components/SurveyQuestions";
import { Loading } from "../components/core/Loading";
import { useStateContext } from "../contexts/ContextProvider";

export default function SurveyView() {
  const { showToast } = useStateContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const onSubmit = (ev) => {
    ev.preventDefault();
    // console.log(survey);
    const payload = { ...survey };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;

    let res = null;

    if (id) {
      res = axiosClient.put(`/survey/${id}`, payload);
    } else {
      res = axiosClient.post("/survey", payload);
    }
    res
      .then((res) => {
        console.log(res);
        navigate("/surveys");
        showToast(id ? "The survey is updated." : "New survey is created.");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.errors);
          console.log(error);
        }
        console.log(err);
      });
  };

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSurvey({
        ...survey,
        image: file,
        image_url: reader.result,
      });
      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const onQuestionsUpdate = (q) => {
    // debugger;
    setSurvey({ ...survey, questions: q });
  };

  const onDeleteClick = (id) => {
    console.log("gg");
  };

  useEffect(() => {
    if (id) {
      axiosClient.get(`/survey/${id}`).then(({ data }) => {
        // console.log(data.data);
        setSurvey(data.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <PageComponent
      title={id ? "Update Survey" : "Create New Survey"}
      buttons={
        id && (
          <div className="flex gap-2">
            <TButton href={`/survey/public/${survey.slug}`} color="green">
              <LinkIcon className="w-5 h-5 mr-2" />
              Public View
            </TButton>
            <TButton onClick={(ev) => onDeleteClick(survey.id)} color="red">
              <TrashIcon className="w-5 h-5 mr-2" />
              Delete
            </TButton>
          </div>
        )
      }
    >
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={onSubmit} action="" method="POST">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

              {/* <pre>{JSON.stringify(survey, undefined, 2)}</pre> */}

              {/*Image*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  {survey.image_url && (
                    <img
                      src={survey.image_url}
                      alt=""
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  {!survey.image_url && (
                    <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-8 h-8" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      accept="image/*"
                      onChange={onImageChoose}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/*Image*/}

              {/*Title*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Survey Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={survey.title || ""}
                  onChange={(ev) =>
                    setSurvey({ ...survey, title: ev.target.value })
                  }
                  placeholder="Survey Title"
                  className={`mt-1 block w-full rounded-md ${
                    error.title ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                />
                {error.title && (
                  <small className="text-red-500">* {error.title[0]}</small>
                )}
              </div>
              {/*Title*/}

              {/*Description*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={survey.description || ""}
                  onChange={(ev) =>
                    setSurvey({ ...survey, description: ev.target.value })
                  }
                  placeholder="Describe your survey"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/*Description*/}

              {/*Expire Date*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="expire_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expire Date
                </label>
                <input
                  type="date"
                  name="expire_date"
                  id="expire_date"
                  value={survey.expire_date}
                  onChange={(ev) =>
                    setSurvey({ ...survey, expire_date: ev.target.value })
                  }
                  className={`mt-1 block w-full rounded-md ${
                    error.expire_date ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                />
                {error.expire_date && (
                  <small className="text-red-500">
                    * {error.expire_date[0]}
                  </small>
                )}
              </div>
              {/*Expire Date*/}

              {/*Active*/}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    checked={survey.status}
                    onChange={(ev) =>
                      setSurvey({ ...survey, status: ev.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether to make survey publicly available
                  </p>
                </div>
              </div>
              {/*Active*/}

              {/* Questions */}
              <SurveyQuestions
                questions={survey.questions}
                onQuestionsUpdate={onQuestionsUpdate}
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      )}
    </PageComponent>
  );
}
