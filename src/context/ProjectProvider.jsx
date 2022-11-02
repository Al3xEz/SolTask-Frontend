import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

//Create context
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectContext.Provider value={{ projects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
