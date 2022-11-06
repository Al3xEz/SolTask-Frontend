import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CollaboratorForm from "../components/CollaboratorForm";
import useProject from "../hooks/useProject";
import Alert from "../components/Alert";

const NewCollaborator = () => {
  const {
    getProject,
    project,
    collaborator,
    addCollaborator,
    alert,
    setAlert,
    setCollaborator,
  } = useProject();
  const params = useParams();

  useEffect(() => {
    setCollaborator({});
    setAlert({});
    getProject(params.id);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">
        Add Collaborator to {project.name}
      </h1>
      <div className="w-11/12 md:w-1/2 mx-auto">
        {/*----------Alert----------*/}
        {Object.keys(alert).length > 0 && <Alert alert={alert} />}
      </div>
      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
      {Object.keys(collaborator).length > 0 ? (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-2xl font-bold">Result</h2>
            <div className="flex flex-col gap-4 justify-between items-center">
              <p>{collaborator.name}</p>
              <button
                type="button"
                onClick={() => {
                  addCollaborator({ email: collaborator.email });
                }}
                className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
              >
                Add to {project.name}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NewCollaborator;
