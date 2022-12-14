import { Link } from "react-router-dom";
import { useState } from "react";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import Title from "../components/Title";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const Register = () => {
  //----------States----------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [alert, setAlert] = useState({});

  //----------Handle Submit----------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([name, email, password, repeatedPassword].includes("")) {
      setAlert({ message: "All fields are required", error: true });
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setAlert({ message: "This isn't a valid email", error: true });
      return;
    }

    if (password !== repeatedPassword) {
      setAlert({ message: "Passwords are diferents", error: true });
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: "Your password must be at least 6 characters long.",
        error: true,
      });
      return;
    }

    setAlert({});

    try {
      const { data } = await axiosClient.post("/users", {
        name,
        email,
        password,
      });
      setAlert({ message: data.message, error: false });
      setName("");
      setEmail("");
      setPassword("");
      setRepeatedPassword("");
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  /*----------------------------------------------------------------------
    ------------------------------ Component -----------------------------
    ----------------------------------------------------------------------*/
  return (
    <>
      {/*----------Title----------*/}
      <Title title="Sign up and manage your" superWord="projects" />

      {/*----------Alert----------*/}
      {Object.keys(alert).length > 0 && <Alert alert={alert} />}

      {/*----------Form----------*/}
      <form
        onSubmit={handleSubmit}
        className="my-5 bg-white shadow rounded-xl px-10 py-5"
      >
        {/*-----Name-----*/}
        <FormInput
          label="Name"
          id="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          state={name}
          setState={setName}
        />

        {/*-----Email-----*/}
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          state={email}
          setState={setEmail}
        />

        {/*-----Password-----*/}
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          state={password}
          setState={setPassword}
        />

        {/*-----Repeat Password-----*/}
        <FormInput
          label="Repeat password"
          id="password2"
          type="password"
          placeholder="Repeat password"
          autoComplete="new-password"
          state={repeatedPassword}
          setState={setRepeatedPassword}
        />

        {/*-----Submit-----*/}
        <SubmitButton value="Create account" />

        {/*-----Nav-----*/}
        <nav className="lg:flex lg:justify-center">
          <div className="block text-center my-5">
            <p className="inline text-slate-500">Already have an account? </p>

            <Link
              to="/"
              className="text-center my-5 font-semibold hover:underline text-sky-600"
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
