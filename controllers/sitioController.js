const Sitio = require("../models/Sitio");

exports.crearSitio = async (req, res) => {
    try {
        const sitio = new Sitio(req.body);
        await sitio.save();
        res.json(sitio);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.obtenerSitios = async (req, res) => {
    const { ciudad_id } = req.query;
    const sitios = await Sitio.find(ciudad_id ? { ciudad_id } : {}).populate("ciudad_id");
    res.json(sitios);
};

exports.obtenerSitioPorId = async (req, res) => {
    try {
        const sitio = await Sitio.findById(req.params.id).populate("ciudad_id");
        if (!sitio) {
            return res.status(404).json({ msg: "Sitio no encontrado" });
        }
        res.json(sitio);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};