import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-gray-800 to-black font-black text-6xl capitalize p-4">
        Log in and manage your{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-600">
          projects
        </span>
      </h1>

      <form action="" className="my-10 bg-white shadow rounded-xl px-10 py-5">
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-600 block text-xl font-bold w-min"
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

        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 block text-xl font-bold w-min"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Log in"
          className="bg-gradient-to-r from-gray-600 via-gray-700 to-black shadow w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:from-indigo-500 hover:via-fuchsia-500 hover:to-pink-600 my-3"
        />

        <nav className="lg:flex lg:justify-between">
          <Link
            to="register"
            className="block text-center my-5 text-slate-500 hover:underline hover:text-purple-600"
          >
            Create account
          </Link>

          <Link
            to="forgot-password"
            className="block text-center my-5 text-slate-500 hover:underline hover:text-pink-600"
          >
            Forgot password?
          </Link>
        </nav>
      </form>
    </>
  );
};

export default Login;
