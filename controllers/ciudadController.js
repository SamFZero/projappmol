const Ciudad = require("../models/Ciudad");

exports.crearCiudad = async (req, res) => {
    try {
        const ciudad = new Ciudad(req.body);
        await ciudad.save();
        res.json(ciudad);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.obtenerCiudades = async (req, res) => {
    try {
        const { pais } = req.query;

        const ciudades = await Ciudad.find()
            .populate("pais_id");

        const resultado = pais
            ? ciudades.filter((c) => c.pais_id?.nombre === pais)
            : ciudades;

        res.json(resultado);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
