import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ==========================================
// PROMPT BASE DE ATHLOS (SISTEMA)
// Modifica este prompt para personalizar el bot.
// ==========================================
const BASE_SYSTEM_PROMPT = `Eres Athlos, una entrenadora experta de acondicionamiento físico con Inteligencia Artificial.
Tu objetivo es guiar al usuario en sus entrenamientos y resolver sus dudas sobre ejercicios, rutinas y salud física de forma motivadora, profesional y enérgica en español.`;

interface Ejercicio {
    id: string;
    nombre: string;
    grupo_muscular: string;
    objetivo: string;
    ambiente: string;
    dificultad: string;
    descripcion: string;
    series: string;
    repeticiones: string;
    instrucciones: string;
}

interface Mensaje {
    id: string;
    sender: "user" | "athlos" | "system";
    text: string;
    timestamp: Date;
}

const Chat: React.FC = () => {
    const navigate = useNavigate();
    const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
    const [datosFisicos, setDatosFisicos] = useState({
        nombre: "",
        peso: "",
        talla: "",
        edad: "",
        complexion: "",
        objetivo: "",
        entorno: "",
    });

    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [inputMsg, setInputMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mapeos visuales para los badges del perfil
    const mostrarObjetivo: Record<string, string> = {
        bajar_peso: "Bajar Peso",
        mantener_peso: "Mantener Peso",
        ganar_musculo: "Ganar Músculo",
    };

    const mostrarEntorno: Record<string, string> = {
        casa: "Casa",
        gimnasio: "Gimnasio",
        aire_libre: "Aire libre",
    };

    // 1. Cargar métricas del usuario y base de datos RAG (CSV)
    useEffect(() => {
        // Cargar datos del perfil
        const usuario = JSON.parse(localStorage.getItem("athlos_usuario") || "{}");
        const datos = JSON.parse(localStorage.getItem("athlos_datos") || "{}");
        const entorno = JSON.parse(localStorage.getItem("athlos_entorno") || "{}");

        const physicalData = {
            nombre: usuario.nombre || "Usuario",
            peso: datos.peso || "",
            talla: datos.talla || "",
            edad: datos.edad || "",
            complexion: datos.complexion || "",
            objetivo: datos.objetivo || "",
            entorno: entorno.ambiente || "",
        };
        setDatosFisicos(physicalData);

        // Cargar ejercicios desde el archivo ejercicios.csv
        fetch("/ejercicios.csv")
            .then((res) => {
                if (!res.ok) throw new Error("No se pudo cargar ejercicios.csv");
                return res.text();
            })
            .then((text) => {
                const parsed = parseCSV(text);
                setEjercicios(parsed);
            })
            .catch((err) => {
                console.error("Error cargando ejercicios de referencia:", err);
            });

        // Cargar historial de chat previo de localStorage si existe
        const cachedChat = localStorage.getItem("athlos_chat_history");
        if (cachedChat) {
            try {
                const parsedHistory = JSON.parse(cachedChat).map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                setMensajes(parsedHistory);
            } catch (e) {
                inicializarMensajeBienvenida(physicalData.nombre);
            }
        } else {
            inicializarMensajeBienvenida(physicalData.nombre || "Usuario");
        }
    }, []);

    // Guardar historial del chat en localStorage al cambiar
    useEffect(() => {
        if (mensajes.length > 0) {
            localStorage.setItem("athlos_chat_history", JSON.stringify(mensajes));
        }
    }, [mensajes]);

    // Auto-scroll al fondo
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes, loading]);

    // Inicializa el saludo de bienvenida
    const inicializarMensajeBienvenida = (nombre: string) => {
        setMensajes([
            {
                id: "welcome",
                sender: "athlos",
                text: `¡Hola ${nombre}! Soy **Athlos**, tu entrenadora personal con inteligencia artificial. 💪🏋️‍♀️\n\nEstoy lista para ayudarte a cumplir tus metas. ¿Qué parte del cuerpo te gustaría entrenar hoy o qué tipo de rutina prefieres?`,
                timestamp: new Date(),
            },
        ]);
    };

    // Parser simple de CSV sin librerías externas
    const parseCSV = (text: string): Ejercicio[] => {
        const lines = text.split("\n");
        if (lines.length === 0) return [];

        const headers = lines[0].split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));
        const data: Ejercicio[] = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const row: string[] = [];
            let insideQuote = false;
            let entry = "";
            for (let j = 0; j < line.length; j++) {
                const char = line[j];
                if (char === '"') {
                    insideQuote = !insideQuote;
                } else if (char === "," && !insideQuote) {
                    row.push(entry.trim().replace(/^["']|["']$/g, ""));
                    entry = "";
                } else {
                    entry += char;
                }
            }
            row.push(entry.trim().replace(/^["']|["']$/g, ""));

            if (row.length >= headers.length) {
                const obj: any = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index] || "";
                });
                data.push(obj as Ejercicio);
            }
        }
        return data;
    };

    // Construcción del System Prompt con TODOS los ejercicios del CSV
    const buildSystemPrompt = (): string => {
        // Formatear TODOS los ejercicios cargados del CSV como catálogo completo
        const catalogoCompleto = ejercicios
            .map(
                (ex) =>
                    `- ${ex.nombre} | Músculo: ${ex.grupo_muscular} | Objetivo: ${ex.objetivo} | Entorno: ${ex.ambiente} | Dificultad: ${ex.dificultad} | Series: ${ex.series} | Reps: ${ex.repeticiones} | Técnica: ${ex.instrucciones}`
            )
            .join("\n");

        return `${BASE_SYSTEM_PROMPT}

DATOS FÍSICOS DEL USUARIO (usa estos datos para personalizar las rutinas):
- Nombre: ${datosFisicos.nombre || "Usuario"}
- Peso: ${datosFisicos.peso ? `${datosFisicos.peso} kg` : "No especificado"}
- Talla: ${datosFisicos.talla ? `${datosFisicos.talla} cm` : "No especificada"}
- Edad: ${datosFisicos.edad ? `${datosFisicos.edad} años` : "No especificada"}
- Complexión: ${datosFisicos.complexion || "No especificada"}
- Objetivo: ${datosFisicos.objetivo || "No especificado"}
- Entorno de entrenamiento: ${datosFisicos.entorno || "No especificado"}

CATÁLOGO COMPLETO DE EJERCICIOS DISPONIBLES (ejercicios.csv):
${catalogoCompleto || "Error: no se pudo cargar el catálogo de ejercicios."}

REGLAS OBLIGATORIAS:
1. Cuando el usuario pida rutinas, planes o ejercicios, SIEMPRE responde usando EXCLUSIVAMENTE ejercicios del catálogo de arriba. NUNCA inventes ejercicios.
2. Para cada ejercicio que sugieras incluye: nombre exacto, grupo muscular, series, repeticiones y técnica de ejecución tal como aparecen en el catálogo.
3. Filtra los ejercicios según el entorno del usuario (casa/gimnasio/aire_libre). Si su entorno es "casa", solo sugiere ejercicios con entorno "casa".
4. Prioriza ejercicios cuyo objetivo coincida con el objetivo del usuario.
5. Personaliza la rutina mencionando el peso, talla y edad del usuario para justificar tus elecciones.
6. Si el usuario no ha configurado sus datos físicos, invítalo amablemente a completar su perfil.
7. Responde siempre en español, de forma motivadora y estructurada con viñetas.`;
    };

    // Enviar mensaje a la API de Gemini
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMsg.trim() || loading) return;

        const userMessageText = inputMsg.trim();
        setInputMsg("");

        // Agregar mensaje del usuario a la pantalla
        const userMsg: Mensaje = {
            id: `msg-${Date.now()}-u`,
            sender: "user",
            text: userMessageText,
            timestamp: new Date(),
        };

        const nuevoHistorial = [...mensajes, userMsg];
        setMensajes(nuevoHistorial);
        setLoading(true);

        // Validación de API Key
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "TU_API_KEY_AQUI") {
            setTimeout(() => {
                setMensajes((prev) => [
                    ...prev,
                    {
                        id: `msg-${Date.now()}-sys`,
                        sender: "athlos",
                        text: `⚠️ **¡Llave de API no configurada!**\n\nPor favor, ingresa tu Gemini API Key en la parte superior del archivo \`src/pages/Chat.tsx\` (\`const GEMINI_API_KEY = "..."\`) o configúrala en tus variables de entorno para habilitar las respuestas en tiempo real de Athlos AI.`,
                        timestamp: new Date(),
                    },
                ]);
                setLoading(false);
            }, 1000);
            return;
        }

        try {
            // 1. Construir el system prompt con TODOS los ejercicios del CSV
            const systemPrompt = buildSystemPrompt();

            // 2. Dar formato a la conversación para la API de Gemini (Historial)
            const contents = nuevoHistorial
                .filter((msg) => msg.sender === "user" || msg.sender === "athlos")
                .map((msg) => ({
                    role: msg.sender === "user" ? "user" : "model",
                    parts: [{ text: msg.text }],
                }));

            // 3. Petición POST a la API de Gemini
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: contents,
                        systemInstruction: {
                            parts: [{ text: systemPrompt }],
                        },
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 2048,
                        },
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Error en API: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const responseText =
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Lo siento, no he podido procesar esa consulta. Inténtalo de nuevo.";

            setMensajes((prev) => [
                ...prev,
                {
                    id: `msg-${Date.now()}-a`,
                    sender: "athlos",
                    text: responseText,
                    timestamp: new Date(),
                },
            ]);
        } catch (err) {
            console.error("Error al conectar con Gemini API:", err);
            setMensajes((prev) => [
                ...prev,
                {
                    id: `msg-${Date.now()}-err`,
                    sender: "athlos",
                    text: `❌ **Error de conexión**\n\nNo he podido conectarme con la API de Gemini. Por favor verifica que tu API Key sea correcta y tengas conexión a internet.`,
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Limpiar la conversación
    const handleLimpiarChat = () => {
        if (window.confirm("¿Deseas borrar todo el historial de conversación con Athlos?")) {
            localStorage.removeItem("athlos_chat_history");
            inicializarMensajeBienvenida(datosFisicos.nombre || "Usuario");
        }
    };

    // Formateador personalizado de respuestas con estilo premium para negritas, viñetas y saltos de línea
    const formatMessageText = (text: string) => {
        return text.split("\n").map((line, idx) => {
            let cleanLine = line;

            // Soporte básico de negritas: **texto** -> <strong style={{ color: "#74C3D2" }}>texto</strong>
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = [];
            let lastIndex = 0;
            let match;

            while ((match = boldRegex.exec(cleanLine)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(cleanLine.substring(lastIndex, match.index));
                }
                parts.push(
                    <strong key={match.index} style={{ color: "#74C3D2", fontWeight: "600" }}>
                        {match[1]}
                    </strong>
                );
                lastIndex = boldRegex.lastIndex;
            }
            if (lastIndex < cleanLine.length) {
                parts.push(cleanLine.substring(lastIndex));
            }

            const renderedLine = parts.length > 0 ? parts : cleanLine;

            // Soporte para viñetas: líneas que inician con "* " o "- "
            if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
                const contentWithoutBullet = line.trim().substring(2);

                // Re-formatear negritas dentro de la viñeta
                const bulletParts = [];
                let bulletLastIdx = 0;
                let bulletMatch;
                while ((bulletMatch = boldRegex.exec(contentWithoutBullet)) !== null) {
                    if (bulletMatch.index > bulletLastIdx) {
                        bulletParts.push(contentWithoutBullet.substring(bulletLastIdx, bulletMatch.index));
                    }
                    bulletParts.push(
                        <strong key={bulletMatch.index} style={{ color: "#74C3D2", fontWeight: "600" }}>
                            {bulletMatch[1]}
                        </strong>
                    );
                    bulletLastIdx = boldRegex.lastIndex;
                }
                if (bulletLastIdx < contentWithoutBullet.length) {
                    bulletParts.push(contentWithoutBullet.substring(bulletLastIdx));
                }

                return (
                    <li key={idx} className="mb-2" style={{ marginLeft: "16px", listStyleType: "disc", color: "#e8eaf0" }}>
                        {bulletParts.length > 0 ? bulletParts : contentWithoutBullet}
                    </li>
                );
            }

            return (
                <div key={idx} className={line.trim() === "" ? "py-1" : "mb-2"} style={{ lineHeight: "1.45" }}>
                    {renderedLine}
                </div>
            );
        });
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 py-3">
            <div
                className="glass-card d-flex flex-column"
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    height: "700px",
                    padding: "20px",
                    position: "relative",
                }}
            >
                {/* CABECERA */}
                <div
                    className="d-flex justify-content-between align-items-center mb-2 pb-2"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                    <button
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        onClick={() => navigate("/Menu")}
                        style={{
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            transition: "all 0.2s ease",
                        }}
                        title="Volver al Menú"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                            />
                        </svg>
                    </button>

                    <div className="text-center flex-grow-1">
                        <h4 className="fw-bold mb-0 text-white" style={{ fontSize: "1.05rem", letterSpacing: "-0.2px" }}>
                            Athlos AI
                        </h4>
                        <span style={{ fontSize: "0.72rem", color: "#74C3D2", fontWeight: "600" }}>
                            ● Entrenadora Personal
                        </span>
                    </div>

                    <button
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        onClick={handleLimpiarChat}
                        style={{
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "rgba(255, 255, 255, 0.6)",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            transition: "all 0.2s ease",
                        }}
                        title="Limpiar conversación"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                        </svg>
                    </button>
                </div>

                {/* INDICADOR DE MÉTRICAS ACTIVAS EN PERFIL */}
                {datosFisicos.peso || datosFisicos.objetivo || datosFisicos.entorno ? (
                    <div
                        className="d-flex flex-wrap gap-1 justify-content-center mb-3 p-2 rounded"
                        style={{
                            background: "rgba(116, 195, 210, 0.06)",
                            border: "1px solid rgba(116, 195, 210, 0.15)",
                        }}
                    >
                        {datosFisicos.peso && (
                            <span
                                className="badge text-white font-monospace"
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    fontSize: "0.68rem",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    padding: "4px 8px",
                                }}
                            >
                                ⚖️ {datosFisicos.peso} kg
                            </span>
                        )}
                        {datosFisicos.talla && (
                            <span
                                className="badge text-white font-monospace"
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    fontSize: "0.68rem",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    padding: "4px 8px",
                                }}
                            >
                                📏 {datosFisicos.talla} cm
                            </span>
                        )}
                        {datosFisicos.objetivo && (
                            <span
                                className="badge text-white"
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    fontSize: "0.68rem",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    padding: "4px 8px",
                                }}
                            >
                                🎯 {mostrarObjetivo[datosFisicos.objetivo] || datosFisicos.objetivo}
                            </span>
                        )}
                        {datosFisicos.entorno && (
                            <span
                                className="badge text-white"
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    fontSize: "0.68rem",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    padding: "4px 8px",
                                }}
                            >
                                📍 {mostrarEntorno[datosFisicos.entorno] || datosFisicos.entorno}
                            </span>
                        )}
                    </div>
                ) : (
                    <div
                        className="alert p-2 text-center mb-3"
                        style={{
                            background: "rgba(252, 211, 133, 0.08)",
                            border: "1px solid rgba(252, 211, 133, 0.2)",
                            color: "#fcd385",
                            fontSize: "0.72rem",
                            borderRadius: "8px",
                        }}
                    >
                        ⚠️ Perfil incompleto. Completa tus métricas en "Mi Perfil" para recomendaciones adaptadas a ti.
                    </div>
                )}

                {/* LISTADO DE MENSAJES */}
                <div
                    className="flex-grow-1 overflow-y-auto mb-3 pe-1"
                    style={{
                        fontSize: "0.85rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    {mensajes.map((msg) => {
                        const isUser = msg.sender === "user";
                        return (
                            <div
                                key={msg.id}
                                className={`d-flex flex-column ${isUser ? "align-items-end" : "align-items-start"}`}
                            >
                                {/* Remitente */}
                                <span
                                    style={{
                                        fontSize: "0.68rem",
                                        color: isUser ? "rgba(116, 195, 210, 0.8)" : "rgba(255, 255, 255, 0.4)",
                                        marginBottom: "3px",
                                        fontWeight: "500",
                                        padding: "0 4px",
                                    }}
                                >
                                    {isUser ? "Tú" : "Athlos"}
                                </span>

                                {/* Burbuja */}
                                <div
                                    className="rounded-3 px-3 py-2"
                                    style={{
                                        maxWidth: "85%",
                                        background: isUser
                                            ? "linear-gradient(135deg, rgba(116, 195, 210, 0.22) 0%, rgba(74, 144, 226, 0.22) 100%)"
                                            : "rgba(255, 255, 255, 0.05)",
                                        border: isUser
                                            ? "1px solid rgba(116, 195, 210, 0.35)"
                                            : "1px solid rgba(255, 255, 255, 0.08)",
                                        boxShadow: isUser
                                            ? "0 4px 12px rgba(116, 195, 210, 0.06)"
                                            : "0 4px 12px rgba(0, 0, 0, 0.15)",
                                        color: "#ffffff",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {formatMessageText(msg.text)}
                                </div>
                            </div>
                        );
                    })}

                    {/* INDICADOR DE CARGA (ESCRIBIENDO...) */}
                    {loading && (
                        <div className="d-flex flex-column align-items-start">
                            <span
                                style={{
                                    fontSize: "0.68rem",
                                    color: "rgba(255, 255, 255, 0.4)",
                                    marginBottom: "3px",
                                    fontWeight: "500",
                                }}
                            >
                                Athlos
                            </span>
                            <div
                                className="rounded-3 px-3 py-2 d-flex align-items-center gap-1"
                                style={{
                                    background: "rgba(255, 255, 255, 0.04)",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                    color: "rgba(255, 255, 255, 0.5)",
                                    fontSize: "0.8",
                                    fontStyle: "italic",
                                }}
                            >
                                <span>Athlos está escribiendo</span>
                                <span className="typing-dot" style={{ animation: "typing 1.4s infinite", animationDelay: "0s" }}>.</span>
                                <span className="typing-dot" style={{ animation: "typing 1.4s infinite", animationDelay: "0.2s" }}>.</span>
                                <span className="typing-dot" style={{ animation: "typing 1.4s infinite", animationDelay: "0.4s" }}>.</span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* FORMULARIO DE ENVÍO */}
                <form onSubmit={handleSend} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control glass-input flex-grow-1"
                        placeholder="Pregúntale a Athlos..."
                        value={inputMsg}
                        onChange={(e) => setInputMsg(e.target.value)}
                        disabled={loading}
                        style={{ fontSize: "0.85rem" }}
                    />
                    <button
                        type="submit"
                        className="btn glass-btn-primary d-flex align-items-center justify-content-center"
                        disabled={loading || !inputMsg.trim()}
                        style={{
                            width: "42px",
                            height: "42px",
                            padding: "0",
                            borderRadius: "10px",
                            flexShrink: 0,
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            style={{ transform: "rotate(45deg)", marginLeft: "-2px", marginTop: "-2px" }}
                        >
                            <path d="M15.854.146a.5.5 0 0 1 .11.525l-5.5 15a.5.5 0 0 1-.94-.315l-1.85-5.27-5.27-1.85a.5.5 0 0 1-.315-.94l15-5.5a.5.5 0 0 1 .525.11zM14.5 1.5l-12 4.4 3.7 1.3 1.3 3.7z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* ESTILOS INTERNOS DE ANIMACIÓN PARA EL CARGANDO */}
            <style>{`
                @keyframes typing {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }
                .typing-dot {
                    display: inline-block;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default Chat;
