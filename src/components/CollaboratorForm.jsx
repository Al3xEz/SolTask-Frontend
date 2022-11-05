import { useState } from "react";
import FormInput from "./FormInput";
import Alert from "./Alert";
import SubmitButton from "./SubmitButton";
import useProject from "../hooks/useProject";

const CollaboratorForm = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const { collaboratorsSubmit } = useProject();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "") {
      setAlert({ message: "The email is required", error: true });
      return;
    }
    collaboratorsSubmit(email);
  };

  return (
    <div className="w-11/12 md:w-1/2">
      {/*----------Alert----------*/}
      {Object.keys(alert).length > 0 && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white py-3 px-5 rounded-lg shadow"
      >
        <div className="mb-5">
          {/*-----Email-----*/}
          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            state={email}
            setState={setEmail}
          />
        </div>

        <SubmitButton value={"Add Collaborator"} />
      </form>
    </div>
  );
};

export default CollaboratorForm;
