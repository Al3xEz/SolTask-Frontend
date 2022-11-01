import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();
  //Spinner while loading the JWT
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }

  //When JWT is loaded
  return (
    <>
      <div>{auth._id ? <Outlet /> : <Navigate to="/" />}</div>
    </>
  );
};

export default ProtectedRoute;
