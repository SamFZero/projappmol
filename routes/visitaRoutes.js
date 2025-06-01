const express = require("express");
const router = express.Router();
const { registrarVisita, obtenerVisitasPorUsuario } = require("../controllers/visitaController");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, registrarVisita);
router.get("/mias", auth, obtenerVisitasPorUsuario);

module.exports = router;
