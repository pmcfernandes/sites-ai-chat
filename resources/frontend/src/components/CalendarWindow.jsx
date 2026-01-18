import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Calendar from "./Calendar";
import SuccessMessage from "./SuccessMessage";

function CalendarWindow({ onClose }) {
   const [success, setSuccess] = useState(false);

   return (
      <div className="tw:fixed tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:bg-black/40">
         <div className="tw:w-[800px] tw:h-[555px] tw:rounded-xs tw:bg-white tw:shadow-2xl tw:flex tw:flex-col tw:dark:bg-gray-800 tw:dark:text-white">
            <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:border-gray-300 tw:dark:border-gray-600 tw:p-4 tw:text-lg tw:font-semibold">
               <span>Marque uma reunião</span>
               <button onClick={onClose} className="tw:text-gray-500 hover:tw:text-gray-800 dark:hover:tw:text-gray-200 tw:p-1 tw:cursor-pointer">
                  <XMarkIcon className="tw:h-5 tw:w-5" />
               </button>
            </div >

            <div className="tw:flex-1 tw:p-4 tw:overflow-auto">

               {success
                  ? <SuccessMessage onBackToChat={onClose} />
                  : <Calendar setSuccess={setSuccess} />}

            </div>

         </div>
      </div>
   );
}

export default CalendarWindow;
