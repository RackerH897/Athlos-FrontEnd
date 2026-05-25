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
import DatosUsuario from "./pages/Datos-Usuario"; 
import EntornoEntrenamiento from "./pages/Entorno-Entrenamiento";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/RegistroUsuario" element={<RegistroUsuario />} />
        <Route path="/DatosUsuario" element={<DatosUsuario />} />
        <Route path="/Entorno" element={<EntornoEntrenamiento />} />

      </Routes>
    </Router>
  </StrictMode>
);