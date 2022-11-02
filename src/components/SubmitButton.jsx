const SubmitButton = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="bg-black hover:bg-gradient-to-r w-full py-3 rounded-xl text-white uppercase font-bold
         hover:cursor-pointer hover:from-green-500 hover:via-green-600 hover:to-green-700 my-3"
    />
  );
};

export default SubmitButton;
