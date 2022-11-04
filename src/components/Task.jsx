import { formatearFecha } from "../helpers";

const Task = ({ task, setModal, setTaskT }) => {
  const { description, name, priority, deliveryDate, state, _id } = task;

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
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEditTask}
            className="bg-sky-600 hover:bg-sky-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
          >
            Edit
          </button>
          {state ? (
            <button className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg">
              Complete
            </button>
          ) : (
            <button className="bg-gray-600 hover:bg-gray-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg">
              Incomplete
            </button>
          )}

          <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg">
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Task;
