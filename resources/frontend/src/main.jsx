import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChatProvider } from './components/ChatContext.jsx'
import './App.css'


// Create a new element
const root = document.createElement('div');
root.id = 'chat-widget-root';
root.style.position = 'fixed';
root.style.width = '1px';
root.style.height = '1px';
root.style.zIndex = '9999';
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </StrictMode>,
)
