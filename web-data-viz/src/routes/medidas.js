var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

// Rota para buscar as médias históricas dos componentes por intervalo de tempo
router.get("/medias-historico/:intervalo", function (req, res) {
    medidaController.buscarMediasHistoricoComponentes(req, res);
});



// Rota para obter os indicadores de sistema
router.get("/captura/indicadores", function (req, res) {
    medidaController.buscarIndicadores(req, res);
});

module.exports = router;