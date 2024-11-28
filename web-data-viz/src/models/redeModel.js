var database = require("../database/config")

function listarIndicadorPacote(idMaquina) {
    var instrucaoSql = `
    SELECT * FROM view_indicador WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarIndicadorOutros(idMaquina) {
    var instrucaoSql = `
    SELECT * FROM view_indicador WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarServidor(idEmpresa) {
    var instrucaoSql = `
   SELECT idMaquina, nomeMaquina, fkEmpresa FROM maquina WHERE fkEmpresa = ${idEmpresa};    
   `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function buscarTempoReal(idMaquina) {
    var instrucaoSql = `
      SELECT idRecurso, registro, nomeRecurso, date_format(dtHora, "%H:%i:%s") as dtHora
        FROM (
    SELECT registro, dtHora, nomeRecurso, idRecurso
    FROM dado_capturado
    JOIN recurso AS r ON fkRecurso = idRecurso
    WHERE fkMaquina = ${idMaquina} AND fkRecurso IN(4,5)
    ORDER BY dtHora DESC 
    LIMIT 10
        ) AS subconsulta_rede
    ORDER BY dtHora ASC;
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function buscarQualidade(idMaquina) {
    var instrucaoSql = `    
   SELECT * FROM view_indicador WHERE idMaquina = ${idMaquina};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function atualizarQualidade(qualidadeRede, idMaquina) {
    var instrucaoSql = `
    UPDATE maquina SET qualidadeRede = "${qualidadeRede}" WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listar(idEmpresa) {
    var instrucaoSql = `
      SELECT * FROM view_servidores_qualidade WHERE fkEmpresa = ${idEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarIp(idMaquina) {
    var instrucaoSql = `
      SELECT * FROM log_ip DISTICIT WHERE fkMaquina = ${idMaquina} LIMIT 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


module.exports = {
    listarIndicadorPacote,
    listarIndicadorOutros,
    listarServidor,
    buscarTempoReal,
    atualizarQualidade,
    buscarQualidade,
    listar,
    listarIp
};