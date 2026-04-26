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
                    ></div>
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