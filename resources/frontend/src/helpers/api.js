import { API_URL } from './config';

const getUrlBase = () => {
   if (window.location.hostname === "localhost") return "http://localhost:8000/api";
   return API_URL;
}

const getConfig = () => {
   const promise = new Promise((resolve, reject) => {
      fetch(`${getUrlBase()}/config`, {
         method: "GET",
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      }).then(res => res.json()).then(data => {
         window.BEARER_API_TOKEN = data.api_key || '';

         resolve({
            chatWindowTitle: data.title || 'Laravel Chat',
            chatWelcomeMessage: data.welcome_message || 'Olá! Como posso ajudar? 👋',
            enableContactForm: data.show_contact_form || false,
            enableMeetingForm: data.show_meeting_form || false,
         });
      }).catch(err => {
         reject(err);
      });
   });

   return promise;
}

const postContactForm = (formData) => {
   const promise = new Promise((resolve, reject) => {
      fetch(`${getUrlBase()}/contact/submit`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${window.BEARER_API_TOKEN}`
         },
         body: JSON.stringify(formData.data)
      }).then(res => res.json()).then(data => {
         resolve(data);
      }).catch(err => {
         reject(err);
      });
   });

   return promise;
}

const postCalendarForm = (formData) => {
   const promise = new Promise((resolve, reject) => {
      fetch(`${getUrlBase()}/meetings/create`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${window.BEARER_API_TOKEN}`
         },
         body: JSON.stringify(formData)
      }).then(res => res.json()).then(data => {
         resolve(data);
      }).catch(err => {
         reject(err);
      });
   });

   return promise;
}

export { getUrlBase, getConfig, postContactForm, postCalendarForm };
