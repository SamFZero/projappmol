const Persona = require("../models/Persona");

exports.crearPersona = async (req, res) => {
    try {
        const persona = new Persona(req.body);
        await persona.save();
        res.json(persona);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.obtenerPersonas = async (req, res) => {
    const filtro = {};
    if (req.query.tipo) filtro.tipo = req.query.tipo;
    if (req.query.ciudad_id) filtro.ciudad_id = req.query.ciudad_id;
    const personas = await Persona.find(filtro).populate("ciudad_id");
    res.json(personas);
};
