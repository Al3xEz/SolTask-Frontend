import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectProvider } from "./context/ProjectProvider";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import NewCollaborator from "./pages/NewCollaborator";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              {/*---------------Public Area---------------*/}
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
            </Route>
            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route
                path="new-collaborator/:id"
                element={<NewCollaborator />}
              />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
