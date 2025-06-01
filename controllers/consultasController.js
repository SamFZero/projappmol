const Persona = require("../models/Persona");
const Visita = require("../models/Visita");

exports.famososPorTipo = async (req, res) => {
    try {
        const resultado = await Persona.aggregate([
            {
                $lookup: {
                    from: "ciudads",
                    localField: "ciudad_id",
                    foreignField: "_id",
                    as: "ciudad"
                }
            },
            { $unwind: "$ciudad" },
            {
                $project: {
                    nombre: 1,
                    tipo: 1,
                    ciudad: "$ciudad.nombre",
                    pais: "$ciudad.pais"
                }
            }
        ]);
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.topSitiosPorPais = async (req, res) => {
    const { pais } = req.query;
    try {
        const resultado = await Visita.aggregate([
            {
                $lookup: {
                    from: "sitios",
                    localField: "sitio_id",
                    foreignField: "_id",
                    as: "sitio"
                }
            },
            { $unwind: "$sitio" },
            {
                $lookup: {
                    from: "ciudads",
                    localField: "sitio.ciudad_id",
                    foreignField: "_id",
                    as: "ciudad"
                }
            },
            { $unwind: "$ciudad" },
            { $match: pais ? { "ciudad.pais": pais } : {} },
            {
                $group: {
                    _id: "$sitio_id",
                    nombre: { $first: "$sitio.nombre" },
                    ciudad: { $first: "$ciudad.nombre" },
                    pais: { $first: "$ciudad.pais" },
                    visitas: { $sum: 1 }
                }
            },
            { $sort: { visitas: -1 } },
            { $limit: 10 }
        ]);
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
