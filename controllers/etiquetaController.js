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

exports.famososMasEtiquetados = async (req, res) => {
    try {
        const resultado = await Etiqueta.aggregate([
            {
                $group: {
                    _id: "$persona_id",
                    cantidad: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "personas",
                    localField: "_id",
                    foreignField: "_id",
                    as: "persona",
                },
            },
            { $unwind: "$persona" },
            {
                $project: {
                    nombre: "$persona.nombre",
                    tipo: "$persona.tipo",
                    cantidad: 1,
                },
            },
            { $sort: { cantidad: -1 } },
            { $limit: 10 },
        ]);
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};