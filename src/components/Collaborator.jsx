import useProject from "../hooks/useProject";

const Collaborator = ({ collaborator }) => {
  const { handleDeleteCollaboratorModal, deleteCollaboratorModal } =
    useProject();

  const { name, email } = collaborator;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-lg">{name}</p>
        <p className="text-gray-700">{email}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            handleDeleteCollaboratorModal(collaborator);
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Collaborator;
