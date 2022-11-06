import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProject from "../hooks/useProject";
import useAdmin from "../hooks/useAdmin";
import ModalTaskForm from "../components/ModalTaskForm";
import Task from "../components/Task";
import DeleteTaskModal from "../components/DeleteTaskModal";
import Collaborator from "../components/Collaborator";
import DeleteCollaboratorModal from "../components/DeleteCollaboratorModal";
import Alert from "../components/Alert";

const Project = () => {
  const params = useParams();
  const { getProject, project, loading2, setLoading2, alert, setAlert } =
    useProject();
  const [modal, setModal] = useState(false);
  const [taskT, setTaskT] = useState({});
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);

  const admin = useAdmin();

  useEffect(() => {
    setAlert({});
    setLoading2(true);
    getProject(params.id);
  }, []);
  
  const { name } = project;

  const handleDeleteTask = (task) => {
    setTaskT(task);
    setDeleteTaskModal(!deleteTaskModal);
  };

  return loading2 ? (
    <div className="flex justify-center items-center">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  ) : Object.keys(alert).length > 0 && alert.error ? (
    <Alert alert={alert} />
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>
        {admin && (
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
        )}
      </div>

      {admin && (
        <button
          onClick={() => {
            setModal(true);
            setTaskT({});
          }}
          type="button"
          className="text-sm px-5 p-3 w-full md:w-auto rounded-lg uppercase font-bold bg-green-600 hover:bg-green-700 transition-colors text-white text-center mt-6 flex items-center gap-2 justify-center"
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          New Task
        </button>
      )}

      {/*----------Alert----------*/}
      {Object.keys(alert).length > 0 && <Alert alert={alert} />}
      <p className="font-bold text-2xl mt-10">Project Tasks</p>
      <div className="bg-white shadow mt-10 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((item) => (
            <Task
              key={item._id}
              task={item}
              setModal={setModal}
              setTaskT={setTaskT}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <p className="text-center my-5 p-10 text-lg">
            This project has no tasks
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-2xl">Collaborators</p>
            <Link
              to={`/projects/new-collaborator/${project._id}`}
              className="text-gray-800 uppercase font-semibold hover:text-sky-600"
            >
              Add
            </Link>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {project.collaborators?.length ? (
              project.collaborators?.map((item) => (
                <Collaborator key={item._id} collaborator={item} />
              ))
            ) : (
              <p className="text-center my-5 p-10 text-lg">
                This project has no collaborators
              </p>
            )}
          </div>
        </>
      )}

      <ModalTaskForm
        modal={modal}
        setModal={setModal}
        taskT={taskT}
        setTaskT={setTaskT}
        setDeleteTaskModal={setDeleteTaskModal}
      />
      <DeleteTaskModal
        handleDeleteTask={handleDeleteTask}
        deleteTaskModal={deleteTaskModal}
        taskT={taskT}
      />
      <DeleteCollaboratorModal />
    </>
  );
};

export default Project;
