import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SuccessMessage from "./SuccessMessage";
import { postContactForm } from "../helpers/api";

function ContactForm({ setSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    website: window.location.href,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim()))
      return alert("Preencha todos os campos");

    setLoading(true);

    try {
      postContactForm(form);
      setSuccess(true);
    } catch (error) {
      alert("Erro ao enviar o formulário. Tente novamente mais tarde.");
      console.error("Contact form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="tw:flex-1 tw:space-y-4 tw:overflow-y-auto tw:p-6" onSubmit={handleSubmit}>
      <small className="tw:block tw:mb-4">Prometemos que desta vez responderemos com um humano. Por favor, preencha o formulário abaixo para entrar em contato connosco.</small>

      <label className="tw:sr-only" htmlFor="name">Nome</label>
      <input name="name" onChange={handleChange} className="tw:w-full tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-4 tw:py-3 tw:text-sm" placeholder="Nome" />

      <label className="tw:sr-only" htmlFor="phone">Telefone</label>
      <input name="phone" onChange={handleChange} className="tw:w-full tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-4 tw:py-3 tw:text-sm" placeholder="Telefone" />

      <label className="tw:sr-only" htmlFor="email">Email</label>
      <input name="email" onChange={handleChange} type="email" className="tw:w-full tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-4 tw:py-3 tw:text-sm" placeholder="Email" />

      <label className="tw:sr-only" htmlFor="subject">Assunto</label>
      <input name="subject" onChange={handleChange} className="tw:w-full tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-4 tw:py-3 tw:text-sm" placeholder="Assunto" />

      <label className="tw:sr-only" htmlFor="message">Mensagem</label>
      <textarea name="message" onChange={handleChange} className="tw:w-full tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-4 tw:py-3 tw:text-sm" rows={4} placeholder="Mensagem" />

      <div className="tw:mt-4" onClick={handleSubmit}>
        <button disabled={loading} type="submit" className="tw:w-full tw:rounded-sm tw:bg-[#2D6FB4] tw:px-4 tw:py-3 tw:text-sm tw:font-medium tw:text-white">
          {loading ? "Enviando..." : "Enviar contacto"}
        </button>
      </div>
    </form>
  )
}

function ContactFormWindow({ onClose, onBackToChat }) {
  const [success, setSuccess] = useState(false);

  return (
    <div className="tw:fixed tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:bg-black/40">
      <div className="tw:w-[500px] tw:h-[620px] tw:rounded-xs tw:bg-white tw:shadow-2xl tw:flex tw:flex-col tw:dark:bg-gray-800 tw:dark:text-white">
        <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:border-gray-300 tw:dark:border-gray-600 tw:p-4 tw:text-lg tw:font-semibold">
          <span>Contacto</span>
          <button onClick={onClose} className="tw:text-gray-500 hover:tw:text-gray-800 dark:hover:tw:text-gray-200 tw:p-1 tw:cursor-pointer">
            <XMarkIcon className="tw:h-5 tw:w-5" />
          </button>
        </div >

        {success
          ? <SuccessMessage onBackToChat={onBackToChat} />
          : <ContactForm setSuccess={setSuccess} />}

      </div>
    </div>
  );
}

export default ContactFormWindow;
