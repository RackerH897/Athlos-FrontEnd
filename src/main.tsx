import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import LogIn from "./pages/inicio-sesion";
import RegistroUsuario from "./pages/Registro-Usuario";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/RegistroUsuario" element={<RegistroUsuario />} />
      </Routes>
    </Router>
  </StrictMode>
);