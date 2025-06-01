const mongoose = require("mongoose");

const PaisSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    ubicacion: { type: String },
    continente: { type: String },
});

module.exports = mongoose.model("Pais", PaisSchema);
