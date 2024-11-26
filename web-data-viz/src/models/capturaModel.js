var database = require("../database/config")

function buscarTempoReal(idMaquina, idRecurso) {
    var instrucaoSql = `
    SELECT registro, date_format(dtHora, "%H:%i:%s") as dtHora 
FROM (
    SELECT registro, dtHora 
    FROM dado_capturado 
    WHERE fkMaquina = ${idMaquina} AND fkRecurso = ${idRecurso} 
    ORDER BY dtHora DESC 
    LIMIT 10
) AS subconsulta
ORDER BY dtHora ASC;
    `
    return database.executar(instrucaoSql)
}

function listarCapturas(idEmpresa) {
    const instrucao = `
        SELECT * FROM alertas_detalhados WHERE empresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    buscarTempoReal,
    listarCapturas
}




