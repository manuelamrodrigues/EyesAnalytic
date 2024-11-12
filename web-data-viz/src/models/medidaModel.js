var database = require("../database/config");

function buscarUltimasMedidasCPU() {
    
    var idMaquina = 1; // ID da máquina a ser consultada
    var limite_linhas = 5; // Limitar a 5 medições
    var instrucaoSql = `
        SELECT 
            cp.registro AS uso_cpu, 
            cp.dtHora AS momento, 
            DATE_FORMAT(cp.dtHora,'%H:%i:%s') AS momento_grafico
        FROM dado_capturado AS cp
        JOIN maquina_recurso AS mr ON cp.fkMaquina = mr.fkMaquina
        JOIN recurso AS r ON mr.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso = 1 
        AND cp.fkMaquina = ${idMaquina}
        ORDER BY cp.idDadoCapturado DESC
        LIMIT ${limite_linhas}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM() {

    var idMaquina = 1; // ID da máquina a ser consultada
    var limite_linhas = 5; // Limitar a 5 medições

    var instrucaoSql = `
        SELECT 
            cp.registro AS uso_ram, 
            cp.dtHora AS momento, 
            DATE_FORMAT(cp.dtHora, '%H:%i:%s') AS momento_grafico
        FROM dado_capturado AS cp
        JOIN maquina_recurso AS mr ON cp.fkMaquina = mr.fkMaquina
        JOIN recurso AS r ON mr.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso = 2 
        AND cp.fkMaquina = ${idMaquina}
        ORDER BY cp.idDadoCapturado DESC
        LIMIT ${limite_linhas}
    `;

    console.log("Executando a instrução SQL para uso de RAM: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



// function buscarMedidasEmTempoReal(idAquario) {

//     var instrucaoSql = `SELECT 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         FROM medida WHERE fk_aquario = ${idAquario} 
//                     ORDER BY id DESC LIMIT 1`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }
function buscarUsoRAMEmTempoReal(idMaquina) {

    var instrucaoSql = `
        SELECT 
            cp.registro AS uso_ram, 
            DATE_FORMAT(cp.dtHora, '%H:%i:%s') AS momento_grafico, 
            cp.fkMaquina
        FROM dado_capturado AS cp
        WHERE cp.fkRecurso = 2 
        AND cp.fkMaquina = ${idMaquina}
        ORDER BY cp.dtHora DESC
        LIMIT 1
    `;

    console.log("Executando a instrução SQL para RAM: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsoCPUEmTempoReal(idMaquina) {

    var instrucaoSql = `
        SELECT cp.registro AS uso_cpu, 
            DATE_FORMAT(cp.dtHora, '%H:%i:%s') AS momento_grafico, 
            cp.fkMaquina
        FROM dado_capturado AS cp
        WHERE fkRecurso = 1 
        AND fkMaquina = ${idMaquina}
        ORDER BY cp.dtHora DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL para CPU: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarUsoRAMEmTempoReal,
    buscarUsoCPUEmTempoReal

    // buscarMedidasEmTempoReal
}
