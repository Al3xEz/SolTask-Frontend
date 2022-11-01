import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import Alert from "../components/Alert";

const ForgotPassword = () => {
  //----------States----------
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  //----------Handle Submit----------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      setAlert({ message: "The email is required", error: true });
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setAlert({ message: "This isn't a valid email", error: true });
      return;
    }

    try {
      const { data } = await axiosClient.post("/users/forgot-password", {
        email,
      });
      setEmail("");
      setAlert({ message: data.message, error: false });
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
      <Title title="Forgot your" superWord="password?" />

      {/*----------Alert----------*/}
      {Object.keys(alert).length > 0 && <Alert alert={alert} />}

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

        {/*-----Submit-----*/}
        <SubmitButton value="Search account" />

        {/*-----Nav-----*/}
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
