const Usuario = require("../models/Usuario");

exports.agregarFavorito = async (req, res) => {
    const userId = req.usuario.id;
    const { sitioId } = req.body;

    try {
        const user = await Usuario.findById(userId);
        if (!user.favoritos.includes(sitioId)) {
            user.favoritos.push(sitioId);
            await user.save();
        }
        res.json({ msg: "Sitio agregado a favoritos", favoritos: user.favoritos });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.removerFavorito = async (req, res) => {
    const userId = req.usuario.id;
    const { sitioId } = req.body;

    try {
        const user = await Usuario.findById(userId);
        user.favoritos = user.favoritos.filter(id => id.toString() !== sitioId);
        await user.save();
        res.json({ msg: "Sitio removido de favoritos", favoritos: user.favoritos });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.obtenerFavoritos = async (req, res) => {
    const userId = req.usuario.id;

    try {
        const user = await Usuario.findById(userId).populate("favoritos");
        res.json(user.favoritos);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
