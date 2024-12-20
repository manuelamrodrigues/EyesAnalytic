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
return database.executar(query, [fkEmpresa]);
}

/**
 * Buscar desempenho do servidor.
 */
function buscarDesempenho(idServidor) {
    const query = `
        SELECT 
            ROUND(
                (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END)) +
                (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END)) +
                (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END)), 2

            ) AS desempenho
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido') 
                    AND dc.fkMaquina = ${idServidor}
        GROUP BY dc.fkMaquina;
    `;
    return database.executar(query, [idServidor]);

}

/**
 * Buscar dados perdidos do servidor.
 */
function buscarDadosPerdidos(idServidor) {
    const query = `
            SELECT 
        ROUND(
            GREATEST(
                (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)), 
                0
            ) / NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END), 1) * 100, 
        2) AS dados_perdidos
    FROM dado_capturado AS dc
    JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
    WHERE r.nomeRecurso IN ('Bytes Enviados', 'Bytes Recebidos')
        AND dc.fkMaquina = ${idServidor}
    GROUP BY dc.fkMaquina;

    `;
    return database.executar(query, [idServidor]);
}

/**
 * Avaliar vulnerabilidade do servidor.
 */
function buscarVulnerabilidadeServidor(idServidor) {
    const query = `
       SELECT 
            ROUND(
                GREATEST(0, 
                    (
                        (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro ELSE NULL END)) +
                        (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro ELSE NULL END)) +
                        (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro ELSE NULL END))
                    ) * 0.25 + 
                    (
                        (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                        SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                        NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 1 END), 0) * 100
                    ) * 0.75
                ), 2
            ) AS vulnerabilidade
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE dc.fkMaquina = ${idServidor}
        AND r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido', 'Bytes Enviados', 'Bytes Recebidos');
    `;
    return database.executar(query, [idServidor, idServidor]);
}

/**
 * Buscar dados em tempo real para gráficos.
 */
/**
 * Buscar dados em tempo real para gráficos.
 */

/**
 * Centraliza a busca de dados em tempo real.
 */
async function buscarDadosTempoReal(idServidor, indicador) {

    let query;

    switch (indicador) {
        case "dados_perdidos":
            query = `
                    SELECT 
        ROUND(
            GREATEST(
                (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)), 
                0
            ) / NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END), 1) * 100, 
        2) AS dados_perdidos
    FROM dado_capturado AS dc
    JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
    WHERE r.nomeRecurso IN ('Bytes Enviados', 'Bytes Recebidos')
        AND dc.fkMaquina = ${idServidor}
    GROUP BY dc.fkMaquina;
            `;
            break;

        case "vulnerabilidade":
            query = `
                SELECT 
                                        ROUND(
                        GREATEST(0, 
                            (
                                (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro ELSE NULL END)) +
                                (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro ELSE NULL END)) +
                                (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro ELSE NULL END))
                            ) * 0.25 + 
                            (
                                (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                                SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                                NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 1 END), 0) * 100
                            ) * 0.75
                        ), 2
                    ) AS valor
                FROM dado_capturado AS dc
                JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
                WHERE dc.fkMaquina = ${idServidor}
                AND r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido', 'Bytes Enviados', 'Bytes Recebidos');
            `;
            break;

        case "desempenho":
            query = `
                SELECT 
                    ROUND(
                        (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro ELSE NULL END)) +
                        (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro ELSE NULL END)) +
                        (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro ELSE NULL END)), 2
                    ) AS valor
                FROM dado_capturado AS dc
                JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
                WHERE r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido')
                  AND dc.fkMaquina = ${idServidor};

            `;
            break;

        default:
            throw new Error("Indicador inválido!");
    }

    // Executa a query com o idServidor
    return database.executar(query, [idServidor]);
}

module.exports = {
    listarServidoresPorEmpresa,
    buscarDesempenho,
    buscarDadosPerdidos,
    buscarVulnerabilidadeServidor,
    buscarDadosTempoReal
};
