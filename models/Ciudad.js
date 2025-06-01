const mongoose = require("mongoose");

const CiudadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true } // "Colombia" o "Argentina"
});

module.exports = mongoose.model("Ciudad", CiudadSchema);
