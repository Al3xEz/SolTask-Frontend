import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

//Create context
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading2, setLoading2] = useState(false);
  const { jswToken } = useAuth();
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const projectSubmit = async (project) => {
    if (project.id) {
      //Editing
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
          `/projects/${project.id}`,
          project,
          config
        );

        const updatedProjects = projects.map((item) =>
          item._id === data._id ? data : item
        );

        setProjects(updatedProjects);
      } catch (error) {
        console.log(error);
      }
    } else {
      //Creating
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
    }
  };

  useEffect(() => {
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

  const deleteProject = async (id) => {
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

      const { data } = await axiosClient.delete(`/projects/${id}`, config);

      const updatedProjects = projects.filter((item) => item._id !== id);
      setProjects(updatedProjects);
      setAlert({ message: data.message, error: true });
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
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
        deleteProject,
        alert,
        setProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
