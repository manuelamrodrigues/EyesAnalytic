var express = require("express");
var router = express.Router();

var segurancaController = require("../controllers/segurancaController");

router.post("/listarServidores", (req, res) => {
    segurancaController.listarServidores(req, res);
});

// Rota para buscar desempenho de um servidor
router.get("/buscarDesempenho/:idServidor", (req, res) => {
    segurancaController.buscarIndicadores(req, res);
});

// Rota para buscar vulnerabilidades de um servidor
router.get("/buscarVulnerabilidades/:idServidor", (req, res) => {
    segurancaController.buscarVulnerabilidades(req, res);
});

// Rota para buscar indicadores gráficos
router.get("/buscarIndicadoresGrafico", (req, res) => {
    segurancaController.buscarIndicadoresGrafico(req, res);
});

router.get("/seguranca/buscarDadosTempoReal", (req, res) => {
    const { idServidor, indicador } = req.query;

    if (!idServidor || !indicador) {
        return res.status(400).json({ erro: "ID do servidor ou indicador não foram fornecidos." });
    }

    segurancaController.buscarDadosTempoReal(req, res, idServidor, indicador);
});

module.exports = router;
