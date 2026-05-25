import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Complexion = "ectomorfo" | "mesomorfo" | "endomorfo";
type Objetivo = "bajar_peso" | "mantener_peso" | "ganar_musculo";
type Ambiente = "casa" | "gimnasio" | "aire_libre";

interface PerfilData {
  nombre: string;
  correo: string;
  peso: string;
  talla: string;
  edad: string;
  complexion: Complexion;
  objetivo: Objetivo;
  entorno: Ambiente;
}

const OBJETIVOS: Record<Objetivo, string> = {
  bajar_peso: "Reducción de peso",
  mantener_peso: "Mantenimiento físico",
  ganar_musculo: "Ganancia de masa muscular",
};

const ENTORNOS: Record<Ambiente, string> = {
  casa: "Casa",
  gimnasio: "Gimnasio",
  aire_libre: "Aire libre",
};

const ENTORNO_ICONOS: Record<Ambiente, string> = {
  casa: "M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z",
  gimnasio: "M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm.5 2.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M7 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm.5 2.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M10 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm.5 2.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5",
  aire_libre: "M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777z",
};

const PerfilUsuario = () => {
  const navigate = useNavigate();

  const [datos, setDatos] = useState<PerfilData>({
    nombre: "",
    correo: "",
    peso: "",
    talla: "",
    edad: "",
    complexion: "mesomorfo",
    objetivo: "bajar_peso",
    entorno: "casa",
  });

  const [editando, setEditando] = useState(false);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [error, setError] = useState("");

  // Carga inicial desde localStorage
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("athlos_usuario") || "{}");
    const datosFisicos = JSON.parse(localStorage.getItem("athlos_datos") || "{}");
    const entorno = JSON.parse(localStorage.getItem("athlos_entorno") || "{}");

    setDatos({
      nombre: usuario.nombre || "",
      correo: usuario.correo || "",
      peso: datosFisicos.peso || "",
      talla: datosFisicos.talla || "",
      edad: datosFisicos.edad || "",
      complexion: datosFisicos.complexion || "mesomorfo",
      objetivo: datosFisicos.objetivo || "bajar_peso",
      entorno: entorno.ambiente || "casa",
    });
  }, []);

  // IMC en tiempo real
  const pesoNum = Number(datos.peso);
  const tallaM = Number(datos.talla) / 100;
  const imc = pesoNum > 0 && tallaM > 0 ? pesoNum / (tallaM * tallaM) : null;
  const imcTexto =
    imc === null ? "" :
    imc < 18.5 ? "Bajo peso" :
    imc < 25 ? "Peso normal" :
    imc < 30 ? "Sobrepeso" : "Obesidad";

  const handleChange = (field: keyof PerfilData, value: string) => {
    setDatos((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = () => {
    setError("");

    if (!datos.nombre || !datos.correo) {
      setError("El nombre y el correo son obligatorios.");
      return;
    }
    if (datos.peso && (Number(datos.peso) < 20 || Number(datos.peso) > 400)) {
      setError("El peso debe estar entre 20 y 400 kg.");
      return;
    }
    if (datos.talla && (Number(datos.talla) < 80 || Number(datos.talla) > 260)) {
      setError("La talla debe estar entre 80 y 260 cm.");
      return;
    }
    if (datos.edad && (Number(datos.edad) < 10 || Number(datos.edad) > 120)) {
      setError("La edad debe estar entre 10 y 120 años.");
      return;
    }

    // Guardar en localStorage
    localStorage.setItem("athlos_usuario", JSON.stringify({
      nombre: datos.nombre,
      correo: datos.correo,
    }));
    localStorage.setItem("athlos_datos", JSON.stringify({
      peso: datos.peso,
      talla: datos.talla,
      edad: datos.edad,
      complexion: datos.complexion,
      objetivo: datos.objetivo,
    }));
    localStorage.setItem("athlos_entorno", JSON.stringify({
      ambiente: datos.entorno,
    }));

    setEditando(false);
    setGuardadoExitoso(true);
    setTimeout(() => setGuardadoExitoso(false), 3000);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 py-4">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <div
          className="rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
          style={{
            width: "64px",
            height: "64px",
            background: "rgba(116, 195, 210, 0.15)",
            border: "1px solid rgba(116, 195, 210, 0.3)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#74C3D2" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
        </div>
        <h2 className="fw-bold" style={{ color: "#ffffff", letterSpacing: "-0.5px" }}>Mi Perfil</h2>
        <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}>
          Resumen completo de su cuenta y configuración de entrenamiento.
        </p>
      </div>

      <div className="glass-card" style={{ width: "100%", maxWidth: "420px" }}>

        {/* Header de la card con botón editar/cancelar */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h4 className="fw-bold mb-0" style={{ color: "#ffffff" }}>
            {editando ? "Editar perfil" : "Datos del perfil"}
          </h4>
          <button
            className="btn btn-sm py-1 px-3"
            onClick={() => { setEditando(!editando); setError(""); setGuardadoExitoso(false); }}
            style={{
              background: editando ? "rgba(220,53,69,0.15)" : "rgba(116,195,210,0.12)",
              color: editando ? "#ff8080" : "#74C3D2",
              border: editando ? "1px solid rgba(220,53,69,0.3)" : "1px solid rgba(116,195,210,0.3)",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            {editando ? "Cancelar" : "✏ Editar"}
          </button>
        </div>

        {/* ── SECCIÓN 1: Cuenta ── */}
        <p className="fw-semibold mb-3" style={{ color: "#74C3D2", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Cuenta
        </p>

        <div className="mb-3 text-start">
          <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
            Nombre completo
          </label>
          {editando ? (
            <div className="input-group">
              <span className="input-group-text glass-input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
              </span>
              <input
                className="form-control glass-input"
                type="text"
                value={datos.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                placeholder="Su nombre completo"
              />
            </div>
          ) : (
            <div className="px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: datos.nombre ? "#ffffff" : "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
              {datos.nombre || "Sin datos"}
            </div>
          )}
        </div>

        <div className="mb-4 text-start">
          <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
            Correo electrónico
          </label>
          {editando ? (
            <div className="input-group">
              <span className="input-group-text glass-input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
              </span>
              <input
                className="form-control glass-input"
                type="email"
                value={datos.correo}
                onChange={(e) => handleChange("correo", e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
          ) : (
            <div className="px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: datos.correo ? "#74C3D2" : "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
              {datos.correo || "Sin datos"}
            </div>
          )}
        </div>

        {/* ── SECCIÓN 2: Datos físicos ── */}
        <p className="fw-semibold mb-3 mt-2" style={{ color: "#74C3D2", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
          Datos físicos
        </p>

        <div className="row g-3 mb-3">
          {[
            { label: "Peso (kg)", field: "peso" as keyof PerfilData, placeholder: "Ej. 72.5" },
            { label: "Talla (cm)", field: "talla" as keyof PerfilData, placeholder: "Ej. 175" },
            { label: "Edad (años)", field: "edad" as keyof PerfilData, placeholder: "Ej. 26" },
          ].map(({ label, field, placeholder }) => (
            <div className="col-4 text-start" key={field}>
              <label className="form-label fw-semibold d-block" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>
                {label}
              </label>
              {editando ? (
                <input
                  className="form-control glass-input text-center"
                  type="number"
                  step="0.1"
                  placeholder={placeholder}
                  value={datos[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  style={{ fontSize: "0.85rem" }}
                />
              ) : (
                <div className="text-center py-2 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: datos[field] ? "#ffffff" : "rgba(255,255,255,0.3)", fontSize: "0.9rem", fontWeight: "600" }}>
                  {datos[field] || "—"}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* IMC */}
        {imc !== null && (
          <div
            className="d-flex justify-content-between align-items-center mb-4 px-3 py-2 rounded"
            style={{ background: "rgba(116,195,210,0.08)", border: "1px solid rgba(116,195,210,0.2)" }}
          >
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>IMC calculado</span>
            <span className="fw-bold" style={{ color: "#74C3D2", fontSize: "0.88rem" }}>
              {imc.toFixed(1)} · {imcTexto}
            </span>
          </div>
        )}

        {/* Complexión */}
        <div className="mb-4 text-start">
          <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
            Complexión
          </label>
          {editando ? (
            <div className="d-flex gap-2">
              {(["ectomorfo", "mesomorfo", "endomorfo"] as Complexion[]).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleChange("complexion", val)}
                  className="btn flex-fill py-2 text-capitalize"
                  style={{
                    background: datos.complexion === val ? "linear-gradient(135deg, #74c3d2 0%, #4a90e2 100%)" : "rgba(255,255,255,0.04)",
                    color: datos.complexion === val ? "#0b1521" : "rgba(255,255,255,0.6)",
                    border: datos.complexion === val ? "none" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontWeight: datos.complexion === val ? "600" : "normal",
                    fontSize: "0.78rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 rounded text-capitalize" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", fontSize: "0.9rem" }}>
              {datos.complexion || "Sin datos"}
            </div>
          )}
        </div>

        {/* ── SECCIÓN 3: Objetivo y Entorno ── */}
        <p className="fw-semibold mb-3" style={{ color: "#74C3D2", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
          Objetivo y entorno
        </p>

        <div className="mb-4 text-start">
          <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
            Objetivo personal
          </label>
          {editando ? (
            <div className="d-flex flex-column gap-2">
              {(Object.entries(OBJETIVOS) as [Objetivo, string][]).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleChange("objetivo", val)}
                  className="btn text-start py-2 px-3"
                  style={{
                    background: datos.objetivo === val ? "linear-gradient(135deg, #74c3d2 0%, #4a90e2 100%)" : "rgba(255,255,255,0.04)",
                    color: datos.objetivo === val ? "#0b1521" : "rgba(255,255,255,0.6)",
                    border: datos.objetivo === val ? "none" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontWeight: datos.objetivo === val ? "600" : "normal",
                    fontSize: "0.85rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", fontSize: "0.9rem" }}>
              {OBJETIVOS[datos.objetivo] || "Sin datos"}
            </div>
          )}
        </div>

        <div className="mb-4 text-start">
          <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
            Entorno de entrenamiento
          </label>
          {editando ? (
            <div className="d-flex gap-2">
              {(Object.entries(ENTORNOS) as [Ambiente, string][]).map(([val, label]) => {
                const activo = datos.entorno === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleChange("entorno", val)}
                    className="btn flex-fill d-flex flex-column align-items-center gap-1 py-3 px-1"
                    style={{
                      background: activo ? "linear-gradient(135deg, #74c3d2 0%, #4a90e2 100%)" : "rgba(255,255,255,0.04)",
                      color: activo ? "#0b1521" : "rgba(255,255,255,0.6)",
                      border: activo ? "none" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontWeight: activo ? "600" : "normal",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d={ENTORNO_ICONOS[val]} />
                    </svg>
                    <span style={{ fontSize: "0.75rem" }}>{label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74C3D2" viewBox="0 0 16 16">
                <path d={ENTORNO_ICONOS[datos.entorno]} />
              </svg>
              <span style={{ color: "#ffffff", fontSize: "0.9rem" }}>
                {ENTORNOS[datos.entorno] || "Sin datos"}
              </span>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 mb-3 rounded" style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", color: "#ff8080", fontSize: "0.8rem" }}>
            {error}
          </div>
        )}

        {/* Éxito */}
        {guardadoExitoso && (
          <div className="p-3 mb-3 rounded d-flex align-items-center gap-2" style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#5ddb82", fontSize: "0.82rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            Perfil actualizado correctamente.
          </div>
        )}

        {/* Botones acción */}
        {editando ? (
          <div className="d-grid mt-2">
            <button className="btn glass-btn-accent py-2" onClick={handleGuardar}>
              Guardar cambios
            </button>
          </div>
        ) : (
          <div className="d-grid mt-2">
            <button
              className="btn glass-btn-primary py-2"
              onClick={() => navigate("/")}
            >
              Volver / inicio sesion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;