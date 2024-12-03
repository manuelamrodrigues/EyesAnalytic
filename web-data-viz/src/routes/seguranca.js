var express = require("express");
var router = express.Router();

var segurancaController = require("../controllers/segurancaController");

// Listar servidores ativos
router.post("/listarServidores", (req, res) => {
    segurancaController.listarServidores(req, res);
});

// Middleware para validar parâmetros
function validarParametros(req, res, next) {
    const { idServidor, indicador } = req.params;

    if (!idServidor) {
        return res.status(400).json({ erro: "O ID do servidor é obrigatório!" });
    }

    if (req.path.includes("buscarDadosTempoReal") && !indicador) {
        return res.status(400).json({ erro: "O indicador é obrigatório!" });
    }

    next();
}

// Rota para buscar desempenho de um servidor
router.get("/buscarDesempenho/:idServidor", validarParametros, segurancaController.buscarDesempenho);

// Rota para buscar dados perdidos de um servidor
router.get("/buscarDadosPerdidos/:idServidor", validarParametros, segurancaController.buscarDadosPerdidos);

// Rota para buscar vulnerabilidades de um servidor
router.get("/buscarVulnerabilidades/:idServidor", validarParametros, segurancaController.buscarVulnerabilidades);

// Rota para buscar dados em tempo real para gráficos
router.get("/buscarDadosTempoReal/:idServidor/:indicador", validarParametros, segurancaController.buscarDadosTempoReal);

module.exports = router;
