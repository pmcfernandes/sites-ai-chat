import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="tw:fixed tw:bottom-6 tw:right-6 tw:z-40 tw:flex tw:h-14 tw:w-14 tw:items-center tw:justify-center tw:rounded-full tw:bg-[#2D6FB4] tw:text-white tw:shadow-lg tw:cursor-pointer tw:transition tw:duration-200"
      aria-label="Open chat"
    >
      <ChatBubbleLeftEllipsisIcon className="tw:h-7 tw:w-7" />
    </button>
  );
}

export default FloatingButton;
