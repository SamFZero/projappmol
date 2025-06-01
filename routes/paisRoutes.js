const express = require("express");
const router = express.Router();
const { obtenerPaises, crearPais } = require("../controllers/paisController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.get("/", obtenerPaises);
router.post("/", auth, isAdmin, crearPais);

module.exports = router;
