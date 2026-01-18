import { createContext, useContext, useState, useEffect } from 'react';
import { getConfig } from '../helpers/api';

const ChatContext = createContext();
const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
   const [config, setConfig] = useState(null);
   const [messages, setMessages] = useState(() => {
      try {
         const raw = sessionStorage.getItem('chat_messages');
         const data = raw ? JSON.parse(raw) : [];

         if (Array.isArray(data) && data.length === 0) {
            const welcomeMessage = {
               id: Date.now(),
               author: "Bot",
               text: "Olá! Como posso ajudar? 👋"
            };

            sessionStorage.setItem('chat_messages', JSON.stringify([welcomeMessage]));
            return [welcomeMessage];
         }

         return data;
      } catch {
         return [];
      }
   });

   useEffect(() => {
      getConfig().then((data) => {
         setConfig(data);
      }).catch((error) => {
         console.error("Error fetching config:", error);
         setConfig({
            chatWindowTitle: 'Assistente HBR',
            chatWelcomeMessage: 'Olá! Como posso ajudar? 👋',
            enableContactForm: false,
            enableMeetingForm: false,
         });
   });
}, []);

const sendMessage = (author, text) => {
   const newMessage = {
      id: Date.now(),
      author,
      text
   };

   setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      sessionStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
      return updatedMessages;
   });
};

return (
   <ChatContext.Provider value={{ config, messages, sendMessage }}>
      {children}
   </ChatContext.Provider>
);
};

// eslint-disable-next-line react-refresh/only-export-components
export { ChatProvider, useChat };
