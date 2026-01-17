function SuccessMessage({ onBackToChat }) {
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-4">
      <div className="tw:text-green-600 tw:text-xl tw:font-semibold">Mensagem enviada com sucesso ✅</div>
      <button onClick={onBackToChat} className="tw:rounded-sm tw:bg-blue-500 tw:px-4 tw:py-2 tw:text-white hover:tw:bg-blue-600 tw:transition tw:duration-200 tw:cursor-pointer">
        Voltar ao chat
      </button>
    </div>
  );
}

export default SuccessMessage;
