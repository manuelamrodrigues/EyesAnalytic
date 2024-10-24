var express = require("express");
var router = express.Router();

var chamadoController = require("../controllers/chamadoController");

router.get("/listar", function (req, res) {
    chamadoController.listar(req, res);
});

router.put("/buscarPorId", function (req, res) {
    chamadoController.buscarPorId(req, res);
});

// router.get("/pesquisar/:descricao", function (req, res) {
//     avisoController.pesquisarDescricao(req, res);
// });

router.post("/cadastrar", function (req, res) {
    chamadoController.cadastrar(req, res);
});

router.put("/atualizar", function (req, res) {
    chamadoController.atualizar(req, res);
});

router.put("/listarPorIdEspecialista", function(req,res){
    chamadoController.listarPorIdEspecialista(req,res)
})


router.delete("/deletar", function (req, res) {
    chamadoController.deletar(req, res);
});

router.put("/atender", function(req,res){
    chamadoController.atender(req,res)
})

module.exports = router;