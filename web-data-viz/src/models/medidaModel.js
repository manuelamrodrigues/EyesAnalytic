var database = require("../database/config");

function buscarQuantidadeMaquinas() {
    const instrucaoSql = `
        SELECT COUNT(*) as quantidade 
        FROM maquina
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaquinasConectadas() {
    const instrucaoSql = `
        SELECT COUNT(*) as conectadas 
        FROM maquina 
        WHERE status_conexao = 'conectada'
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasRecentes() {
    const instrucaoSql = `
        SELECT COUNT(*) as alertas 
        FROM alerta 
        WHERE momento >= NOW() - INTERVAL 1 HOUR
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMbpsUpload() {
    const instrucaoSql = `
        SELECT valor as upload 
        FROM dado_capturado 
        WHERE tipo_componente = 'upload' 
        ORDER BY momento DESC LIMIT 1
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMbpsDownload() {
    const instrucaoSql = `
        SELECT valor as download 
        FROM dado_capturado 
        WHERE tipo_componente = 'download' 
        ORDER BY momento DESC LIMIT 1
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasComponente(idMaquina, componente, limite_linhas) {
    var instrucaoSql = `SELECT 
        valor as ${componente}, 
        momento,
        DATE_FORMAT(momento, '%H:%i:%s') as momento_grafico
    FROM dado_capturado
    WHERE fk_maquina = ${idMaquina} AND tipo_componente = '${componente}'
    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealComponente(idMaquina, componente) {
    var instrucaoSql = `SELECT 
        valor as ${componente}, 
        DATE_FORMAT(momento, '%H:%i:%s') as momento_grafico,
        fk_maquina 
    FROM dado_capturado 
    WHERE fk_maquina = ${idMaquina} AND tipo_componente = '${componente}'
    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidasComponente,
    buscarMedidasEmTempoRealComponente,
    buscarQuantidadeMaquinas,
    buscarMaquinasConectadas,
    buscarAlertasRecentes,
    buscarMbpsUpload,
    buscarMbpsDownload
}
