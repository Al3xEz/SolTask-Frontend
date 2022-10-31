import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([name, email, password, repeatedPassword].includes("")) {
      setAlert({ message: "All fields are required", error: true });
      return;
    }

    if (password !== repeatedPassword) {
      setAlert({ message: "Passwords are diferents", error: true });
      return;
    }

    if (password.length < 8) {
      setAlert({
        message: "Your password must be at least 6 characters long.",
        error: true,
      });
      return;
    }

    setAlert({});

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          name,
          email,
          password,
        }
      );
      setAlert({ message: data.message, error: false });
      setName("");
      setEmail("");
      setPassword("");
      setRepeatedPassword("");
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  return (
    <>
      <h1 className="text-black font-black text-6xl capitalize p-4">
        Sign up and manage your{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-600">
          projects
        </span>
      </h1>

      {Object.keys(alert).length > 0 && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="my-5 bg-white shadow rounded-xl px-10 py-5"
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="text-gray-600 block text-xl font-bold w-max"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
          />
        </div>

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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 block text-xl font-bold w-max"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
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
            value={repeatedPassword}
            onChange={(event) => setRepeatedPassword(event.target.value)}
            autoComplete="new-password"
          />
        </div>

        <input
          type="submit"
          value="Create account"
          className="bg-black hover:bg-gradient-to-r w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:from-indigo-500 hover:via-fuchsia-500 hover:to-pink-600 my-3"
        />

        <nav className="lg:flex lg:justify-center">
          <div className="block text-center my-5">
            <p className="inline text-slate-500">Already have an account? </p>

            <Link
              to="/"
              className="text-center my-5 font-semibold hover:underline text-purple-600"
            >
              Log in
            </Link>
          </div>
        </nav>
      </form>
    </>
  );
};

export default Register;
