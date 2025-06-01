const mongoose = require("mongoose");

const VisitaSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    sitio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Sitio", required: true },
    foto: String,
    ubicacion: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }
    },
    fecha: { type: Date, default: Date.now }
});

VisitaSchema.index({ ubicacion: "2dsphere" });

module.exports = mongoose.model("Visita", VisitaSchema);
