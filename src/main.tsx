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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/LogIn" element={<LogIn />} /> {/* alias por si alguien usa la mayúscula */}
        <Route path="*" element={<h1 style={{color:"#fff",textAlign:"center"}}>404 — Página no encontrada</h1>} />
      </Routes>
    </Router>
  </StrictMode>
);