var database = require("../database/config")

function listar(fkEmpresa) {
    var instrucaoSql = `
        SELECT * FROM view_listagem_maquinas WHERE fkEmpresa = ${fkEmpresa} AND situacao = 'Ativo' ORDER BY prioridadeMaquina; 
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarEspecifico(idMaquina) {
    var instrucaoSql = `
    SELECT * FROM view_maquina_especifica WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function alterarServidor(nomeMaquina, idPrioridade, idMaquina) {
    var instrucaoSql = `
    UPDATE maquina SET nomeMaquina = "${nomeMaquina}", fkPrioridade = ${idPrioridade}  WHERE idMaquina = ${idMaquina};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarPrioridade() {
    var instrucaoSql = `
    SELECT * FROM prioridade;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function desativarServidor(idMaquina) {
    var instrucaoSql = `
    UPDATE maquina SET situacao = 'inativa' WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}
module.exports = {
    listar,
    desativarServidor,
    listarEspecifico,
    alterarServidor,
    listarPrioridade
};