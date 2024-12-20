var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/ultimas/:idEmpresa", function (req, res) {
    avisoController.buscarAlertas(req, res);
});

router.get("/geral/:idEmpresa", function (req, res) {
    avisoController.contarAlertas(req, res);
});

router.get("/dia/:idEmpresa", function (req, res) {
    avisoController.contarAlertadia(req, res);
});

router.get("/maqdia/:idEmpresa", function (req, res) {
    avisoController.contarAlertamaq(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;