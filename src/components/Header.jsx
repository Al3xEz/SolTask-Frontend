import { Link } from "react-router-dom";
import useProject from "../hooks/useProject";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { logout } = useProject();
  const { logoutAuth } = useAuth();

  const handleLogout = () => {
    logout();
    logoutAuth();
    localStorage.removeItem("JWT");
  };

  return (
    <header className="px-4 py-5 bg-white border-b shadow">
      <div className="md:flex md:justify-between items-center">
        <div className="flex flex-col md:flex-row gap-5 items-center mb-4">
          <h2 className="text-5xl font-black">
            SolTask
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700">
              !
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
          <Link
            to="/projects"
            className="font-bold uppercase hover:text-sky-600"
          >
            Projects
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="text-white text-sm bg-black py-2 px-4 rounded-lg uppercase font-semibold hover:bg-red-600 transition-colors duration-300"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
