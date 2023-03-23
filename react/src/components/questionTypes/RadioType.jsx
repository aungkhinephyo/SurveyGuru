export const RadioType = ({ question, answerChange }) => {
  return (
    <div className="mt-2">
      {question.data.options.map((option) => (
        <div className="flex gap-2 items-center mb-1" key={option.uuid}>
          <input
            type="radio"
            name={"question" + question.id}
            value={option.text}
            onChange={(ev) => answerChange(ev.target.value)}
            id={option.uuid}
            className="text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor={option.uuid} className="cursor-pointer">
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
};
