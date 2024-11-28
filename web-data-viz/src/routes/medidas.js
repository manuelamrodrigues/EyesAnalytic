var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/medias-historico/:componente/:intervalo", function (req, res) {
    medidaController.buscarMediasHistoricoComponentes(req, res);
});


// Rota para obter os indicadores de sistema
router.get("/captura/indicadores", function (req, res) {
    medidaController.buscarIndicadores(req, res);
});

module.exports = router;