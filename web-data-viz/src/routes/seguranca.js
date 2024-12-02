var express = require("express");
var router = express.Router();

var segurancaController = require("../controllers/segurancaController");
// Listar servidores ativos
router.post("/listarServidores", (req, res) => {
    segurancaController.listarServidores(req, res);
});


// Rota para buscar desempenho de um servidor
router.get("/buscarDesempenho/:idServidor", (req, res) => {
    segurancaController.buscarDesempenho(req, res);
});
// Buscar dados perdidos de um servidor
router.get("/buscarDadosPerdidos/:idServidor", (req, res) => {
    segurancaController.buscarDadosPerdidos(req, res);
});

// Buscar vulnerabilidades de um servidor
router.get("/buscarVulnerabilidades/:idServidor", (req, res) => {
    segurancaController.buscarVulnerabilidades(req, res);
});

// Buscar dados em tempo real
router.get("/seguranca/buscarDadosTempoReal/:idServidor/:indicador", (req, res) => {
    segurancaController.buscarDadosTempoReal(req, res);
});

module.exports = router;
