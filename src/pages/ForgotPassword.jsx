import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-black font-black text-6xl capitalize p-4">
        Forgot your{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-600">
          password?
        </span>
      </h1>

      <form action="" className="my-10 bg-white shadow rounded-xl px-10 py-5">
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-600 block text-xl font-bold w-max"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Search account"
          className="bg-black hover:bg-gradient-to-r w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:from-indigo-500 hover:via-fuchsia-500 hover:to-pink-600 my-3"
        />

        <nav className="lg:flex lg:justify-between my-5">
          <div className="block text-center">
            <p className="inline text-slate-500">Already have an account? </p>

            <Link
              to="/"
              className="text-center font-semibold hover:underline text-purple-600 inline-block"
            >
              Log in
            </Link>
          </div>
          <div className="block text-center mt-3 lg:mt-0">
            <p className="inline text-slate-500">Don't have an account? </p>

            <Link
              to="/register"
              className="text-center text-fuchsia-600 font-semibold hover:underline inline-block"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </form>
    </>
  );
};

export default ForgotPassword;
