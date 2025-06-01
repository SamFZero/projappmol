const express = require("express");
const router = express.Router();
const { crearCiudad, obtenerCiudades } = require("../controllers/ciudadController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", auth, isAdmin, crearCiudad); // Solo admin
router.get("/", obtenerCiudades);

module.exports = router;
