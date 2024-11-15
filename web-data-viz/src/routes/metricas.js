var express = require("express");
var router = express.Router();

var metricaController = require("../controllers/metricaController");

//Recebendo os dados do html e direcionando para a função cadastrar de metricaController.js
router.post("/cadastrar", function (req, res) {
    metricaController.cadastrar(req, res);
})
// feito :>

//Recebendo os dados do html e direcionando para a função listar de metricaController.js
router.get("/listarCadastrar", function(req,res){
    metricaController.listarCadastrar(req,res)
})
//Listar cadastro

//Recebendo os dados do html e direcionando para a função listar de metricaController.js
router.get("/listar/:idEmpresa", function(req,res){
    metricaController.listar(req,res)
})
// feito :>

router.get("/listarPorId/:idMetrica", function(req,res){
    metricaController.listarPorId(req,res)
})

router.get("/listarRecursos", function(req,res){
    metricaController.listarRecursos(req,res)
})

//Recebendo os dados do html e direcionando para a função delete de metricaController
router.delete("/desativarMetrica/:idMetrica", function(req,res){
    metricaController.desativarMetrica(req,res)
})
// feito :>

//Recebendo os dados do html e direcionando para a função editar de metricaController.js
router.put("/alterarMetrica/:idMetrica", function(req,res){
    metricaController.alterarMetrica(req,res)
})
// feito :>
module.exports = router;