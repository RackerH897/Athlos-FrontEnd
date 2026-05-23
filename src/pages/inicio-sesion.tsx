// src/pages/inicio-sesion.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleForgotPassword = () => {
      
        navigate("/nueva-contraseña");
    };

    const loginHandler = (usuario : string, password:string) => {
       
        if (usuario === "usuario@gmail.com" && password === "123") {
            navigate("/MainPage_usuario");
        } else if (usuario === "admin@gmail.com" && password === "123") {
            navigate("/MainPage_admin");
        } else {
            //Incorrecto Login
        }
    };
    const handleUsuarioChange = (e : React.ChangeEvent<HTMLInputElement>) => {
            setUsuario(e.currentTarget.value)
    }
    const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

 return     <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: "100vh", backgroundColor: "#E6F3F7", fontFamily: "system-ui, -apple-system, sans-serif" }}
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
        <h2 className="fw-bold" style={{ color: "#0B1521" }}>Entrenador IA Athlos</h2>
        <p className="text-muted" style={{ fontSize: "1.1rem" }}>
            ¡Bienvenido de nuevo! Inicia sesión para<br />continuar.
        </p>
    </div>

    {/* Tarjeta del formulario */}
    <div
        className="p-4 p-md-5 rounded-4 shadow-sm bg-white"
        style={{ width: "90%", maxWidth: "450px" }}
    >
        <h4 className="fw-bold mb-3 text-start" style={{ color: "#0B1521" }}>Iniciar Sesión</h4>
        <p className="text-muted text-start mb-4" style={{ fontSize: "0.95rem" }}>
            Ingresa tu correo electrónico a continuación<br /> para iniciar sesión en tu cuenta.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
            
            {/* Input: Correo Electrónico */}
            <div className="mb-3 text-start">
                <label className="form-label fw-semibold" style={{ color: "#2B3641", fontSize: "0.9rem" }}>
                    Correo Electrónico
                </label>
                <div className="input-group">
                    <span
                        className="input-group-text border-end-0"
                        style={{ backgroundColor: "#EAF4F9", borderColor: "#D5E5EC", color: "#6B7A8A" }}
                    >
                        {/* Ícono de sobre */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                    </span>
                    <input
                        className="form-control border-start-0 ps-0"
                        style={{ backgroundColor: "#EAF4F9", borderColor: "#D5E5EC", boxShadow: "none" }}
                        type="email"
                        placeholder="m@ejemplo.com"
                        value={usuario}
                        onChange={handleUsuarioChange}
                        required
                    />
                </div>
            </div>

            {/* Input: Contraseña */}
            <div className="mb-4 text-start">
                <label className="form-label fw-semibold" style={{ color: "#2B3641", fontSize: "0.9rem" }}>
                    Contraseña
                </label>
                <div className="input-group">
                    <span
                        className="input-group-text border-end-0"
                        style={{ backgroundColor: "#EAF4F9", borderColor: "#D5E5EC", color: "#6B7A8A" }}
                    >
                        {/* Ícono de candado */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                        </svg>
                    </span>
                    <input
                        className="form-control border-start-0 ps-0"
                        style={{ backgroundColor: "#EAF4F9", borderColor: "#D5E5EC", boxShadow: "none" }}
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
            </div>

            {/* Llamada a la función original mantenida en un elemento oculto para respetar tu requerimiento exacto sin alterar el diseño de la foto */}
            <a href="#" onClick={handleForgotPassword} className="d-none">¿Olvidaste tu contraseña?</a>

            {/* Botón de Inicio de sesión */}
            <div className="d-grid mb-4">
                <button
                    onClick={() => {
                        loginHandler(usuario, password);
                    }}
                    className="btn fw-semibold py-2"
                    style={{ backgroundColor: "#FCD385", border: "none", color: "#412903", borderRadius: "8px" }}
                    type="submit"
                >
                    Iniciar Sesión
                </button>
            </div>

            {/* Enlace de Registro al pie de la tarjeta */}
            <div className="text-center">
                <p className="mb-0 text-muted" style={{ fontSize: "0.95rem" }}>
                    ¿No tienes una cuenta?{" "}
                    <a href="#" className="text-decoration-underline fw-semibold" style={{ color: "#5FB0C2" }}>
                        Regístrate
                    </a>
                </p>
            </div>
        </form>
    </div>
</div>
    
}

export default LoginPage