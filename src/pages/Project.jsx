import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProject from "../hooks/useProject";

const Project = () => {
  const params = useParams();
  const { getProject, project, loading2, setLoading2 } = useProject();

  useEffect(() => {
    setLoading2(true);
    getProject(params.id);
  }, []);

  const { name } = project;

  return loading2 ? (
    <div className="flex justify-center items-center">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  ) : (
    <div className="flex justify-between">
      <h1 className="font-black text-4xl">{name}</h1>

      <Link
        className="flex items-center gap-2 text-gray-800 hover:text-sky-600 uppercase font-semibold"
        to={`/projects/edit/${params.id}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
        Edit
      </Link>
    </div>
  );
};

export default Project;
