import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Chat con Athlos",
      description: "Tu entrenadora con inteligencia artificial",
      route: "/Chat",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
        </svg>
      )
    },
    {
      label: "Ver Progreso",
      description: "Seguimiento de tu evolución física",
      route: "/Progreso",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
        </svg>
      )
    },
    {
      label: "Mis Desafíos",
      description: "Retos y metas de entrenamiento",
      route: "/Desafios",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.526-2.15 2.645-3.833 2.97V13h4a.5.5 0 0 1 0 1h-1.5v1.5a.5.5 0 0 1-1 0V14h-1.5v-1.5a.5.5 0 0 1-1 0V13h4a.5.5 0 0 1 0-1h-4v-2.046c-1.683-.325-3.043-1.444-3.833-2.97a3 3 0 1 1-1.133-5.89A92 92 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1C3.394 1.254 3.298 1.53 3.213 1.832 3.55 1.865 3.91 1.896 4.3 1.921c.071-.428.16-.84.265-1.233A127 127 0 0 0 3.504 1m8.992 0a127 127 0 0 0-1.062.312c.105.393.194.805.265 1.233.39-.025.75-.056 1.087-.089C12.702 1.53 12.606 1.254 12.496 1m-1.745 1.52a8 8 0 0 0-.256-1.52h-5a8 8 0 0 0-.256 1.52c1.7.135 3.424.135 5.512 0"/>
        </svg>
      )
    },
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
                {item.icon}
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