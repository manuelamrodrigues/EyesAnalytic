var express = require("express");
var router = express.Router();

var capturaController = require("../controllers/capturaController")

router.get("/buscarTempoReal", function(req,res){
    const {idMaquina, idRecurso} = req.query
    capturaController.buscarTempoReal(req,res);
})
router.get("/listarCapturas/:idEmpresa", function (req, res) {
    capturaController.listarCapturas(req, res);
});

router.get("/coletarRegrecaoConexao/:idEmpresa", function(req,res){
    capturaController.coletarRegrecaoConexao(req,res);
})

router.get("/coletarHistoricoConexoes/:idEmpresa", function(req,res){
    capturaController.coletarHistoricoConexoes(req,res)
})

router.get("/coletarComparacaoSemana/:idEmpresa", function(req,res){
    capturaController.coletarComparacaoSemana(req,res)
})

module.exports = router;

