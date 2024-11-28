const database = require("../database/config");

/**
 * Listar servidores ativos por empresa.
 */
function listarServidoresPorEmpresa(fkEmpresa) {
    const query = `
        SELECT 
            m.idMaquina AS idServidor, 
            m.nomeMaquina AS nomeServidor
        FROM maquina AS m
        WHERE m.situacao = 'Ativo' AND m.fkEmpresa = ${fkEmpresa};
    `;
    return database.executar(query);
}
/**
 * Buscar desempenho do servidor.
 */
function buscarDesempenhoServidor(servidor) {
    const query = `
        SELECT 
            dc.fkMaquina AS id_servidor,
            ROUND(
                GREATEST(0, 
                    (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro ELSE NULL END)) +
                    (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro ELSE NULL END)) +
                    (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro ELSE NULL END))
                ), 2
            ) AS desempenho
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido') 
          AND dc.fkMaquina = ${servidor}
        GROUP BY dc.fkMaquina;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

/**
 * Buscar dados perdidos do servidor.
 */
function buscarDadosPerdidos(servidor) {
    const query = `
        SELECT 
            dc.fkMaquina AS id_servidor,
            ROUND(
                GREATEST(0, 
                    (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                     SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                    NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 1 END), 0) * 100
                ), 2
            ) AS dados_perdidos
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso IN ('Bytes Enviados', 'Bytes Recebidos')
          AND dc.fkMaquina = ${servidor}
        GROUP BY dc.fkMaquina;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

/**
 * Avaliar vulnerabilidade do servidor.
 */
function buscarVulnerabilidadeServidor(servidor) {
    const query = `
        SELECT 
            ds.id_servidor,
            pd.dados_perdidos,
            ds.desempenho,
            ROUND(
                GREATEST(0, 
                    (ds.desempenho * 0.25) + (pd.dados_perdidos * 0.75)
                ), 2
            ) AS vulnerabilidade
        FROM 
            (SELECT 
                dc.fkMaquina AS id_servidor,
                ROUND(
                    GREATEST(0, 
                        (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro ELSE NULL END)) +
                        (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro ELSE NULL END)) +
                        (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro ELSE NULL END))
                    ), 2
                ) AS desempenho
            FROM dado_capturado AS dc
            JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
            WHERE r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido')
              AND dc.fkMaquina = ${servidor}
            GROUP BY dc.fkMaquina) AS ds
        JOIN 
            (SELECT 
                dc.fkMaquina AS id_servidor,
                ROUND(
                    GREATEST(0, 
                        (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                         SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                        NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 1 END), 0) * 100
                    ), 2
                ) AS dados_perdidos
            FROM dado_capturado AS dc
            JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
            WHERE r.nomeRecurso IN ('Bytes Enviados', 'Bytes Recebidos')
              AND dc.fkMaquina = ${servidor}
            GROUP BY dc.fkMaquina) AS pd
        ON ds.id_servidor = pd.id_servidor;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}


/**
 * Buscar indicadores para gráficos.
 */
function buscarIndicadoresGrafico(servidor, indicador) {
    const query = `
        SELECT 
            dc.dtHora AS data, 
            dc.registro AS valor
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso = '${indicador}' AND dc.fkMaquina = ${servidor}
        ORDER BY dc.dtHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

/**
 * Buscar dados em tempo real para gráficos.
 */
async function buscarDadosTempoReal(servidor, indicador) {
    let query;

    switch (indicador) {
        case "dados_perdidos":
            query = `
                SELECT 
                    dc.dtHora AS data,
                    ROUND(
                        GREATEST(0, 
                            (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                             SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                            NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 1 END), 0) * 100
                        ), 2
                    ) AS valor
                FROM dado_capturado AS dc
                JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
                WHERE r.nomeRecurso IN ('Bytes Enviados', 'Bytes Recebidos') 
                  AND dc.fkMaquina = ${servidor}
                GROUP BY dc.dtHora
                ORDER BY dc.dtHora DESC;
            `;
            break;

        case "vulnerabilidade":
            query = `
                SELECT 
                    data,
                    ROUND(
                        GREATEST(0, 
                            (desempenho * 0.25) + (dados_perdidos * 0.75)
                        ), 2
                    ) AS valor
                FROM (
                    SELECT 
                        dc.dtHora AS data,
                        ROUND(
                            GREATEST(0, 
                                (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro ELSE NULL END)) +
                                (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro ELSE NULL END)) +
                                (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro ELSE NULL END))
                            ), 2
                        ) AS desempenho,
                        ROUND(
                            GREATEST(0, 
                                (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                                 SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                                NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 1 END), 0) * 100
                            ), 2
                        ) AS dados_perdidos
                    FROM dado_capturado AS dc
                    JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
                    WHERE r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido', 'Bytes Enviados', 'Bytes Recebidos') 
                      AND dc.fkMaquina = ${servidor}
                    GROUP BY dc.dtHora
                ) AS calculos
                ORDER BY data DESC;
            `;
            break;

        case "servidor":
            query = `
                SELECT 
                    m.idMaquina AS id_servidor,
                    m.nomeMaquina AS nome_servidor,
                    m.situacao,
                    m.dataCriacao
                FROM maquina AS m
                WHERE m.idMaquina = ${servidor};
            `;
            break;

        default:
            return Promise.reject("Indicador inválido!");
    }

    console.log("Executando a consulta SQL: ", query);
    return database.executar(query);
}


module.exports = {
    listarServidoresPorEmpresa,
    buscarDadosPerdidos,
    buscarDesempenhoServidor,
    buscarVulnerabilidadeServidor,
    buscarIndicadoresGrafico,
    buscarDadosTempoReal
    
};
