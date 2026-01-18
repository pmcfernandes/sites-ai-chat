function Avatar({ name, isUser }) {
   const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

   const bgClass = isUser ? "tw:bg-white tw:text-blue-600 tw:border" : "tw:bg-gray-300 tw:text-gray-800";

   return (
      <div className="tw:flex tw:items-center tw:pt-5">
         <div className={`tw:h-8 tw:w-8 tw:flex tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium ${bgClass}`}>
            {initials}
         </div>
      </div>
   );
}

export default Avatar;
