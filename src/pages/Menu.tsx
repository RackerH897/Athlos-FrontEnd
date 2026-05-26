import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {label: "Chat con Athlos",
      description: "Tu entrenadora con inteligencia artificial",
      route: "/Chat"},
    {label: "Ver Progreso",
      description: "Seguimiento de tu evolución física",
      route: "/Progreso",},
    {label: "Mis Desafíos",
      description: "Retos y metas de entrenamiento",
      route: "/Desafios",},
  ];

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 py-4">
      {/* Header */}
      <div className="w-100 d-flex justify-content-between align-items-center mb-5 px-3" style={{ maxWidth: "420px" }}>
        <div>
          <h2 className="fw-bold mb-0" style={{ color: "#ffffff", letterSpacing: "-0.5px" }}>
            Athlos
          </h2>
          <p className="mb-0" style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.82rem" }}>
            ¿Qué hacemos hoy?
          </p>
        </div>

        <button
          onClick={() => navigate("/Perfil")}
          title="Mi Perfil"
          style={{
            background: "rgba(116, 195, 210, 0.12)",
            border: "1px solid rgba(116, 195, 210, 0.3)",
            borderRadius: "50%",
            width: "46px",
            height: "46px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(116, 195, 210, 0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(116, 195, 210, 0.12)";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#74C3D2" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
        </button>
      </div>
      <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: "420px", padding: "0 12px" }}>
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.route)}
            className="text-start"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(116, 195, 210, 0.2)",
              borderRadius: "16px",
              padding: "20px 22px",
              cursor: "pointer",
              transition: "all 0.25s ease",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "rgba(116, 195, 210, 0.1)";
              btn.style.border = "1px solid rgba(116, 195, 210, 0.45)";
              btn.style.transform = "translateY(-2px)";
              btn.style.boxShadow = "0 8px 24px rgba(116, 195, 210, 0.12)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "rgba(255, 255, 255, 0.04)";
              btn.style.border = "1px solid rgba(116, 195, 210, 0.2)";
              btn.style.transform = "translateY(0)";
              btn.style.boxShadow = "none";
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "rgba(116, 195, 210, 0.12)",
                  border: "1px solid rgba(116, 195, 210, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#74C3D2",
                  flexShrink: 0,
                }}
              >
              </div>
              <div className="flex-grow-1">
                <p className="fw-bold mb-0" style={{ color: "#ffffff", fontSize: "1rem" }}>
                  {item.label}
                </p>
                <p className="mb-0" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem" }}>
                  {item.description}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="rgba(116,195,210,0.6)"
                viewBox="0 0 16 16"
                style={{ flexShrink: 0 }}
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Menu;