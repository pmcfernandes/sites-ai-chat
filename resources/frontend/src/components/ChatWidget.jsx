import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import MessageList from './MessageList.jsx';

function ChatWidget({ messages, sendMessage, input, setInput }) {
   const [userIsTyping, setUserIsTyping] = useState(false);

   const sendMessageHandler = () => {
      if (!input.trim()) return;
      setUserIsTyping(true);

      setTimeout(() => {
         sendMessage('User', input.trim());
         setInput('');
         setUserIsTyping(false);
      }, 1000);
   };

   return (
      <>
         <MessageList messages={messages} userIsTyping={userIsTyping} />

         <div className="tw:flex tw:gap-2 tw:border-t tw:border-gray-300 tw:dark:border-gray-600 tw:p-3">
            <input
               className="tw:flex-1 tw:rounded-sm tw:border tw:border-gray-300 tw:px-3 tw:py-2 tw:text-sm focus:tw:outline-none tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && sendMessageHandler()}
               placeholder="Digite uma mensagem..."
            />
            <button
               onClick={sendMessageHandler}
               className="tw:rounded-sm tw:bg-[#2D6FB4] tw:px-4 tw:py-2 tw:text-sm tw:text-white tw:flex tw:items-center tw:justify-center tw:cursor-pointer"
               title="Enviar"
               aria-label="Send message"
            >
               <PaperAirplaneIcon className="tw:h-5 tw:w-5 tw:rotate-320" />
            </button>
         </div>
      </>
   );
}

export default ChatWidget;
