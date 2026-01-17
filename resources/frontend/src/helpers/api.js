const getUrlBase = () => {
  if (window.location.hostname === "localhost") return "http://localhost:8000";
  return "https://hr.hbr.pt";
}

const postContactForm = (formData) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${getUrlBase()}/contact`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.data)
    }).then(res => res.json()).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    });
  });

  return promise;
}

export { postContactForm };
