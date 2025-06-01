const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, acceso denegado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token inválido" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.usuario?.rol !== "ADMIN") {
        return res.status(403).json({ msg: "No autorizado" });
    }
    next();
};

module.exports = { auth, isAdmin };
