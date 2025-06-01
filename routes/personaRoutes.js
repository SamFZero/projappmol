const express = require("express");
const router = express.Router();
const { crearPersona, obtenerPersonas, obtenerPersonaPorId } = require("../controllers/personaController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", auth, isAdmin, crearPersona);
router.get("/:id", obtenerPersonaPorId);
router.get("/", obtenerPersonas);

module.exports = router;
