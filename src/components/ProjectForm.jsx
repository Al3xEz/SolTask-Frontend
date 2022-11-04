import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import Alert from "./Alert";
import useProject from "../hooks/useProject";
import { useParams, useNavigate } from "react-router-dom";

const ProjectForm = () => {
  //----------States----------
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [client, setClient] = useState("");
  const [alert, setAlert] = useState({});
  const { projectSubmit, project } = useProject();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeliveryDate(project.deliveryDate.split("T")[0]);
      setClient(project.client);
    } else {
      setId("");
      setName("");
      setDescription("");
      setDeliveryDate("");
      setClient("");
    }
  }, [params]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([name, description, deliveryDate, client].includes("")) {
      setAlert({
        message: "All fields are required",
        error: true,
      });
      return;
    }
    await projectSubmit({ id, name, description, deliveryDate, client });
    if (id) {
      setAlert({ message: "Project updated", error: false });
    } else {
      setAlert({ message: "Project created successfully", error: false });
    }

    setTimeout(() => {
      setAlert({});
      navigate("/projects");
    }, 3000);

    setName("");
    setDescription("");
    setDeliveryDate("");
    setClient("");
  };

  return (
    <div className="md:w-1/2">
      {/*----------Alert----------*/}
      {Object.keys(alert).length > 0 && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white py-6 px-5 rounded-lg shadow"
      >
        {/*-----Project Name-----*/}
        <FormInput
          label="Project Name"
          id="name"
          type="text"
          placeholder="Project name"
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
          id="description"
          className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
          label="Description"
          placeholder="Project Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        {/*-----Delivery Date-----*/}
        <FormInput
          label="Delivery Date"
          id="delivery-date"
          type="date"
          placeholder="Delivery Date"
          state={deliveryDate}
          setState={setDeliveryDate}
        />

        {/*-----Client-----*/}
        <FormInput
          label="Client Name"
          id="client-name"
          type="text"
          placeholder="Client name"
          autoComplete="name"
          state={client}
          setState={setClient}
        />

        <SubmitButton value={id ? "Edit Project" : "Create Project"} />
      </form>
    </div>
  );
};

export default ProjectForm;
