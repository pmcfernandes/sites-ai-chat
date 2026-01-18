import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import WaitMessage from "./WaitMessage.jsx";

function MessageList({ messages, userIsTyping }) {
   const containerRef = useRef(null);

   useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
   }, [messages]);

   return (
      <div ref={containerRef} className="tw:flex-1 tw:space-y-3 tw:overflow-y-auto tw:p-4 tw:pb-10 tw:bg-white tw:dark:bg-gray-800">
         {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
         ))}

         <div className="tw:absolute tw:bottom-15 tw:left-0 tw:right-0">
            {userIsTyping && <WaitMessage />}
         </div>
      </div>
   );
}

export default MessageList;
