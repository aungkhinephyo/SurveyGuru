export const SelectType = ({ question, answerChange }) => {
  return (
    <div className="mt-2">
      <select
        onChange={(ev) => answerChange(ev.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md border bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm cursor-pointer"
      >
        <option value="">--Select--</option>
        {question.data.options.map((option) => (
          <option value={option.text} key={option.uuid}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
