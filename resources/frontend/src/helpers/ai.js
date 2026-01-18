import { getUrlBase } from './api';

const processAIResponse = (prompt) => {
   // Process the AI response here
   const promise = new Promise((resolve, reject) => {
      fetch(`${getUrlBase()}/ai/message`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${window.BEARER_API_TOKEN}`
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

