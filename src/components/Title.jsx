const Title = ({ title, superWord }) => {
  return (
    <h1 className="text-black font-black text-6xl capitalize p-4">
      {title}{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-600">
        {superWord}
      </span>
    </h1>
  );
};

export default Title;
