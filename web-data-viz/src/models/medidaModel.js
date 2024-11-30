var database = require("../database/config");
function buscarQuantidadeMaquinas(idEmpresa) {
    const instrucaoSql = `
        SELECT COUNT(*) AS quantidade 
        FROM maquina
        WHERE fkEmpresa = ${idEmpresa};
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

function buscarAlertasRecentes(idEmpresa) {
    const instrucaoSql = `
        SELECT COUNT(*) AS alertas 
        FROM alerta AS a
        JOIN dado_capturado AS dc ON a.fkDadoCapturado = dc.idDadoCapturado
        JOIN maquina m ON dc.fkMaquina = m.idMaquina
        WHERE dc.dtHora >= NOW() - INTERVAL 1 HOUR
        AND m.fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMbpsUpload(idEmpresa) {
    const instrucaoSql = `
        SELECT registro AS upload 
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        JOIN maquina m ON dc.fkMaquina = m.idMaquina
        WHERE r.nomeRecurso = 'Bytes Enviados'
        AND m.fkEmpresa = ${idEmpresa}
        ORDER BY dc.dtHora DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMbpsDownload(idEmpresa) {
    const instrucaoSql = `
        SELECT registro AS download 
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        JOIN maquina m ON dc.fkMaquina = m.idMaquina
        WHERE r.nomeRecurso = 'Bytes Recebidos'
        AND m.fkEmpresa = ${idEmpresa}
        ORDER BY dc.dtHora DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediasHistoricoComponentes(intervaloSQL, idEmpresa) {
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
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END), 0) AS mediaCPU,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END), 0) AS mediaRAM,
                COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END), 0) AS mediaDisco
            FROM 
                dado_capturado AS dc
            JOIN 
                recurso AS r ON dc.fkRecurso = r.idRecurso
            JOIN maquina m ON dc.fkMaquina = m.idMaquina    
            WHERE 
                dc.dtHora >= NOW() - INTERVAL 1 WEEK
                AND m.fkEmpresa = ${idEmpresa}
            GROUP BY 
                diaSemana
            ORDER BY 
                FIELD(diaSemana, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo');
        `;
    } else if (intervaloSQL === 'MONTH') {
        // Lógica para agrupamento mensal
        instrucaoSql = `
            SELECT 
    CONCAT('Semana ', semana_do_mes, ' - ', ano) AS intervalo,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END), 0) AS mediaCPU,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END), 0) AS mediaRAM,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END), 0) AS mediaDisco
FROM 
    (
        SELECT 
            YEAR(dc.dtHora) AS ano,
            FLOOR((DAY(dc.dtHora) - 1) / 7) + 1 AS semana_do_mes,  -- Cálculo da semana do mês
            dc.registro,
            dc.fkRecurso,
            dc.dtHora,
            dc.fkMaquina
        FROM dado_capturado AS dc
        JOIN maquina m ON dc.fkMaquina = m.idMaquina
        WHERE dc.dtHora >= NOW() - INTERVAL 1 MONTH
        AND m.fkEmpresa = ${idEmpresa}
    ) AS dc
JOIN 
    recurso AS r ON dc.fkRecurso = r.idRecurso
GROUP BY 
    ano, semana_do_mes
ORDER BY 
    ano DESC, semana_do_mes;

        `;
    } else if (intervaloSQL === 'SEMIANNUAL') {
        // Lógica para agrupamento semestral
        instrucaoSql = `
            SELECT 
    CONCAT('Semestre ', semestre, ' - ', ano) AS intervalo,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN registro END), 0) AS mediaCPU,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN registro END), 0) AS mediaRAM,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN registro END), 0) AS mediaDisco
FROM 
    (
        SELECT 
            CEIL(MONTH(dc.dtHora) / 6) AS semestre,
            YEAR(dc.dtHora) AS ano,
            dc.registro,
            dc.fkRecurso,
            m.fkEmpresa
        FROM 
            dado_capturado AS dc
        JOIN 
            maquina AS m ON dc.fkMaquina = m.idMaquina
        WHERE 
            dc.dtHora >= NOW() - INTERVAL 1 YEAR
            AND m.fkEmpresa = ${idEmpresa}
    ) AS subquery
JOIN 
    recurso AS r ON subquery.fkRecurso = r.idRecurso
GROUP BY 
    subquery.semestre, subquery.ano
ORDER BY 
    subquery.ano DESC, subquery.semestre DESC;
        `;
    } else if (intervaloSQL === 'BIMONTHLY') {
        // Lógica para agrupamento bimestral
        instrucaoSql = `
            SELECT 
    DATE_FORMAT(dc.dtHora, '%Y-%m') AS intervalo, -- Ano e mês para agrupamento
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END), 0) AS mediaCPU,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END), 0) AS mediaRAM,
    COALESCE(AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END), 0) AS mediaDisco
FROM 
    dado_capturado AS dc
JOIN 
    recurso AS r ON dc.fkRecurso = r.idRecurso
JOIN 
    maquina m ON dc.fkMaquina = m.idMaquina
WHERE 
    YEAR(dc.dtHora) = YEAR(NOW())
    AND m.fkEmpresa = ${idEmpresa}
GROUP BY 
    DATE_FORMAT(dc.dtHora, '%Y-%m') 
ORDER BY 
    DATE_FORMAT(dc.dtHora, '%Y-%m'); 
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
