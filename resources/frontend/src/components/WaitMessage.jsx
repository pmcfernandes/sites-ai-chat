function WaitMessage() {
   return (
      <div className="tw:p-4 tw:text-left tw:text-gray-600 tw:flex tw:items-center tw:gap-3" role="status" aria-live="polite">
         <span className="tw:flex tw:items-center">
            <span className="tw:inline-block tw:w-2.5 tw:h-2.5 tw:bg-gray-600 tw:dark:bg-gray-300 tw:rounded-full tw:animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="tw:inline-block tw:w-2.5 tw:h-2.5 tw:bg-gray-600 tw:dark:bg-gray-300 tw:rounded-full tw:ml-1 tw:animate-bounce" style={{ animationDelay: '0.12s' }} />
            <span className="tw:inline-block tw:w-2.5 tw:h-2.5 tw:bg-gray-600 tw:dark:bg-gray-300 tw:rounded-full tw:ml-1 tw:animate-bounce" style={{ animationDelay: '0.24s' }} />
         </span>
      </div>
   );
}

export default WaitMessage;
