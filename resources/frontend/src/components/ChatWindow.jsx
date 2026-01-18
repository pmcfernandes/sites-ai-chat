import { useState } from "react";
import { ArrowTopRightOnSquareIcon, XMarkIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import ChatWidget from "./ChatWidget";
import CalendarWindow from "./CalendarWindow";
import { useChat } from "./ChatContext";

function ChatWindow({
   messages,
   input,
   setInput,
   sendMessage,
   expanded,
   setExpanded,
   closeChatAndOpenForm,
}) {
   const { config } = useChat();
   const [enabledMeetingForm, _] = useState(config.enableMeetingForm || false);
   const [calendarOpen, setCalendarOpen] = useState(false);

   return (
      <>

         <div
            className={`tw:fixed tw:z-50 tw:bg-white tw:shadow-2xl tw:transition-all tw:duration-300 tw:rounded-sm tw:flex tw:flex-col tw:dark:bg-gray-800 tw:dark:text-white ${expanded
               ? "tw:top-[25px] tw:bottom-[25px] tw:left-[25px] tw:right-[25px]"
               : "tw:bottom-24 tw:right-6 tw:h-[70vh] tw:w-[25rem]"
               }` + (calendarOpen ? " tw:hidden" : "")}
         >
            <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:border-gray-300 tw:dark:border-gray-600 tw:p-4 tw:text-lg tw:font-semibold">
               <span>{config ? config.chatWindowTitle : 'Chat'}</span>
               <div className="tw:flex tw:gap-3">
                  {enabledMeetingForm && (
                     <button
                        onClick={() => setCalendarOpen(true)}
                        className="tw:text-gray-500 hover:tw:text-gray-800 dark:hover:tw:text-gray-200 tw:p-1 tw:cursor-pointer"
                        title="Marcar uma reunião"
                        aria-label="Open calendar"
                     >
                        <CalendarDaysIcon className="tw:h-5 tw:w-5" />
                     </button>)}
                  <button
                     onClick={() => setExpanded((v) => !v)}
                     className="tw:text-gray-500 hover:tw:text-gray-800 dark:hover:tw:text-gray-200 tw:p-1 tw:cursor-pointer"
                     title="Expandir"
                     aria-label="Toggle expand chat"
                  >
                     {!expanded ? (<ArrowTopRightOnSquareIcon className="tw:h-5 tw:w-5" />) : (
                        <ArrowTopRightOnSquareIcon className="tw:h-5 tw:w-5 tw:transform tw:rotate-180" />
                     )}
                  </button>
                  <button
                     onClick={closeChatAndOpenForm}
                     className="tw:text-gray-500 hover:tw:text-gray-800 dark:hover:tw:text-gray-200 tw:p-1 tw:cursor-pointer"
                     title="Fechar"
                     aria-label="Close chat and open contact form"
                  >
                     <XMarkIcon className="tw:h-5 tw:w-5" />
                  </button>
               </div>
            </div>

            <ChatWidget
               messages={messages}
               input={input}
               setInput={setInput}
               sendMessage={sendMessage}
            />
         </div>

         {(enabledMeetingForm && calendarOpen) && <CalendarWindow onClose={() => setCalendarOpen(false)} />}
      </>
   );
}

export default ChatWindow;
