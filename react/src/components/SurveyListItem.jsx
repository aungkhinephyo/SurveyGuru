import { TButton } from "./core/TButton";
import {
  PencilIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

const textClip = (text) => {
  let modifiedText = "";
  if (text.length > 190) {
    modifiedText = text.substring(0, 195) + "...";
  } else {
    modifiedText = text;
  }
  return modifiedText;
};

export const SurveyListItem = ({ survey, onDeleteClick }) => {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <img
        src={survey.image_url}
        alt={survey.title}
        className="w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold truncate">{survey.title}</h4>
      <div
        // dangerouslySetInnerHTML={{ __html: survey.description }}
        className="overflow-hidden flex-1"
      >
        {textClip(survey.description)}
      </div>

      <div className="flex justify-between items-center mt-3">
        <TButton to={`/surveys/${survey.id}`}>
          <PencilIcon className="w-5 h-5 mr-2 " />
          Edit
        </TButton>
        <div className="flex items-center">
          <TButton to={`/surveys/${survey.slug}/answers`} circle link>
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
          </TButton>

          <TButton href={`/survey/public/${survey.slug}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </TButton>

          {survey.id && (
            <TButton
              onClick={(ev) => onDeleteClick(survey.id)}
              circle
              link
              color="red"
            >
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  );
};
