const express = require("express");
const router = express.Router();
const consultasController = require("../controllers/consultasController");

router.get("/famosos", consultasController.famososPorTipo);
router.get("/top-sitios", consultasController.topSitiosPorPais);

module.exports = router;
