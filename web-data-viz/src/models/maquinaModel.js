var database = require("../database/config")

function listarMaquina(idEmpresa){
    var instrucaoSql = `SELECT idMaquina, status, tipo as 'prioridade' from listarMaquina where fkEmpresa =${idEmpresa}`
    console.log(`Executando a instrução SQL: ${instrucaoSql}`)
    return database.executar(instrucaoSql)
}

function atualizarPrioridade(fkPrioridade, idMaquina){
    var instrucaoSql = `UPDATE Maquina SET fkPrioridade = ${fkPrioridade} WHERE idMaquina = ${idMaquina};`
    console.log(`Executando a instrução SQL: ${instrucaoSql}`)
    return database.executar(instrucaoSql)
}

function desativarMaquina(idMaquina){
    var instrucaoSql = `UPDATE Maquina SET status = 'inativa' WHERE idMaquina = ${idMaquina}`
    console.log(`Executando a instrução SQL: ${instrucaoSql}`)
    return database.executar(instrucaoSql)
}

module.exports = {
    listarMaquina,
    atualizarPrioridade,
    desativarMaquina
}