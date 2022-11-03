import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b shadow">
      <div className="md:flex md:justify-between items-center">
        <div className="flex gap-5 items-center">
          <h2 className="text-5xl font-black">
            SolTask
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700">
              !
            </span>
          </h2>

          <input
            type="search"
            placeholder="Search Project"
            className=" rounded-full lg:w-96 block p-2 border-2 shadow-inner"
          />
        </div>

        <div className="flex items-center gap-12">
          <Link
            to="/projects"
            className="font-bold uppercase hover:text-sky-600"
          >
            Projects
          </Link>

          <button
            type="button"
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
