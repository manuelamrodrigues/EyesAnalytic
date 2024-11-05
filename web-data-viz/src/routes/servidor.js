var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/listar/:idEmpresa", function (req, res) {
    servidorController.listar(req, res)
})

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// router.post("/cadastrar", function (req, res) {
//     usuarioController.cadastrar(req, res);
// })

// router.post("/autenticar", function (req, res) {
//     usuarioController.autenticar(req, res);
// });
// router.get("/listarFunc/:idEmpresa", function(req,res){
//     usuarioController.listarFunc(req,res)
// })

// router.get("/buscarPorId/:idUsuario", function(req,res){
//     usuarioController.buscarPorId(req,res)
// })
// router.delete("/desativarFunc/:idUsuario", function(req,res){
//     usuarioController.desativarFunc(req,res)
// })
// router.put("/alterarFunc", function(req,res){
//     usuarioController.alterarFunc(req,res)
// })

module.exports = router;