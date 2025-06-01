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
                    as: "ciudad",
                },
            },
            { $unwind: "$ciudad" },
            {
                $lookup: {
                    from: "pais",
                    localField: "ciudad.pais_id",
                    foreignField: "_id",
                    as: "pais",
                },
            },
            { $unwind: "$pais" },
            {
                $project: {
                    nombre: 1,
                    tipo: 1,
                    ciudad: "$ciudad.nombre",
                    pais: "$pais.nombre",
                },
            },
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
                    as: "sitio",
                },
            },
            { $unwind: "$sitio" },
            {
                $lookup: {
                    from: "ciudads",
                    localField: "sitio.ciudad_id",
                    foreignField: "_id",
                    as: "ciudad",
                },
            },
            { $unwind: "$ciudad" },
            {
                $lookup: {
                    from: "pais",
                    localField: "ciudad.pais_id",
                    foreignField: "_id",
                    as: "pais",
                },
            },
            { $unwind: "$pais" },
            ...(pais
                ? [
                    {
                        $match: { "pais.nombre": pais },
                    },
                ]
                : []),
            {
                $group: {
                    _id: "$sitio_id",
                    nombre: { $first: "$sitio.nombre" },
                    ciudad: { $first: "$ciudad.nombre" },
                    pais: { $first: "$pais.nombre" },
                    visitas: { $sum: 1 },
                },
            },
            { $sort: { visitas: -1 } },
            { $limit: 10 },
        ]);

        res.json(resultado);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
