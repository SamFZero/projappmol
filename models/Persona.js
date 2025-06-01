const mongoose = require("mongoose");

const PersonaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ciudad_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ciudad", required: true },
    tipo: { type: String, enum: ["Deportista", "Actor", "Político", "Cantante", "Artista", "Escritor", "Otro"], required: true }
});

module.exports = mongoose.model("Persona", PersonaSchema);
