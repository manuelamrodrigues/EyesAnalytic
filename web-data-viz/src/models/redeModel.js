var database = require("../database/config")

function listarIndicadores(idMaquina) {
    var instrucaoSql = `
    SELECT * FROM view_indicadores_rede WHERE idMaquina = ${idMaquina};
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
    WHERE fkMaquina = ${idMaquina} AND fkRecurso IN(6,7)
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
    SELECT * FROM view_indicadores_rede WHERE idMaquina =  ${idMaquina};
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
      SELECT DISTINCT idMaquina,
		nomeMaquina, 
        qualidadeRede
    FROM maquina AS m
    LEFT JOIN dado_capturado dc ON dc.fkMaquina = m.idMaquina
    where fkEmpresa = ${idEmpresa}
    order by qualidadeRede != 'Baixa';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


module.exports = {
    listarIndicadores,
    listarServidor,
    buscarTempoReal,
    atualizarQualidade,
    buscarQualidade,
    listar
};