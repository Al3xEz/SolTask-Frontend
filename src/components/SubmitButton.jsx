const SubmitButton = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="bg-black hover:bg-gradient-to-r w-full py-3 rounded-xl text-white uppercase font-bold
         hover:cursor-pointer hover:from-indigo-500 hover:via-fuchsia-500 hover:to-pink-600 my-3"
    />
  );
};

export default SubmitButton;
