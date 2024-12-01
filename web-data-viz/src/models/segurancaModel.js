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
async function buscarDesempenhoServidor(servidor) {
    const query = `
        SELECT 
            dc.fkMaquina AS id_servidor,
            ROUND(
                (0.50 * AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN dc.registro END)) +
                (0.30 * AVG(CASE WHEN r.nomeRecurso = 'RAM' THEN dc.registro END)) +
                (0.20 * AVG(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN dc.registro END)), 2
            ) AS desempenho
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido') 
          AND dc.fkMaquina = ?
        GROUP BY dc.fkMaquina;
    `;
    return database.executar(query, [servidor]);
}

/**
 * Buscar dados perdidos do servidor.
 */
async function buscarDadosPerdidos(servidor) {
    const query = `
        SELECT 
            dc.fkMaquina AS id_servidor,
            ROUND(
                (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                 SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro END), 1) * 100, 2
            ) AS dados_perdidos
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso IN ('Bytes Enviados', 'Bytes Recebidos')
          AND dc.fkMaquina = ?
        GROUP BY dc.fkMaquina;
    `;
    return database.executar(query, [servidor]);
}

/**
 * Avaliar vulnerabilidade do servidor.
 */
async function buscarVulnerabilidadeServidor(servidor) {
    const query = `
        SELECT 
            ds.id_servidor,
            pd.dados_perdidos,
            ds.desempenho,
            ROUND((ds.desempenho * 0.25) + (pd.dados_perdidos * 0.75), 2) AS vulnerabilidade
        FROM (
            ${buscarDesempenhoServidor(servidor).query}
        ) AS ds
        JOIN (
            ${buscarDadosPerdidos(servidor).query}
        ) AS pd ON ds.id_servidor = pd.id_servidor;
    `;
    return database.executar(query, [servidor, servidor]);
}

/**
 * Buscar indicadores para gráficos.
 */
async function buscarIndicadoresGrafico(servidor, indicador) {
    const query = `
        SELECT 
            dc.dtHora AS data, 
            dc.registro AS valor
        FROM dado_capturado AS dc
        JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
        WHERE r.nomeRecurso = ${indicador} AND dc.fkMaquina = ${servidor}
        ORDER BY dc.dtHora DESC;
    `;
    return database.executar(query, [indicador, servidor]);
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
                        (SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) - 
                         SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END)) /
                        NULLIF(SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro END), 1) * 100, 2
                    ) AS valor
                FROM dado_capturado AS dc
                JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
                WHERE r.nomeRecurso IN ('Bytes Enviados', 'Bytes Recebidos') 
                  AND dc.fkMaquina = ?
                GROUP BY dc.dtHora
                ORDER BY dc.dtHora DESC;
            `;
            break;

        case "vulnerabilidade":
            query = buscarVulnerabilidadeServidor(servidor).query;
            break;

        case "servidor":
            query = buscarDesempenhoServidor(servidor).query;
            break;

        default:
            return Promise.reject("Indicador inválido!");
    }

    return database.executar(query, [servidor]);
}

module.exports = {
    listarServidoresPorEmpresa,
    buscarDadosPerdidos,
    buscarDesempenhoServidor,
    buscarVulnerabilidadeServidor,
    buscarIndicadoresGrafico,
    buscarDadosTempoReal,
};
