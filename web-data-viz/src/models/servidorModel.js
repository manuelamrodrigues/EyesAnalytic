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
        SELECT * FROM view_quantidade_cpu WHERE fkEmpresa = ${fkEmpresa} LIMIT 3;
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

function listarMediaMaximo(fkEmpresa) {
    var instrucaoSql = `
   SELECT *  FROM view_media_max_cpu ORDER BY max_cpu DESC LIMIT 3;
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


function listarDiferencaHoras(fkEmpresa) {
    var instrucaoSql = `
    SELECT * FROM diferenca_horas where fkEmpresa = ${fkEmpresa} LIMIT 3;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarDadoEspecifico(fkMaquina) {
    var instrucaoSql = `
    SELECT * FROM dados_regressao where fkMaquina = "${fkMaquina}";
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

function indicadores(idMaquina){
    var instrucaoSql = `
    SELECT 
    m.nomeMaquina AS Maquina,
    MAX(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro ELSE NULL END) AS CPU,
    MAX(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro ELSE NULL END) AS RAM,
    ROUND(MAX(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro * 100 ELSE NULL END) / 100, 2) AS Download,
    ROUND(MAX(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro * 100 ELSE NULL END) / 100, 2) AS Upload
FROM 
    maquina m
JOIN 
    maquina_recurso mr ON m.idMaquina = mr.fkMaquina
JOIN 
    recurso r ON mr.fkRecurso = r.idRecurso
JOIN 
    dado_capturado dc ON mr.fkMaquina = dc.fkMaquina AND mr.fkRecurso = dc.fkRecurso
WHERE 
    m.idMaquina = ${idMaquina}
GROUP BY 
    m.nomeMaquina;
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
    listarDiferencaHoras,
    listarDadoEspecifico,
    indicadores
};