import useProject from "../hooks/useProject";

const Projects = () => {
  //----------States----------
  const { projects } = useProject();
  /*----------------------------------------------------------------------
    ------------------------------ Component -----------------------------
    ----------------------------------------------------------------------*/
  return (
    <div>
      <h1 className="text-5xl font-black">Projects</h1>
      <div></div>
    </div>
  );
};

export default Projects;
