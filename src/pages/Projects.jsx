import useProject from "../hooks/useProject";
import ProjectsList from "../components/ProjectsList";

const Projects = () => {
  //----------States----------
  const { projects, loading2 } = useProject();
  /*----------------------------------------------------------------------
    ------------------------------ Component -----------------------------
    ----------------------------------------------------------------------*/
  return loading2 ? (
    <div className="flex justify-center items-center">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  ) : (
    <div>
      <h1 className="text-5xl font-black">Projects</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <ProjectsList key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase text-lg font-bold p-5">
            You don't have projects yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
