import Avatar from "./Avatar";
import parse from 'html-react-parser';
import { parseMarkdownToReact } from '../helpers/html';
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale"

function Message({ msg }) {
   const isUser = msg.author === "Você";

   return (
      <div className={`tw:flex tw:items-start tw:gap-3 ${isUser ? "tw:justify-end" : "tw:justify-start"}`}>
         {/* avatar left for bot */}
         {!isUser && <Avatar name={msg.author} isUser={false} />}

         <div className={`tw:flex tw:flex-col ${isUser ? 'tw:items-end' : 'tw:items-start'} tw:max-w-[70%]`}>
            <div className={`tw:mb-1 tw:text-xs tw:opacity-60 ${isUser ? 'tw:text-right' : 'tw:text-left'}`}>
               <span>{msg.author} - <i>{formatDistanceToNow(new Date(msg.id), { addSuffix: true, locale: pt })}</i></span>
            </div>

            <div
               className={`message-content tw:rounded-sm tw:px-4 tw:py-2 tw:text-sm tw:leading-relaxed ${isUser ? "tw:bg-[#2D6FB4] tw:text-white tw:rounded-br-sm" : "tw:bg-gray-200 tw:text-gray-800 tw:rounded-bl-sm tw:dark:bg-gray-700 tw:dark:text-white "}`}
            >
               {parse(parseMarkdownToReact(msg.text))}
            </div>
         </div>

         {/* avatar right for user */}
         <div className="tw:hidden">
            {isUser && <Avatar name={msg.author} isUser={true} />}
         </div>
      </div>
   );
}

export default Message;
