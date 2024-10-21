var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM tipo_usuario WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM tipo_usuario`;

  return database.executar(instrucaoSql);
}

function buscarPortipo(tipo) {
  var instrucaoSql = `SELECT * FROM tipo_usuario WHERE tipo = '${tipo}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(tipo) {
  var instrucaoSql = `INSERT INTO tipo_usuario (tipo) VALUES ('${tipo}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPortipo, buscarPorId, cadastrar, listar };
