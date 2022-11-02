import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import axiosClient from "../config/axiosClient";

//Create context
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading2, setLoading2] = useState(false);
  const { jswToken } = useAuth();

  const projectSubmit = async (project) => {
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

      const { data } = await axiosClient.post("/projects", project, config);
      setProjects([...projects, data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("PROJECT PROVIDER");
    const getProjects = async () => {
      setLoading2(true);
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

        const { data } = await axiosClient("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
      setLoading2(false);
    };
    getProjects();
  }, [jswToken]);

  const getProject = async (id) => {
    try {
      const JWT = localStorage.getItem("JWT");
      if (!JWT) {
        setLoading2(false);
        return;
      }

      //The authorization with the JWT
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      };

      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data.project);
    } catch (error) {
      console.log(error);
    }
    setLoading2(false);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        projectSubmit,
        getProject,
        project,
        loading2,
        setLoading2,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
