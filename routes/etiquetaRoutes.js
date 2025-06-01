const express = require("express");
const router = express.Router();
const { crearEtiqueta, obtenerEtiquetasPorUsuario } = require("../controllers/etiquetaController");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, crearEtiqueta);
router.get("/mias", auth, obtenerEtiquetasPorUsuario);

module.exports = router;
