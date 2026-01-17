import { BEARER_API_TOKEN } from './config';

const getUrlBase = () => {
  if (window.location.hostname === "localhost") return "http://localhost:8000";
  return "https://chat.hbr.pt";
}

const processAIResponse = (prompt) => {
  // Process the AI response here
  const promise = new Promise((resolve, reject) => {
    fetch(`${getUrlBase()}/api/ai/message`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${BEARER_API_TOKEN}`
      },
      body: JSON.stringify({
        prompt
      })
    }).then(res => res.json()).then(({ response }) => {
      resolve({ text: response.text });
    }).catch(error => {
      console.error("Error processing AI response:", error);
      reject(error);
    });
  });

  return promise;
}

export { processAIResponse };

