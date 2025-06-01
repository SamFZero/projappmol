const mongoose = require("mongoose");

const EtiquetaSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    persona_id: { type: mongoose.Schema.Types.ObjectId, ref: "Persona", required: true },
    comentario: { type: String },
    foto: String,
    ubicacion: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }
    },
    fecha: { type: Date, default: Date.now }
});

EtiquetaSchema.index({ ubicacion: "2dsphere" });

module.exports = mongoose.model("Etiqueta", EtiquetaSchema);
