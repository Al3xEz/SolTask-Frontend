import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../hooks/useProject";

const Project = () => {
  const params = useParams();
  const { getProject, project, loading2, setLoading2 } = useProject();

  useEffect(() => {
    setLoading2(true);
    getProject(params.id);
  }, []);

  const { name } = project;

  return loading2 ? (
    <div className="flex justify-center items-center h-screen">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  ) : (
    <div>
      <h1 className="font-black text-4xl">{name}</h1>
    </div>
  );
};

export default Project;
