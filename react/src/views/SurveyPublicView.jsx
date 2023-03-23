import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import { Loading } from "../components/core/Loading";
import { PublicQuestion } from "../components/PublicQuestion";

export default function SurveyPublicView() {
  const { slug } = useParams();
  const [survey, setSurvey] = useState({});
  const [loading, setLoading] = useState(true);
  const answers = {};
  const [surveyFinish, setSurveyFinish] = useState(false);

  const answerChange = (question, value) => {
    answers[question.id] = value;
    console.log(question, value);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log(answers);
    axiosClient
      .post(`/survey/${survey.id}/answer`, { answers })
      .then((response) => {
        debugger;
        setSurveyFinish(true);
      });
  };

  useEffect(() => {
    axiosClient.get(`/survey/get-by-slug/${slug}`).then(({ data }) => {
      setSurvey(data.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading && <Loading />}
      {/* {<pre>{ JSON.stringify(survey,undefined,2) }</pre>} */}
      {/* col-start-1 col-span-12 sm:col-start-3  */}
      {!loading && (
        <div className="bg-white h-screen grid grid-cols-12">
          <div className="col-start-1 col-span-12 sm:col-start-3 sm:col-span-8">
            <div>
              <form
                onSubmit={(ev) => onSubmit(ev)}
                className="py-10 px-3 mx-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                  <div className="col-span-1">
                    <img
                      src={survey.image_url}
                      alt="Photo"
                      className="w-[200px] mx-auto"
                    />
                  </div>
                  <div className="col-span-1">
                    <h1 className="text-2xl font-bold">{survey.title}</h1>
                    <p className="font-semibold">
                      Expire Date:{" "}
                      <span className="">{survey.expire_date}</span>
                    </p>
                    <p className="mt-3">{survey.description}</p>
                  </div>
                </div>

                {surveyFinish && (
                  <div className="w-[350px] py-4 px-4 mx-auto mt-8 text-white text-center bg-emerald-500 rounded-md">
                    Your feedback is important to us, and we are grateful for
                    your participation in our survey. Thank you!
                  </div>
                )}

                {!surveyFinish && (
                  <>
                    <div className="mt-5">
                      {survey.questions.length > 0 &&
                        survey.questions.map((question, index) => (
                          <PublicQuestion
                            key={question.id}
                            question={question}
                            index={index}
                            answerChange={(val) => answerChange(question, val)}
                          />
                        ))}
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="flex w-1/2 justify-center mx-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
