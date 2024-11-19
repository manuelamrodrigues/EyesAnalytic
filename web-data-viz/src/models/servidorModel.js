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

function listarPorUsoCPU(fkEmpresa) {
    var instrucaoSql = `
        SELECT * FROM view_quantidade_cpu WHERE fkEmpresa = ${fkEmpresa};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}
fkMaquina=1
function alterarServidor(nomeMaquina, idPrioridade, idMaquina) {
    var instrucaoSql = `
    UPDATE maquina SET nomeMaquina = "${nomeMaquina}", fkPrioridade = ${idPrioridade}  WHERE idMaquina = ${idMaquina};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarMediaMaximo(fkEmpresa) {
    var instrucaoSql = `
    SELECT * FROM view_media_max_cpu where fkEmpresa = "${fkEmpresa}";
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


function listarDiferencaHoras() {
    var instrucaoSql = `
    SELECT * FROM diferenca_horas;
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
    listarPorUsoCPU,
    alterarServidor,
    listarPrioridade,
    listarMediaMaximo,
    listarDiferencaHoras
};