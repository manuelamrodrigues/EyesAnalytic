var express = require("express");
var router = express.Router();

var segurancaController = require("../controllers/segurancaController");

// Rota para listar servidores de uma empresa
router.get("/listarServidores", (req, res) => {
    segurancaController.listarServidores(req, res);
});

// Rota para buscar desempenho de um servidor
router.get("/buscarDesempenho/:idServidor", (req, res) => {
    segurancaController.buscarDesempenho(req, res);
});

// Rota para buscar vulnerabilidades de um servidor
router.get("/buscarVulnerabilidades/:idServidor", (req, res) => {
    segurancaController.buscarVulnerabilidades(req, res);
});

// Rota para buscar indicadores gráficos
router.get("/buscarIndicadoresGrafico", (req, res) => {
    segurancaController.buscarIndicadoresGrafico(req, res);
});

// Rota para buscar dados em tempo real de um indicador específico
router.get("/buscarDadosTempoReal", (req, res) => {
    segurancaController.buscarDadosTempoReal(req, res);
});

module.exports = router;
