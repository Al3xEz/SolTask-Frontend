import { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

const ProjectForm = () => {
  //----------States----------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryData, setDeliveryDate] = useState("");
  const [client, setClient] = useState("");
  const [alert, setAlert] = useState({});

  return (
    <form className="bg-white py-6 px-5 md:w-1/2 rounded-lg shadow">
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
        state={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {/*-----Delivery Date-----*/}
      <FormInput
        label="Delivery Date"
        id="delivery-date"
        type="date"
        placeholder="Delivery Date"
        state={deliveryData}
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

      <SubmitButton value={"Create Project"} />
    </form>
  );
};

export default ProjectForm;
