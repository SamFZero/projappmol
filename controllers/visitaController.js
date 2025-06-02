const Visita = require("../models/Visita");

exports.registrarVisita = async (req, res) => {
    try {
        const visita = new Visita({
            ...req.body,
            usuario_id: req.usuario.id
        });
        await visita.save();
        res.json(visita);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.obtenerVisitasPorUsuario = async (req, res) => {
    try {
        const visitas = await Visita.find({ usuario_id: req.usuario.id })
            .populate("sitio_id");
        res.json(visitas);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
