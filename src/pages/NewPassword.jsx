const NewPassword = () => {
  return (
    <>
      <h1 className="text-black font-black text-6xl capitalize p-4">
        Reset your{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-600">
          password
        </span>
      </h1>

      <form action="" className="my-10 bg-white shadow rounded-xl px-10 py-5">
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 block text-xl font-bold w-max capitalize"
          >
            New password
          </label>
          <input
            id="password"
            type="password"
            placeholder="New password"
            className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="text-gray-600 block text-xl font-bold w-max capitalize"
          >
            Repeat password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat password"
            className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Reset password"
          className="bg-black hover:bg-gradient-to-r w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:from-indigo-500 hover:via-fuchsia-500 hover:to-pink-600 my-3"
        />
      </form>
    </>
  );
};

export default NewPassword;
