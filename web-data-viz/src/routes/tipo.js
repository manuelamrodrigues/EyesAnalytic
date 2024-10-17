var express = require("express");
var router = express.Router();

var tipoController = require("../controllers/tipoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    tipoController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    tipoController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  tipoController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  tipoController.listar(req, res);
});

module.exports = router;