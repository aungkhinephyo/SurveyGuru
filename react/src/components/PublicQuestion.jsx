import { CheckboxType } from "./questionTypes/CheckboxType";
import { RadioType } from "./questionTypes/RadioType";
import { SelectType } from "./questionTypes/SelectType";
import { TextareaType } from "./questionTypes/TextareaType";
import { TextType } from "./questionTypes/TextType";

export const PublicQuestion = ({ question, index, answerChange }) => {
    
    let checkboxOptions = [];

    const checkboxChange = (ev,option) => {
        if (ev.target.checked) {
            checkboxOptions.push(option.text);
        } else {
            checkboxOptions = checkboxOptions.filter((op) => op != option.text)
        }
        answerChange(checkboxOptions)
    }

    return (
        <div className="mb-4">
            <div className="flex gap-2">
                <span className="font-semibold">{index + 1}.</span>
                <div>
                    <p className="capitalize font-bold">{question.question}</p>
                    <p className="text-gray-600 text-sm">{question.description}</p>
                </div>
            </div>
            <div className="mt-1 ml-5">
                {question.type === 'text' && <TextType question={question} answerChange={answerChange} />}
                {question.type === 'textarea' && <TextareaType question={question} answerChange={answerChange} />}
                {question.type === 'select' && <SelectType question={question} answerChange={answerChange} />}
                {question.type === 'radio' && <RadioType question={question} answerChange={answerChange} />}
                {question.type === 'checkbox' && <CheckboxType question={question} checkboxChange={checkboxChange} />}
            </div>
        </div>
    );
}