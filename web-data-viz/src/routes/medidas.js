var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

// Nova rota para obter os indicadores
router.get("/captura/indicadores", function (req, res) {
    medidaController.obterIndicadores(req, res);
});

module.exports = router;