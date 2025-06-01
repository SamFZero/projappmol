const mongoose = require("mongoose");

const SitioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ciudad_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ciudad", required: true },
    tipo: {
        type: String, enum: ["Iglesia", "Estatua", "Parque", "Estadio", "Museo", "Restaurante", "Hotel", "Otro", "Teatro"], required: true
    },
    ubicacion: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true } // [longitud, latitud]
    },
    platos: [
        {
            nombre: String,
            precio: Number
        }
    ]
});

SitioSchema.index({ ubicacion: "2dsphere" }); // Para geolocalización

module.exports = mongoose.model("Sitio", SitioSchema);
