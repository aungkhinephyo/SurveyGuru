export const TextareaType = ({ question, answerChange }) => {
  return (
    <div className="mt-2">
      <textarea
        onChange={(ev) => answerChange(ev.target.value)}
        placeholder="Type here"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      ></textarea>
    </div>
  );
};
