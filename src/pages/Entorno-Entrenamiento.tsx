import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Ambiente = "casa" | "gimnasio" | "aire_libre";



const ENTORNOS: { value: Ambiente; label: string; icono: string }[] = [
    {
        value: "casa",
        label: "Casa",
        icono: "M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z",
    },
    {
        value: "gimnasio",
        label: "Gimnasio",
        icono: "M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm.5 2.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M7 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm.5 2.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M10 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm.5 2.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5",
    },
    {
        value: "aire_libre",
        label: "Aire libre",
        icono: "M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777z",
    },
];

const EntornoEntrenamiento = () => {
    const navigate = useNavigate();
    const [entorno, setEntorno] = useState<Ambiente>("casa");



    const handleContinuar = () => {
        const payload = { ambiente: entorno };
        console.log("Entorno seleccionado:", payload);
        // Flujo simulado de fin de sprint 1: Redirigir al inicio o mostrar fin de flujo
        navigate("/");
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 py-4">
            {/* Encabezado principal */}
            <div className="text-center mb-4">
                <div
                    className="rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
                    style={{
                        width: "64px",
                        height: "64px",
                        background: "rgba(116, 195, 210, 0.15)",
                        border: "1px solid rgba(116, 195, 210, 0.3)"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "30px", fill: "#74C3D2" }}>
                        <path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z" />
                    </svg>
                </div>
                <h2 className="fw-bold" style={{ color: "#ffffff", letterSpacing: "-0.5px" }}>Entorno</h2>
                <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}>
                    Configure el entorno donde llevará a cabo su rutina física.
                </p>
            </div>

            <div className="glass-card">
                <label className="form-label fw-semibold text-start d-block mb-3" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.85rem" }}>
                    ¿Dónde planea entrenar?
                </label>
                
                {/* Botones de Selección de Entorno */}
                <div className="d-flex gap-2 mb-4">
                    {ENTORNOS.map((opt) => {
                        const activo = entorno === opt.value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setEntorno(opt.value)}
                                className="btn flex-fill d-flex flex-column align-items-center gap-2 py-3 px-1"
                                style={{
                                    background: activo ? "linear-gradient(135deg, #74c3d2 0%, #4a90e2 100%)" : "rgba(255, 255, 255, 0.04)",
                                    color: activo ? "#0b1521" : "rgba(255, 255, 255, 0.6)",
                                    border: activo ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "12px",
                                    fontWeight: activo ? "600" : "normal",
                                    transition: "all 0.25s ease"
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                    <path d={opt.icono} />
                                </svg>
                                <span style={{ fontSize: "0.8rem" }}>{opt.label}</span>
                            </button>
                        );
                    })}
                </div>



                {/* Botón de finalización */}
                <div className="d-grid mt-4">
                    <button
                        onClick={handleContinuar}
                        className="btn glass-btn-accent py-2"
                        type="button"
                    >
                        Completar Configuración
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EntornoEntrenamiento;