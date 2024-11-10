var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/listar/:idEmpresa", function (req, res) {
    servidorController.listar(req, res)
})

router.get("/listarEspecifico/:idMaquina", function (req, res) {
    servidorController.listarEspecifico(req, res)
})

router.delete("/desativarServidor/:idMaquina", function(req,res){
    servidorController.desativarServidor(req,res)
})

router.put("/alterarServidor", function(req,res){
    servidorController.alterarServidor(req,res)
})

router.get("/listarPrioridade/:idPrioridade", function (req, res) {
    servidorController.listarPrioridade(req, res)
})


module.exports = router;