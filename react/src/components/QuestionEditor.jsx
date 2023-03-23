import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import { v4 as uuidv4 } from 'uuid';

export const QuestionEditor = ({
  index = 0,
  question,
  addQuestion,
  questionChange,
  deleteQuestion,
}) => {
  const [model, setModel] = useState({...question});
  const { questionTypes } = useStateContext();

  useEffect(() => {
    questionChange(model)
  }, [model])

  const upperCaseFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const needOptions = (type = null) => {
    let optionTypes = ['select', 'checkbox', 'radio'];
    return optionTypes.includes(type);
  }
  
  const addOption = (ev) => {
    ev.preventDefault();
    model.data.options.push({
      uuid: uuidv4(),
      text: '',
    })
    setModel({...model})
  }

  const onTypeChange = (ev) => {
    const newModel = { ...model, type: ev.target.value }
    if (!needOptions(model.type) && needOptions(ev.target.value)) {
      if (!model.data.options) {
        newModel.data = {
          options: [{uuid: uuidv4(), text: ''}]
        }
      }
      setModel({...newModel})
    } else if (
      needOptions(model.type) && needOptions(ev.target.value)
      || !needOptions(model.type) && !needOptions(ev.target.value)
    ) {
      setModel({ ...newModel})
    } else {
      setModel({...newModel, data:{}})
    }
  }

  const deleteOption = (uuid) => {
    const newOptions = model.data.options.filter((option) => option.uuid !== uuid)
    setModel({ ...model, data: {options: newOptions} });
  }

  const onOptionTextChange = (ev,uuid) => {
    const newOptions = model.data.options.map((option) => {
      if (option.uuid === uuid) {
        option = {...option, text: ev.target.value}
      }
      return option;
    })
    setModel({...model, data: {options: newOptions}})
  }


  return (
    <>
      <div className="mb-3 py-3 px-5 bg-slate-50 rounded-md">
        <div className="flex justify-between mb-3">
          <h4>
            {index + 1}. {model.question}
          </h4>
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              onClick={() => addQuestion(index + 1)}
            >
              <PlusIcon className="w-4 mr-1" />
              Add
            </button>
            <button
              type="button"
              className="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"
              onClick={() => deleteQuestion(question)}
            >
              <TrashIcon className="w-4 mr-1" />
              Delete
            </button>
          </div>
        </div>

        <div className="flex gap-3 justify-between mb-3">
          {/* Question Text */}
          <div className="flex-1">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              value={model.question}
              onChange={(ev) =>
                setModel({ ...model, question: ev.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {/* Question Text */}

          {/* Question Type */}
          <div>
            <label
              htmlFor="questionType"
              className="block text-sm font-medium text-gray-700 w-40"
            >
              Question Type
            </label>
            <select
              id="questionType"
              name="questionType"
              value={model.type}
              onChange={onTypeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {questionTypes.map((type) => (
                <option value={type} key={type}>
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>
          </div>
          {/* Question Type */}
        </div>

        {/*Description*/}
        <div className="mb-3">
          <label
            htmlFor="questionDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="questionDescription"
            id="questionDescription"
            value={model.description || ""}
            onChange={(ev) =>
              setModel({ ...model, description: ev.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        {/*Description*/}

        
        {/* Options for checkbox, select, radio */}
        {
          needOptions(model.type) &&
          <div className="mb-3">
          <div className="flex justify-between items-center mt-3 mb-1">
            <label
            htmlFor="questionOptions"
            className="block text-sm font-medium text-gray-700"
            >
              Options
            </label>
            <button
              type="button"
              onClick={(ev) => addOption(ev)}
              className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            >
              <PlusIcon className="w-4 mr-1" />
              Add Option
            </button>
          </div>
          
          { model.data.options.length === 0 && <div className="text-gray-400 text-sm font-semibold text-center py-3">There is no option created.</div>}
          {
            // model.data.options.length > 0 && 
            model.data.options.map((option, index) => (
              <div className="flex items-center mt-3" key={index}>
                <p className="mx-4">{index + 1}.</p>
                <input
                  type="text"
                  value={option.text}
                  onChange={(ev) => onOptionTextChange(ev,option.uuid)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Option Name" />
                <button
                    type="button"
                    onClick={() => deleteOption(option.uuid)}
                    className="flex items-center text-xs text-center p-1 ml-2 rounded-md border border-transparent text-red-500 hover:border-red-600 hover:bg-gray-50"
                  >
                    <TrashIcon className="w-5" />
                </button>
              </div>
            ))
          }
        </div>
        }

      </div>
    </>
  );
}
