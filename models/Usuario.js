const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    rol: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sitio" }]
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
