import { useState } from "react";
import FloatingButton from "./components/FloatingButton";
import ChatWindow from "./components/ChatWindow";
import ContactForm from "./components/ContactForm";
import { useChat } from "./components/ChatContext";
import { processAIResponse } from "./helpers/ai";
import { SHOW_CONTACT_FORM } from "./helpers/config";

export default function App() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage("Você", input);

    processAIResponse(input).then((response) => {
      sendMessage("Bot", response.text);
    }).catch((error) => {
      console.error("AI response error:", error);
      sendMessage("Bot", "Desculpe, ocorreu um erro ao processar sua mensagem.");
    }).finally(() => {
      setInput("");
    });
  };

  const closeChatAndOpenForm = () => {
      setChatOpen(false);
      setExpanded(false);
      setFormOpen(SHOW_CONTACT_FORM);
  };

  const onBackToChat = () => {
    setFormOpen(false);
    setChatOpen(true);
  }

  return (
    <div className="tw:h-screen tw:bg-gray-100">
      <FloatingButton onClick={() => setChatOpen(true)} />

      {chatOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={handleSend}
          expanded={expanded}
          setExpanded={setExpanded}
          closeChatAndOpenForm={closeChatAndOpenForm}
        />
      )}

      {formOpen && <ContactForm onClose={() => setFormOpen(false)} onBackToChat={onBackToChat} />}
    </div>
  );
}
