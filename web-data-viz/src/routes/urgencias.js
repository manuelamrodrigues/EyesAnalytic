var express = require("express");
var router = express.Router();

var urgenciaController = require("../controllers/urgenciaController")

router.get("/listar", function(req,res){
    urgenciaController.listar(req,res)
})

module.exports = router