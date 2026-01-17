import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();
const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
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
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { ChatProvider, useChat };
