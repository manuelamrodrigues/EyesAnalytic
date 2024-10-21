var tipoModel = require("../models/tipoModel");

function buscarPortipo(req, res) {
  var tipo = req.query.tipo;

  tipoModel.buscarPortipo(tipo).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  tipoModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  tipoModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var tipo = req.body.tipo;
 

  tipoModel.buscarPortipo(tipo).then((resultado) => {
    
      tipoModel.cadastrar(tipo).then((resultado) => {
        res.status(201).json(resultado);
      });
    
  });
}

module.exports = {
  buscarPortipo,
  buscarPorId,
  cadastrar,
  listar,
};
