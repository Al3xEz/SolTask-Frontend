import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import Title from "../components/Title";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

const Login = () => {
  //----------States----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  //----------Handle Submit----------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([email, password].includes("")) {
      setAlert({ message: "All fields are required", error: true });
      return;
    }
    try {
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem("JWT", data.JWT);
      setAuth(data);
      navigate("/projects");
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
      <Title title="Login and manage your" superWord="projects" />

      {/*----------Alert----------*/}
      {Object.keys(alert).length > 0 && <Alert alert={alert} />}

      {/*----------Form----------*/}
      <form
        onSubmit={handleSubmit}
        className="my-5 bg-white shadow rounded-xl px-10 py-5"
      >
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

        {/*-----Submit-----*/}
        <SubmitButton value="Log in" />

        {/*-----Nav-----*/}
        <nav className="lg:flex lg:justify-between">
          <div className="block text-center my-5">
            <p className="inline text-slate-500">Don't have an account? </p>

            <Link
              to="/register"
              className="text-center my-5 text-fuchsia-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>

          <Link
            to="/forgot-password"
            className="block text-center my-5 text-slate-500 font-medium hover:underline hover:text-pink-600"
          >
            Forgot password?
          </Link>
        </nav>
      </form>
    </>
  );
};

export default Login;
