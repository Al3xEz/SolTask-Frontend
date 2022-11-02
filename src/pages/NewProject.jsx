import ProjectForm from "../components/ProjectForm";

const NewProject = () => {
  //----------States----------

  /*----------------------------------------------------------------------
    ------------------------------ Component -----------------------------
    ----------------------------------------------------------------------*/
  return (
    <div>
      <h1 className="text-5xl font-black">Create Project</h1>
      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </div>
  );
};

export default NewProject;
