var database = require("../database/config");
function buscarQuantidadeMaquinas() {
    const instrucaoSql = `
        SELECT COUNT(*) AS quantidade 
        FROM maquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaquinasConectadas() {
    const instrucaoSql = `
        SELECT COUNT(*) AS conectadas 
        FROM maquina 
        WHERE situacao = 'Ativo';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasRecentes() {
    const instrucaoSql = `
        SELECT COUNT(*) AS alertas 
        FROM alerta AS a
        JOIN dado_capturado AS dc ON a.fkDadoCapturado = dc.idDadoCapturado
        WHERE dc.dtHora >= NOW() - INTERVAL 1 HOUR;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMbpsUpload() {
    const instrucaoSql = `
        SELECT registro AS upload 
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso = 'Bytes Enviados'
        ORDER BY dc.dtHora DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMbpsDownload() {
    const instrucaoSql = `
        SELECT registro AS download 
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso = 'Bytes Recebidos'
        ORDER BY dc.dtHora DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediasHistoricoComponentes(intervaloSQL) {
    const instrucaoSql = `
        SELECT 
            DATE_FORMAT(dc.dtHora, '%Y-%m-%d') AS intervalo,
            AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END) AS mediaCPU,
            AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END) AS mediaRAM,
            AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END) AS mediaDisco
        FROM 
            dado_capturado AS dc
        JOIN 
            recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE 
            dc.dtHora >= NOW() - INTERVAL 1 ${intervaloSQL}
        GROUP BY 
            intervalo
        ORDER BY 
            intervalo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    buscarMediasHistoricoComponentes,
    buscarQuantidadeMaquinas,
    buscarMaquinasConectadas,
    buscarAlertasRecentes,
    buscarMbpsUpload,
    buscarMbpsDownload
}
