const Alert = ({ alert }) => {
  return (
    <div
      className={`bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-5 shadow-inner w-11/12 mx-auto ${
        alert.error
          ? "bg-red-600"
          : "from-indigo-500 via-fuchsia-500 to-pink-600"
      }`}
    >
      {alert.message}
    </div>
  );
};

export default Alert;
