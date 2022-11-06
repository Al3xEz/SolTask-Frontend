import { formatearFecha } from "../helpers";
import useAdmin from "../hooks/useAdmin";
import useProject from "../hooks/useProject";

const Task = ({ task, setModal, setTaskT, handleDeleteTask }) => {
  const { description, name, priority, deliveryDate, state, _id } = task;
  const admin = useAdmin();
  const { completeTask } = useProject();

  const handleEditTask = () => {
    setTaskT(task);
    setModal(true);
  };

  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p className="mb-1 text-xl">{name}</p>
          <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
          <p className="mb-1">{formatearFecha(deliveryDate)}</p>
          <p className="text-gray-600">Priority: {priority}</p>
          {state && (
            <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white w-max">
              Completed by: {task.completed.name}
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          {admin && (
            <button
              onClick={handleEditTask}
              className="bg-sky-600 hover:bg-sky-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => {
              completeTask(_id);
            }}
            className={`${
              state
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            } transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg`}
          >
            {state ? "Complete" : "Incomplete"}
          </button>

          {admin && (
            <button
              onClick={() => {
                handleDeleteTask(task);
              }}
              className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Task;
