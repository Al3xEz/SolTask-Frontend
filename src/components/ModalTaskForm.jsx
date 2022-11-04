import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import Alert from "./Alert";
import { useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import useProject from "../hooks/useProject";

const ModalTaskForm = ({ modal, setModal, taskT, setTaskT }) => {
  const params = useParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [priority, setPriority] = useState("");
  const [alert, setAlert] = useState("");

  const { setProject, project } = useProject();

  useEffect(() => {
    setAlert(false);
    if (taskT?._id) {
      setName(taskT.name);
      setId(taskT._id);
      setDescription(taskT.description);
      setDeliveryDate(taskT.deliveryDate?.split("T")[0]);
      setPriority(taskT.priority);
      return;
    }
    setId("");
    setName("");
    setDescription("");
    setDeliveryDate("");
    setPriority("");
  }, [taskT]);

  const taskSubmit = async (task) => {
    if (task?.id) {
      try {
        const JWT = localStorage.getItem("JWT");
        if (!JWT) {
          return;
        }

        //The authorization with the JWT
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        };

        const { data } = await axiosClient.put(
          `/tasks/${task.id}`,
          task,
          config
        );

        const updatedProject = { ...project };
        updatedProject.tasks = updatedProject.tasks.map((item) =>
          item._id === data._id ? data : item
        );
        setProject(updatedProject);

        setAlert({});
        setModal(false);
        setId("");
        setName("");
        setDescription("");
        setDeliveryDate("");
        setPriority("");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const JWT = localStorage.getItem("JWT");
        if (!JWT) {
          return;
        }

        //The authorization with the JWT
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        };

        const { data } = await axiosClient.post("/tasks", task, config);

        const updatedProject = { ...project };
        updatedProject.tasks = [...project.tasks, data];
        setProject(updatedProject);
        setAlert({});
        setModal(false);
        setId("");
        setName("");
        setDescription("");
        setDeliveryDate("");
        setPriority("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if ([name, description, priority, deliveryDate].includes("")) {
      setAlert({ message: "All fields are required", error: true });
      return;
    }
    setAlert({});
    taskSubmit({
      id,
      name,
      description,
      deliveryDate,
      priority,
      project: params.id,
    });
    setId("");
    setName("");
    setDescription("");
    setDeliveryDate("");
    setPriority("");
  };

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {
          setModal(false);
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0  sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl mt-5 leading-6 font-bold text-gray-900"
                  >
                    {id ? "Edit Task" : "Create Task"}
                  </Dialog.Title>

                  {/*----------Alert----------*/}
                  <div className="mt-10">
                    {Object.keys(alert).length > 0 && <Alert alert={alert} />}
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8">
                    <div className="mb-5">
                      {/*-----Name-----*/}
                      <FormInput
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Task name"
                        autoComplete="name"
                        state={name}
                        setState={setName}
                      />

                      {/*-----Description-----*/}
                      <label
                        htmlFor="description"
                        className="text-gray-600 block text-xl font-bold w-max"
                      >
                        Description
                      </label>

                      <textarea
                        className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
                        id="description"
                        placeholder="Task description"
                        value={description}
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                      />

                      <FormInput
                        label="Delivery Date"
                        id="date"
                        type="date"
                        state={deliveryDate}
                        setState={setDeliveryDate}
                      />

                      {/*-----Priority-----*/}
                      <label
                        htmlFor="priority"
                        className="text-gray-600 block text-xl font-bold w-max mt-5"
                      >
                        Priority
                      </label>

                      <select
                        className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50 text-center"
                        id="priority"
                        value={priority}
                        onChange={(event) => {
                          setPriority(event.target.value);
                        }}
                      >
                        <option value="">--- Select ---</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <SubmitButton value={id ? "Edit Task" : "Create Task"} />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalTaskForm;
