const express = require("express");
const router = express.Router();
const { crearPersona, obtenerPersonas } = require("../controllers/personaController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", auth, isAdmin, crearPersona); // Solo admin
router.get("/", obtenerPersonas);

module.exports = router;
