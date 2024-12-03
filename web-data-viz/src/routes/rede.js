var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.get("/listarIndicadorPacote/:idMaquina", function (req, res) {
    redeController.listarIndicadorPacote(req, res)
})

router.get("/listarIndicadorOutros/:idMaquina", function (req, res) {
    redeController.listarIndicadorOutros(req, res)
})

router.get("/listarIp/:idMaquina", function (req, res) {
    redeController.listarIp(req, res)
})

router.get("/listarServidor/:idEmpresa", function(req,res){
    redeController.listarServidor(req,res)
})

router.put("/atualizarQualidade", function(req,res){
    redeController.atualizarQualidade(req,res)
})

router.get("/buscarQualidade/:idMaquina", function(req,res){
    redeController.buscarQualidade(req,res)
})

router.get("/buscarTempoReal", function(req,res){
    // const {idMaquina} = req.query
    redeController.buscarTempoReal(req,res);
})

router.get("/listar/:idEmpresa", function(req,res){
    redeController.listar(req,res)
})


module.exports = router;