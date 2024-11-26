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

module.exports = router





