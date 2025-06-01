const Pais = require("../models/Pais");

exports.obtenerPaises = async (req, res) => {
    const paises = await Pais.find();
    res.json(paises);
};

exports.crearPais = async (req, res) => {
    try {
        const pais = new Pais(req.body);
        await pais.save();
        res.json(pais);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
