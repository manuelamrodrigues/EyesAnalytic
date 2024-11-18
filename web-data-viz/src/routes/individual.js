var express = require("express");
var router = express.Router();

var individualController = require("../controllers/individualController");

router.get("/serverMax/:fkRecurso", function (req, res) {
    individualController.serverMax(req, res);
});

router.get("/ranking", function (req, res) {
    individualController.ranking(req, res);
});

router.get("/picosMensal/:fkRecurso", function (req, res) {
    individualController.picosMensal(req, res);
});

router.get("/UsoPorHora/:fkRecurso", function (req, res) {
    individualController.UsoPorHora(req, res);
});


module.exports = router;


