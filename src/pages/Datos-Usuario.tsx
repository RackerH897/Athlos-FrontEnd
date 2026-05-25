import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Complexion = "ectomorfo" | "mesomorfo" | "endomorfo";
type Objetivo = "bajar_peso" | "mantener_peso" | "ganar_musculo";

const DatosUsuario = () => {
    const navigate = useNavigate();

    const [peso, setPeso] = useState<string>("");
    const [talla, setTalla] = useState<string>("");
    const [edad, setEdad] = useState<string>("");
    const [complexion, setComplexion] = useState<Complexion>("mesomorfo");
    const [objetivo, setObjetivo] = useState<Objetivo>("bajar_peso");
    const [error, setError] = useState<string>("");

    const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => setPeso(e.currentTarget.value);
    const handleTallaChange = (e: React.ChangeEvent<HTMLInputElement>) => setTalla(e.currentTarget.value);
    const handleEdadChange = (e: React.ChangeEvent<HTMLInputElement>) => setEdad(e.currentTarget.value);

    // IMC en vivo
    const pesoNum = Number(peso);
    const tallaM = Number(talla) / 100;
    const imc = pesoNum > 0 && tallaM > 0 ? pesoNum / (tallaM * tallaM) : null;
    const imcTexto =
        imc === null ? "" :
        imc < 18.5 ? "Bajo peso" :
        imc < 25 ? "Peso normal" :
        imc < 30 ? "Sobrepeso" : "Obesidad";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Rangos según la base de datos: peso 20-400, talla 80-260, edad 10-120
        if (pesoNum < 20 || pesoNum > 400) return setError("El peso debe estar entre 20 y 400 kg.");
        if (Number(talla) < 80 || Number(talla) > 260) return setError("La talla debe estar entre 80 y 260 cm.");
        if (Number(edad) < 10 || Number(edad) > 120) return setError("La edad debe estar entre 10 y 120 años.");

        const payload = {
            peso: pesoNum,
            talla: Number(talla),
            edad: Number(edad),
            complexion,
            objetivo,
        };
        // TODO: conectar con el backend (POST /users/me/personal-data)
        console.log("Datos físicos:", payload);
        // navigate("/Home"); // <- descomenta cuando tengas la pantalla destino
        navigate("/Entorno"); 
    };

    // estilos reutilizables para los inputs (igual que en tu registro)
    const iconStyle = { backgroundColor: "#EAF4F9", borderColor: "#D5E5EC", color: "#6B7A8A" };
    const inputStyle = { backgroundColor: "#EAF4F9", borderColor: "#D5E5EC", boxShadow: "none" };

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#E6F3F7", fontFamily: "system-ui, -apple-system, sans-serif", padding: "32px 0" }}
        >
            {/* Encabezado principal */}
            <div className="text-center mb-4">
                <div
                    className="rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
                    style={{ width: "70px", height: "70px", backgroundColor: "#74C3D2" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "35px", fill: "#1A2530" }}>
                        <path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z" />
                    </svg>
                </div>
                <h2 className="fw-bold" style={{ color: "#0B1521" }}>Tus datos físicos</h2>
                <p className="text-muted" style={{ fontSize: "1.1rem" }}>
                    Los usamos para calcular tu IMC y personalizar tu plan.
                </p>
            </div>

            {/* Tarjeta del formulario */}
            <div className="p-4 p-md-5 rounded-4 shadow-sm bg-white" style={{ width: "90%", maxWidth: "450px" }}>
                <h4 className="fw-bold mb-3 text-start" style={{ color: "#0B1521" }}>Completa tu perfil</h4>
                <p className="text-muted text-start mb-4" style={{ fontSize: "0.95rem" }}>
                    Ingresa tus medidas para empezar.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Peso */}
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold" style={{ color: "#2B3641", fontSize: "0.9rem" }}>Peso (kg)</label>
                        <div className="input-group">
                            <span className="input-group-text border-end-0" style={iconStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M8 4a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 4m1.024 2.633L9.4 5.7a.2.2 0 0 0-.36-.173l-.473.879A2 2 0 0 0 8 6a2 2 0 1 0 1.024.633" />
                                </svg>
                            </span>
                            <input className="form-control border-start-0 ps-0" style={inputStyle} type="number" placeholder="Ej. 70.5" value={peso} onChange={handlePesoChange} required />
                        </div>
                    </div>

                    {/* Talla */}
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold" style={{ color: "#2B3641", fontSize: "0.9rem" }}>Talla (cm)</label>
                        <div className="input-group">
                            <span className="input-group-text border-end-0" style={iconStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0a.5.5 0 0 1 .354.146l3 3a.5.5 0 0 1-.708.708L8.5 1.707v12.586l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 14.293V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3A.5.5 0 0 1 8 0" />
                                </svg>
                            </span>
                            <input className="form-control border-start-0 ps-0" style={inputStyle} type="number" placeholder="Ej. 175" value={talla} onChange={handleTallaChange} required />
                        </div>
                    </div>

                    {/* Edad */}
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold" style={{ color: "#2B3641", fontSize: "0.9rem" }}>Edad (años)</label>
                        <div className="input-group">
                            <span className="input-group-text border-end-0" style={iconStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                </svg>
                            </span>
                            <input className="form-control border-start-0 ps-0" style={inputStyle} type="number" placeholder="Ej. 24" value={edad} onChange={handleEdadChange} required />
                        </div>
                    </div>

                    {/* IMC en vivo */}
                    {imc !== null && (
                        <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3" style={{ backgroundColor: "#EAF4F9" }}>
                            <span className="fw-semibold" style={{ color: "#2B3641" }}>IMC estimado</span>
                            <span className="fw-bold" style={{ color: "#0B1521" }}>{imc.toFixed(1)} · {imcTexto}</span>
                        </div>
                    )}

                    {/* Complexión */}
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold" style={{ color: "#2B3641", fontSize: "0.9rem" }}>Complexión</label>
                        <div className="d-flex gap-2">
                            {([["ectomorfo", "Ectomorfo"], ["mesomorfo", "Mesomorfo"], ["endomorfo", "Endomorfo"]] as [Complexion, string][]).map(([val, label]) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setComplexion(val)}
                                    className="btn flex-fill fw-semibold py-2"
                                    style={{
                                        backgroundColor: complexion === val ? "#74C3D2" : "#EAF4F9",
                                        color: complexion === val ? "#0B1521" : "#6B7A8A",
                                        border: "1px solid #D5E5EC",
                                        borderRadius: "8px",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Objetivo */}
                    <div className="mb-4 text-start">
                        <label className="form-label fw-semibold" style={{ color: "#2B3641", fontSize: "0.9rem" }}>Objetivo</label>
                        <div className="d-flex flex-column gap-2">
                            {([["bajar_peso", "Bajar peso"], ["mantener_peso", "Mantener peso"], ["ganar_musculo", "Ganar músculo"]] as [Objetivo, string][]).map(([val, label]) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setObjetivo(val)}
                                    className="btn text-start fw-semibold py-2"
                                    style={{
                                        backgroundColor: objetivo === val ? "#74C3D2" : "#EAF4F9",
                                        color: objetivo === val ? "#0B1521" : "#6B7A8A",
                                        border: "1px solid #D5E5EC",
                                        borderRadius: "8px",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mensaje de error */}
                    {error && <p className="text-danger text-start mb-3" style={{ fontSize: "0.9rem" }}>{error}</p>}

                    {/* Botón guardar */}
                    <div className="d-grid mb-2">
                        <button className="btn fw-semibold py-2" style={{ backgroundColor: "#FCD385", border: "none", color: "#412903", borderRadius: "8px" }} type="submit">
                            Guardar datos / Continuar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DatosUsuario;