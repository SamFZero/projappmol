const express = require("express");
const router = express.Router();
const { crearSitio, obtenerSitios, obtenerSitioPorId } = require("../controllers/sitioController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", auth, isAdmin, crearSitio);
router.get("/", obtenerSitios);
router.get("/:id", obtenerSitioPorId);

module.exports = router;
