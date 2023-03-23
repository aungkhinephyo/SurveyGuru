import { PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { QuestionEditor } from "./QuestionEditor";

export const SurveyQuestions = ({questions,onQuestionsUpdate}) => {
  const [myQuestions, setMyQuestions] = useState([...questions]);

  const addQuestion = (index = 0) => {
    // debugger;
    const newQuestion = {
      id: uuidv4(),
      type: "text",
      question: "",
      description: "",
      data: {}
    };
    myQuestions.splice(index, 0, newQuestion)
    setMyQuestions([...myQuestions])
  }

  const questionChange = (question) => {
    if (!question) return;
    const newQuestions = myQuestions.map((q) => {
      if (q.id === question.id) {
        return { ...question };
      }
      return q;
    })
    setMyQuestions([...newQuestions])
  }

  const deleteQuestion = (question) => {
    if (!question) return;
    const newQuestions = myQuestions.filter((q) => q.id !== question.id);
    setMyQuestions([...newQuestions])
  }

  useEffect(() => {
    onQuestionsUpdate(myQuestions)
  }, [myQuestions]);

  return (
    <>
      {/* <pre>{JSON.stringify(questions,undefined,2)}</pre> */}
      
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Questions</h3>
        <button
          type="button"
          className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
          onClick={() => addQuestion()}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Question
        </button>
      </div>
      {myQuestions.length > 0 ? (
          myQuestions.map((q,key) => {
            return (
              <QuestionEditor
                key={q.id}
                index={key}
                question={q}
                deleteQuestion={deleteQuestion}
                questionChange={questionChange}
                addQuestion={addQuestion}
              />
            )
          })
        ) : (
          <div className="text-gray-400 text-center py-4">
            You haven't created any question yet.
          </div>
        )}
    </>
  )
}
