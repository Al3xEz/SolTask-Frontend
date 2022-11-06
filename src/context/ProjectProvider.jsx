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
  const [collaborator, setCollaborator] = useState({});
  const [deleteCollaboratorModal, setDeleteCollaboratorModal] = useState(false);

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
        setAlert({ message: error.response.data.message, error: true });
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
        setAlert({ message: error.response.data.message, error: true });
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
      setAlert({ message: error.response.data.message, error: true });
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
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  const deleteTask = async (task) => {
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

      await axiosClient.delete(`/tasks/${task._id}`, config);

      const updatedProject = { ...project };

      updatedProject.tasks = updatedProject.tasks.filter(
        (item) => item._id !== task._id
      );

      setProject(updatedProject);
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  const collaboratorsSubmit = async (email) => {
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

      const { data } = await axiosClient.post(
        "/projects/collaborators",
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  const addCollaborator = async (email) => {
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

      const { data } = await axiosClient.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );
      setAlert({ message: data.message, error: false });
      setCollaborator({});
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  const handleDeleteCollaboratorModal = (coll) => {
    setDeleteCollaboratorModal(!deleteCollaboratorModal);

    setCollaborator(coll);
  };

  const deleteCollaborator = async () => {
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

      const { data } = await axiosClient.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const updatedProject = { ...project };

      updatedProject.collaborators = updatedProject.collaborators.filter(
        (item) => item._id !== collaborator._id
      );

      setProject(updatedProject);
      setAlert({ message: data.message, error: false });
      setCollaborator({});
      setDeleteCollaboratorModal(false);
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };

  const completeTask = async (id) => {
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

      const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, config);

      const updatedProject = { ...project };

      updatedProject.tasks = updatedProject.tasks.map((item) =>
        item._id === data._id ? data : item
      );

      setProject(updatedProject);
      setAlert({});
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
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
        deleteTask,
        collaboratorsSubmit,
        collaborator,
        addCollaborator,
        setCollaborator,
        setAlert,
        handleDeleteCollaboratorModal,
        deleteCollaboratorModal,
        deleteCollaborator,
        completeTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
