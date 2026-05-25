import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Ambiente = "casa" | "gimnasio" | "aire_libre";

interface Ejercicio {
    nombre: string;
    grupoMuscular: string;
    equipo: string;
    calorias: number;
}

// Catálogo (mismo que el seed de tu BD: fitness.ejercicios)
const CATALOGO: Ejercicio[] = [
    { nombre: "Sentadillas", grupoMuscular: "Piernas", equipo: "Ninguno", calorias: 80 },
    { nombre: "Flexiones de pecho", grupoMuscular: "Pecho", equipo: "Ninguno", calorias: 60 },
    { nombre: "Plancha", grupoMuscular: "Core", equipo: "Ninguno", calorias: 40 },
    { nombre: "Zancadas", grupoMuscular: "Piernas", equipo: "Ninguno", calorias: 70 },
    { nombre: "Burpees", grupoMuscular: "Full body", equipo: "Ninguno", calorias: 120 },
    { nombre: "Press de banca", grupoMuscular: "Pecho", equipo: "Barra y banco", calorias: 90 },
    { nombre: "Peso muerto", grupoMuscular: "Espalda", equipo: "Barra", calorias: 110 },
    { nombre: "Remo con mancuerna", grupoMuscular: "Espalda", equipo: "Mancuerna", calorias: 75 },
];

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

    // Filtro de ejercicios según el entorno (criterio de aceptación US05)
    const ejerciciosFiltrados = CATALOGO.filter((ej) =>
        entorno === "gimnasio" ? true : ej.equipo === "Ninguno"
    );

    const handleContinuar = () => {
        const payload = { ambiente: entorno };
        // TODO: conectar con el backend (al generar el plan / POST /plans/ia)
        console.log("Entorno elegido:", payload);
        // navigate("/Home"); // <- destino cuando lo tengas
    };

    const iconStyle = { backgroundColor: "#EAF4F9", borderColor: "#D5E5EC", color: "#6B7A8A" };

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#E6F3F7", fontFamily: "system-ui, -apple-system, sans-serif", padding: "32px 0" }}
        >
            {/* Encabezado */}
            <div className="text-center mb-4">
                <div
                    className="rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
                    style={{ width: "70px", height: "70px", backgroundColor: "#74C3D2" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "35px", fill: "#1A2530" }}>
                        <path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z" />
                    </svg>
                </div>
                <h2 className="fw-bold" style={{ color: "#0B1521" }}>Tu entorno de entrenamiento</h2>
                <p className="text-muted" style={{ fontSize: "1.1rem" }}>
                    Elige dónde entrenas y te mostramos los ejercicios ideales.
                </p>
            </div>

            {/* Tarjeta */}
            <div className="p-4 p-md-5 rounded-4 shadow-sm bg-white" style={{ width: "90%", maxWidth: "500px" }}>

                {/* Selector de entorno */}
                <label className="form-label fw-semibold text-start d-block mb-2" style={{ color: "#2B3641", fontSize: "0.9rem" }}>
                    ¿Dónde vas a entrenar?
                </label>
                <div className="d-flex gap-2 mb-4">
                    {ENTORNOS.map((opt) => {
                        const activo = entorno === opt.value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setEntorno(opt.value)}
                                className="btn flex-fill d-flex flex-column align-items-center gap-2 py-3"
                                style={{
                                    backgroundColor: activo ? "#74C3D2" : "#EAF4F9",
                                    color: activo ? "#0B1521" : "#6B7A8A",
                                    border: "1px solid #D5E5EC",
                                    borderRadius: "10px",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                                    <path d={opt.icono} />
                                </svg>
                                <span className="fw-semibold" style={{ fontSize: "0.85rem" }}>{opt.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Lista de ejercicios filtrados */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0" style={{ color: "#0B1521" }}>Ejercicios disponibles</h5>
                    <span className="badge" style={{ backgroundColor: "#74C3D2", color: "#0B1521" }}>
                        {ejerciciosFiltrados.length}
                    </span>
                </div>

                <div className="d-flex flex-column gap-2 mb-4">
                    {ejerciciosFiltrados.map((ej) => (
                        <div
                            key={ej.nombre}
                            className="d-flex justify-content-between align-items-center p-3 rounded-3"
                            style={{ backgroundColor: "#EAF4F9", border: "1px solid #D5E5EC" }}
                        >
                            <div className="text-start">
                                <div className="fw-semibold" style={{ color: "#0B1521" }}>{ej.nombre}</div>
                                <small style={{ color: "#6B7A8A" }}>
                                    {ej.grupoMuscular} · {ej.equipo === "Ninguno" ? "Sin equipo" : ej.equipo}
                                </small>
                            </div>
                            <span className="fw-semibold" style={{ color: "#412903", fontSize: "0.85rem" }}>
                                {ej.calorias} kcal
                            </span>
                        </div>
                    ))}
                </div>

                {/* Botón continuar */}
                <div className="d-grid">
                    <button
                        onClick={handleContinuar}
                        className="btn fw-semibold py-2"
                        style={{ backgroundColor: "#FCD385", border: "none", color: "#412903", borderRadius: "8px" }}
                        type="button"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EntornoEntrenamiento;