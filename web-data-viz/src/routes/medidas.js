var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/cpu", function (req, res) {
    medidaController.buscarUltimasMedidasCPU(req, res);
});

router.get("/ultimas/ram", function (req, res) {
    medidaController.buscarUltimasMedidasRAM(req, res);
});

// Rota para obter o uso de RAM em tempo real
router.get("/uso-ram/:idMaquina", function (req, res) {
    medidaController.buscarUsoRAM(req, res);
});

// Rota para obter o uso de CPU em tempo real
router.get("/uso-cpu/:idMaquina", function (req, res) {
    medidaController.buscarUsoCPU(req, res);
});

// router.get("/tempo-real/:idAquario", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })

module.exports = router;