var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

// Rota para buscar as últimas medidas de um componente específico para uma máquina
router.get("/ultimas/:idMaquina/:componente", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

// Rota para buscar as medidas em tempo real de um componente específico para uma máquina
router.get("/tempo-historico/:idMaquina/:componente", function (req, res) {
    medidaController.buscarMedidasEmHistorico(req, res);
});

// Rota para obter os indicadores de sistema
router.get("/captura/indicadores", function (req, res) {
    medidaController.obterIndicadores(req, res);
});
module.exports = router;