const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ciudades", require("./routes/ciudadRoutes"));
app.use("/api/personas", require("./routes/personaRoutes"));
app.use("/api/sitios", require("./routes/sitioRoutes"));
app.use("/api/visitas", require("./routes/visitaRoutes"));
app.use("/api/etiquetas", require("./routes/etiquetaRoutes"));
app.use("/api/consultas", require("./routes/consultasRoutes"));
app.use("/api/usuarios", require("./routes/userRoutes"));


// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));