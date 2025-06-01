const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
        const existe = await Usuario.findOne({ email });
        if (existe) return res.status(400).json({ msg: "Email ya registrado" });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const usuario = new Usuario({ nombre, email, passwordHash, rol });
        await usuario.save();

        res.json({ msg: "Usuario registrado correctamente" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ msg: "Credenciales inválidas" });

        const esValido = await bcrypt.compare(password, usuario.passwordHash);
        if (!esValido) return res.status(400).json({ msg: "Credenciales inválidas" });

        const payload = {
            id: usuario._id,
            rol: usuario.rol,
            nombre: usuario.nombre,
            email: usuario.email,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
