import useProject from "../hooks/useProject";
import ProjectForm from "../components/ProjectForm";
import Alert from "../components/Alert";

const EditProject = () => {
  const { project, deleteProject, alert } = useProject();

  const handleDelete = () => {
    if (confirm("Do you want to delete this project?")) {
      deleteProject(project._id);
    } else {
      console.log("no");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl mb-10">
          Edit Project: {project.name}
        </h1>

        <button
          onClick={handleDelete}
          className="flex gap-2 text-gray-800 hover:text-red-600 hover:cursor-pointer"
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Delete
        </button>
      </div>
      <div className="md:w-1/2 mx-auto">
        {/*----------Alert----------*/}
        {Object.keys(alert).length > 0 && <Alert alert={alert} />}
      </div>
      <div className=" flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default EditProject;
