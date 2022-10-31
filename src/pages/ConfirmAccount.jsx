import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";
import Title from "../components/Title";

const ConfirmAccount = () => {
  const params = useParams();
  const { token } = params;
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${token}`;
        const { data } = await axiosClient(url);
        setAlert({ message: data.message, error: false });
      } catch (error) {
        setAlert({ message: error.response.data.message, error: true });
      }
    };
    confirmAccount();
  }, []);

  return (
    <>
      <Title title="Confirm your" superWord="account" />
      <div className="my-10 shadow-lg px-5 py-3 rounded-xl bg-white">
        {/* ----------Alert----------*/}
        {Object.keys(alert).length > 0 && <Alert alert={alert} />}

        <div className="block text-center mt-10 mb-5">
          <Link
            to="/"
            className="my-5 font-bold text-xl hover:underline hover:bg-clip-text hover:text-transparent 
              hover:bg-gradient-to-r hover:from-indigo-500 hover:via-fuchsia-500 hover:to-pink-600"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;
