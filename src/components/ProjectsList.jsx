import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProjectsList = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, creator } = project;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between gap-2">
      <p className="flex-1 text-xl font-semibold">
        {name}{" "}
        <span className="text-sm text-gray-500 uppercase"> {client}</span>
      </p>
      <div className="flex items-center gap-4">
        {auth._id !== creator && (
          <p className="text-xs p-1 rounded-lg text-white bg-green-600 font-bold uppercase">
            Collaborator
          </p>
        )}

        <Link
          to={`${_id}`}
          className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold flex items-center"
        >
          See Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectsList;
