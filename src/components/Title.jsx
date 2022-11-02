const Title = ({ title, superWord }) => {
  return (
    <h1 className="text-black font-black text-6xl capitalize p-4">
      {title}{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700">
        {superWord}
      </span>
    </h1>
  );
};

export default Title;
