const express = require("express");
const router = express.Router();
const { crearSitio, obtenerSitios } = require("../controllers/sitioController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", auth, isAdmin, crearSitio); // Solo admin
router.get("/", obtenerSitios);

module.exports = router;
