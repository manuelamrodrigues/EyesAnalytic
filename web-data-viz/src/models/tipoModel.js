var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM TipoUser`;

  return database.executar(instrucaoSql);
}

function buscarPortipo(tipo) {
  var instrucaoSql = `SELECT * FROM TipoUser WHERE tipo = '${tipo}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(tipo) {
  var instrucaoSql = `INSERT INTO TipoUser (tipo) VALUES ('${tipo}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPortipo, buscarPorId, cadastrar, listar };
