const express = require("express");
const router = express.Router();
const { crearEtiqueta, obtenerEtiquetasPorUsuario, famososMasEtiquetados } = require("../controllers/etiquetaController");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, crearEtiqueta);
router.get("/mias", auth, obtenerEtiquetasPorUsuario);
router.get("/top", auth, famososMasEtiquetados);

module.exports = router;
