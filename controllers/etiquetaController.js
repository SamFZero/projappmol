const Etiqueta = require("../models/Etiqueta");

exports.crearEtiqueta = async (req, res) => {
    try {
        const etiqueta = new Etiqueta({
            ...req.body,
            usuario_id: req.usuario.id
        });
        await etiqueta.save();
        res.json(etiqueta);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.obtenerEtiquetasPorUsuario = async (req, res) => {
    const etiquetas = await Etiqueta.find({ usuario_id: req.usuario.id }).populate("persona_id");
    res.json(etiquetas);
};
