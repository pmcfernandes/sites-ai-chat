import { useChat } from '../components/ChatContext';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
   const { messages, sendMessage } = useChat();
   return <ChatWindow messages={messages} onSend={sendMessage} />;
};

export default Chat;
