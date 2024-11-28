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
    let instrucaoSql;

    if (intervaloSQL === 'WEEK') {
        // Lógica para agrupamento semanal
        instrucaoSql = `
            SELECT 
                CASE 
                    WHEN DAYOFWEEK(dc.dtHora) = 2 THEN 'Segunda'
                    WHEN DAYOFWEEK(dc.dtHora) = 3 THEN 'Terça'
                    WHEN DAYOFWEEK(dc.dtHora) = 4 THEN 'Quarta'
                    WHEN DAYOFWEEK(dc.dtHora) = 5 THEN 'Quinta'
                    WHEN DAYOFWEEK(dc.dtHora) = 6 THEN 'Sexta'
                    WHEN DAYOFWEEK(dc.dtHora) = 7 THEN 'Sábado'
                    WHEN DAYOFWEEK(dc.dtHora) = 1 THEN 'Domingo'
                END AS diaSemana,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END), 4) AS mediaCPU,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END), 4) AS mediaRAM,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END), 4) AS mediaDisco
            FROM 
                dado_capturado AS dc
            JOIN 
                recurso AS r ON dc.fkRecurso = r.idRecurso
            WHERE 
                dc.dtHora >= NOW() - INTERVAL 1 WEEK
            GROUP BY 
                diaSemana
            ORDER BY 
                FIELD(diaSemana, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo');
        `;
    } else if (intervaloSQL === 'MONTH') {
        // Lógica para agrupamento mensal
        instrucaoSql = `
            SELECT 
                DATE_FORMAT(dc.dtHora, '%Y-%m-%d') AS intervalo,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END), 4) AS mediaCPU,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END), 4) AS mediaRAM,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END), 4) AS mediaDisco
            FROM 
                dado_capturado AS dc
            JOIN 
                recurso AS r ON dc.fkRecurso = r.idRecurso
            WHERE 
                dc.dtHora >= NOW() - INTERVAL 1 MONTH
            GROUP BY 
                intervalo
            ORDER BY 
                intervalo;
        `;
    } else if (intervaloSQL === 'SEMIANNUAL') {
        // Lógica para agrupamento semestral
        instrucaoSql = `
            SELECT 
                CONCAT('Mês ', MONTH(dc.dtHora)) AS intervalo,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END), 4) AS mediaCPU,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END), 4) AS mediaRAM,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END), 4) AS mediaDisco
            FROM 
                dado_capturado AS dc
            JOIN 
                recurso AS r ON dc.fkRecurso = r.idRecurso
            WHERE 
                dc.dtHora >= NOW() - INTERVAL 6 MONTH
            GROUP BY 
                intervalo
            ORDER BY 
                intervalo;
        `;
    } else if (intervaloSQL === 'BIMONTHLY') {
        // Lógica para agrupamento bimestral
        instrucaoSql = `
            SELECT 
                CONCAT('Bimestre ', CEIL(MONTH(dc.dtHora) / 2)) AS intervalo,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END), 4) AS mediaCPU,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END), 4) AS mediaRAM,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END), 4) AS mediaDisco
            FROM 
                dado_capturado AS dc
            JOIN 
                recurso AS r ON dc.fkRecurso = r.idRecurso
            WHERE 
                dc.dtHora >= NOW() - INTERVAL 2 MONTH
            GROUP BY 
                intervalo
            ORDER BY 
                intervalo;
        `;
    } else {
        console.warn(`Intervalo não reconhecido: ${intervaloSQL}`);
        return null; // Caso o intervalo não seja reconhecido, retorna nulo
    }

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
