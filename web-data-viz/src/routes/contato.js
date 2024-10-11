var express = require("express");
var router = express.Router();

var contatoController  = require("../controllers/contatoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    contatoController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    contatoController.autenticar(req, res);
});

module.exports = router;