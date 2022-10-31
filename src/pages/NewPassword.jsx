import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import Title from "../components/Title";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const NewPassword = () => {
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [modifiedPassword, setModifiedPassword] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({ message: error.response.data.message, error: true });
        setValidToken(false);
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== repeatedPassword) {
      setAlert({ message: "The passwords are diferents", error: true });
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: "Your password must be at least 6 characters long.",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/forgot-password/${token}`;

      const { data } = await axiosClient.post(url, { password });

      setAlert({ message: data.message, error: false });
      setPassword("");
      setRepeatedPassword("");
      setValidToken(false);
      setModifiedPassword(true);
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  return (
    <>
      <Title title="Reset your" superWord="password" />

      {/*----------Alert----------*/}
      {Object.keys(alert).length > 0 && <Alert alert={alert} />}

      {validToken && (
        <form
          onSubmit={handleSubmit}
          className="my-5 pb-6 bg-white shadow rounded-xl px-10 py-5"
        >
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
          <SubmitButton value="Reset Password" />
        </form>
      )}

      {modifiedPassword && (
        <div className="block text-center mt-10 mb-5">
          <Link
            to="/"
            className=" my-5 font-bold text-xl hover:underline hover:bg-clip-text hover:text-transparent 
              hover:bg-gradient-to-r hover:from-indigo-500 hover:via-fuchsia-500 hover:to-pink-600"
          >
            Log in
          </Link>
        </div>
      )}
    </>
  );
};

export default NewPassword;
