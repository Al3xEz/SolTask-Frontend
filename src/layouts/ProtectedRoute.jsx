import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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
      <div>
        {auth._id ? (
          <div className="md:flex md:flex-col md:min-h-screen">
            <Header />
            <div className="md:flex md:flex-1">
              <Sidebar />
              <main className="flex-1 p-10">
                <Outlet />
              </main>
            </div>
          </div>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </>
  );
};

export default ProtectedRoute;
