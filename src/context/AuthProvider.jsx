import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

//Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //States
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [jswToken, setJswToken] = useState(null);

  //Navigate
  const navigate = useNavigate();

  //UseEffect(always trigger)
  useEffect(() => {
    const authenticateUser = async () => {
      const JWT = localStorage.getItem("JWT");

      //If there is no JWT in local storage
      if (!JWT) {
        setLoading(false);
        return;
      }

      setJswToken(JWT);

      //The authorization with the JWT
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      };

      try {
        const { data } = await axiosClient("/users/profile", config);
        setAuth(data);
        navigate("/projects");
      } catch (error) {
        setAuth({});
      }

      setLoading(false);
    };

    authenticateUser();
  }, []);

  const logoutAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, setJswToken, jswToken, logoutAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
