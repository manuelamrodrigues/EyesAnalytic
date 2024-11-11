var express = require("express");
var router = express.Router();

var capturaController = require("../controllers/capturaController");

router.get("/listarCapturas/:idEmpresa", function (req, res) {
    capturaController.listarCapturas(req, res);
});

module.exports = router;

