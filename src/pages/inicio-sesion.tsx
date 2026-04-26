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
            className="d-flex justify-content-center align-items-center bg-body-secondary"
            style={{ height: "100vh" }}
            >
                <div className="text-center">
                    <div
                        className="rounded-circle bg-primary" 
                        style={{ width: '100px', height: '100px', color: 'purple' }}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z"/></svg>
                        // logo mancuerna
                    </div>
                    <h1>Entrenador IA Athlos</h1>
                    <p>¡Bienvenido de vuelta! Inicia sesión para continuar.</p>
                    <div
                        className="p-4 rounded bg-white"
                        style={{ width: "100%", maxWidth: "400px" }}
                    >
                        <h1 className="text-center mb-4">Iniciar sesión</h1>
                        <p>Ingresa tu correo electrónico a conitnuación para iniciar sesión en tu cuenta.</p>
                        <form>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Ingresar correo"
                                        value={usuario}
                                        onChange={handleUsuarioChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <input    
                                        className="form-control"
                                        type="password"
                                        placeholder="Ingresar contraseña"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 text-center">
                                    <a href="" onClick={handleForgotPassword} className="text-decoration-underline">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <div className="d-grid gap-2">
                                        <button  onClick={ () =>{
                                            loginHandler(usuario,password)
                                        }} className="btn btn-primary" type="submit">
                                            Ingresar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-secondary" type="button">
                                            Registrarse
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
}

export default LoginPage