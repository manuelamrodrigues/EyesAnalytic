var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController")

router.get("/listar", function(req,res){
    maquinaController.listarMaquina(req,res);
})

router.put("/atualizarPrioridade", function(req,res){
    maquinaController.atualizarPrioridade(req,res);
})

router.delete("/desativarMaquina", function(req,res){
    maquinaController.desativarMaquina(req,res)
})
module.exports = router