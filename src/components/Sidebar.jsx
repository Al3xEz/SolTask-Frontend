import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <>
      <aside className="md:w-80 lg:w-96 px-5 py-10 w-max bg-slate-700">
        <p className="text-3xl font-bold px-3 text-white">Hello {auth.name}!</p>
        <Link
          to="create-project"
          className="bg-white text-black w-full p-2 uppercase font-bold inline-block mt-5 text-center rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-200"
        >
          New Project
        </Link>
      </aside>
    </>
  );
};

export default Sidebar;
