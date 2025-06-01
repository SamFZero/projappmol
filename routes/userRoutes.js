const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
    agregarFavorito,
    removerFavorito,
    obtenerFavoritos
} = require("../controllers/userController");

router.get("/favoritos", auth, obtenerFavoritos);
router.post("/favoritos", auth, agregarFavorito);
router.delete("/favoritos", auth, removerFavorito);

module.exports = router;
