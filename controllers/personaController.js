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

exports.obtenerPersonaPorId = async (req, res) => {
    try {
        const persona = await Persona.findById(req.params.id).populate("ciudad_id");
        if (!persona) {
            return res.status(404).json({ msg: "Persona no encontrada" });
        }
        res.json(persona);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err.message });
    }
};


exports.obtenerPersonas = async (req, res) => {
    const { tipo, pais } = req.query;

    try {
        const pipeline = [
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
                $lookup: {
                    from: "pais",
                    localField: "ciudad.pais",
                    foreignField: "_id",
                    as: "pais"
                }
            },
            { $unwind: "$pais" }
        ];

        const match = {};
        if (tipo && tipo.trim() !== "") match.tipo = tipo;
        if (pais && pais.trim() !== "") match["pais.nombre"] = pais;

        if (Object.keys(match).length > 0) {
            pipeline.push({ $match: match });
        }

        pipeline.push({
            $project: {
                nombre: 1,
                tipo: 1,
                ciudad_id: {
                    nombre: "$ciudad.nombre",
                    pais_id: {
                        nombre: "$pais.nombre"
                    }
                }
            }
        });

        const personas = await Persona.aggregate(pipeline);
        res.json(personas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err.message });
    }
};
