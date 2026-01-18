import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { postCalendarForm } from "../helpers/api";
import { format, set, addMinutes } from "date-fns";
import { pt } from "date-fns/locale"

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const generateTimeSlots = () => {
   const slots = [];
   for (let h = 9; h < 17; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      slots.push(`${h.toString().padStart(2, '0')}:30`);
   }
   return slots;
};

function getMonthDays(year, month) {
   const firstDay = new Date(year, month, 1);
   const lastDay = new Date(year, month + 1, 0);
   const days = [];

   for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
   }

   for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
   }

   return days;
}

export default function MeetingCalendar({ onSelect, bookedSlots = {}, setSuccess }) {
   const today = new Date();
   const [isLoading, setIsLoading] = useState(false);
   const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
   const [selectedDate, setSelectedDate] = useState(null);
   const [form, setForm] = useState({
      time: "",
      name: "",
      email: "",
      message: "",
   });

   const timeSlots = generateTimeSlots();
   const days = getMonthDays(current.getFullYear(), current.getMonth());

   const prevMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
   const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));

   const toggleDateSelection = (date) => {
      if (date < today || date.getDay() === 0 || date.getDay() === 6) return;
      if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
         setSelectedDate(null);
         onSelect && onSelect(null);
      } else {
         setSelectedDate(date);
         onSelect && onSelect(date);
      }
   };

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (Object.values(form).some((v) => !v.trim()) || !selectedDate)
         return alert("Preencha todos os campos");

      setIsLoading(true);

      const payload = { date: selectedDate, ...form };
      try {
         await postCalendarForm(payload);
      } catch (err) {
         alert('Erro ao enviar o formulário. Tente novamente mais tarde.');
         console.log("Erro ao enviar o formulário:", err);
         setIsLoading(false);
         return;
      }

      // Build start/end from selectedDate and form.time using date-fns
      const [hourStr, minuteStr] = (form.time || "").split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const startDateTime = set(selectedDate, { hours: isNaN(hour) ? 0 : hour, minutes: isNaN(minute) ? 0 : minute, seconds: 0, milliseconds: 0 });
      const endDateTime = addMinutes(startDateTime, 30);

      const event = {
         summary: 'Reunião Agendada ' + window.location.hostname,
         description: form.message,
         start: { dateTime: startDateTime.toISOString() },
         end: { dateTime: endDateTime.toISOString() }
      };

      if (form.email.includes("@gmail.com")) {
         window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.summary)}&dates=${event.start.dateTime.replace(/-|:|\.\d+/g, '')}/${event.end.dateTime.replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(event.description)}`, '_calendar', 'width=1100,height=820');
      } else {
         window.open(`https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.subject)}&body=${encodeURIComponent(event.body)}&startdt=${encodeURIComponent(event.start.dateTime)}&enddt=${encodeURIComponent(event.end.dateTime)}`, '_calendar', 'width=1100,height=820');
      }

      setSuccess(true);
      setSelectedDate(null);
      setForm({
         time: "",
         name: "",
         email: "",
         subject: "",
         message: "",
      });

      setIsLoading(false);
   };

   return (
      <div className="tw:max-w-6xl tw:mx-auto tw:grid tw:grid-cols-1 tw:grid-cols-2 tw:gap-6">
         {/* Calendar */}
         <div className="tw:rounded-2xl tw:shadow-md tw:bg-white tw:p-4 tw:dark:bg-gray-800 dark:tw:text-white tw:dark:shadow-white/10">
            <div className="tw:flex tw:items-center tw:justify-between tw:mb-4">
               <button onClick={prevMonth} className="tw:p-2 tw:rounded-xl hover:tw:bg-gray-100 tw:dark:hover:tw:bg-gray-700">
                  <ChevronLeftIcon className="tw:h-5 tw:w-5" />
               </button>
               <h2 className="tw:text-lg tw:font-semibold">
                  {format(current, "MMMM yyyy", { locale: pt })}
               </h2>
               <button onClick={nextMonth} className="tw:p-2 tw:rounded-xl hover:tw:bg-gray-100 tw:dark:hover:tw:bg-gray-700r">
                  <ChevronRightIcon className="tw:h-5 tw:w-5" />
               </button>
            </div>

            <div className="tw:grid tw:grid-cols-7 tw:text-center tw:text-sm tw:font-medium tw:text-gray-500 tw:mb-2">
               {daysOfWeek.map(d => <div key={d}>{d}</div>)}
            </div>

            <div className="tw:grid tw:grid-cols-7 tw:gap-1">
               {days.map((date, i) => {
                  if (!date) return <div key={i} />;
                  const isSelected = selectedDate != null && selectedDate.toDateString() === date.toDateString();
                  const disabled = date < today || date.getDay() === 0 || date.getDay() === 6;
                  return (
                     <button
                        key={i}
                        onClick={() => toggleDateSelection(date)}
                        disabled={disabled}
                        className={`tw:aspect-square tw:rounded-xl tw:text-sm tw:flex tw:items-center tw:justify-center tw:transition ${isSelected ? 'tw:bg-[#245a8d] tw:text-white' : disabled ? 'tw:text-gray-300 tw:cursor-not-allowed' : 'hover:tw:bg-blue-50'}`}
                     >
                        {date.getDate()}
                     </button>
                  );
               })}
            </div>
         </div>

         {/* Form */}
         <div className="tw:rounded-2xl tw:shadow-md tw:bg-white tw:p-6 tw:flex tw:flex-col tw:gap-4 tw:dark:bg-gray-800 tw:dark:text-white tw:dark:shadow-white/10">
            <h3 className="tw:text-lg tw:font-semibold">Detalhes da Reunião</h3>

            <form className="tw:flex-1 tw:space-y-4 tw:overflow-y-auto tw:p-1" onSubmit={handleSubmit}>

               <div className="tw:text-sm tw:text-gray-500">
                  {selectedDate ? selectedDate.toDateString() : 'Selecione datas no calendário'}
               </div>

               <div className="tw:flex tw:flex-col tw:gap-1">
                  <label className="tw:sr-only">Horário</label>
                  <select
                     name="time"
                     onChange={handleChange}
                     className="tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-3 tw:py-2 tw:text-sm focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                  >
                     <option value="">Selecione um horário</option>
                     {timeSlots.map(slot => (
                        <option key={slot} value={slot} disabled={selectedDate && bookedSlots[selectedDate.toDateString()]?.includes(slot)}>
                           {slot}{selectedDate && bookedSlots[selectedDate.toDateString()]?.includes(slot) ? ' (Reservado)' : ''}
                        </option>
                     ))}
                  </select>
               </div>

               <div className="tw:flex tw:flex-col tw:gap-1">
                  <label className="tw:sr-only">Nome</label>
                  <input
                     type="text"
                     name="name"
                     placeholder="Nome"
                     onChange={handleChange}
                     className="tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-3 tw:py-2 tw:text-sm focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                  />
               </div>

               <div className="tw:flex tw:flex-col tw:gap-1">
                  <label className="tw:sr-only">Email</label>
                  <input
                     type="text"
                     name="email"
                     placeholder="Email"
                     onChange={handleChange}
                     className="tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-3 tw:py-2 tw:text-sm focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                  />
               </div>

               <div className="tw:flex tw:flex-col tw:gap-1">
                  <label className="tw:sr-only">Mensagem</label>
                  <textarea
                     name="message"
                     placeholder="Diga algo sobre a reunião..."
                     onChange={handleChange}
                     rows={4}
                     className="tw:rounded-sm tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:dark:bg-gray-700 tw:dark:text-white tw:px-3 tw:py-2 tw:text-sm focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                  />
               </div>

               <button
                  onClick={handleSubmit}
                  className="tw:w-full tw:rounded-sm tw:bg-[#2D6FB4] tw:px-4 tw:py-3 tw:text-sm tw:font-medium tw:text-white tw:cursor-pointer tw:hover:bg-[#245a8d] tw:transition tw:duration-200"
                  disabled={isLoading}
               >
                  Agendar Reunião
               </button>

            </form>
         </div>
      </div>
   );
}
