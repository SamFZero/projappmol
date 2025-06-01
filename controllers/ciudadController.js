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
    const { pais } = req.query;
    const filtro = pais ? { pais } : {};
    const ciudades = await Ciudad.find(filtro);
    res.json(ciudades);
};
