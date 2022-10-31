const Alert = ({ alert }) => {
  return (
    <div
      className={`bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-5 shadow-inner w-11/12 mx-auto ${
        alert.error
          ? "from-red-500 via-red-600 to-red-800"
          : "from-green-500 via-green-600 to-green-800"
      }`}
    >
      {alert.message}
    </div>
  );
};

export default Alert;
