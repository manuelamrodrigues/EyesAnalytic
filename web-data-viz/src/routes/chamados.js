var express = require("express");
var router = express.Router();

var chamadoController = require("../controllers/chamadoController");

router.get("/listar", function (req, res) {
    chamadoController.listar(req, res);
});

// router.get("/listar/:idUsuario", function (req, res) {
//     avisoController.listarPorUsuario(req, res);
// });

// router.get("/pesquisar/:descricao", function (req, res) {
//     avisoController.pesquisarDescricao(req, res);
// });

router.post("/cadastrar", function (req, res) {
    chamadoController.cadastrar(req, res);
});

router.put("/atualizar", function (req, res) {
    chamadoController.atualizar(req, res);
});

router.delete("/deletar", function (req, res) {
    chamadoController.deletar(req, res);
});

module.exports = router;