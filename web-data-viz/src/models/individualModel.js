var database = require("../database/config");

function serverMax(fkRecurso, idEmpresa) {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function serverMax():", fkRecurso, idEmpresa);
    const instrucao = `
               SELECT 
    e.razaoSocial, 
    m.nomeMaquina, 
    MAX(dc.registro) AS valorRegistrado
FROM 
    dado_capturado dc
JOIN 
    maquina m ON dc.fkMaquina = m.idMaquina
JOIN 
    empresa e ON m.fkEmpresa = e.idEmpresa
WHERE 
    dc.fkRecurso = ${fkRecurso}
    AND e.idEmpresa = ${idEmpresa} 
GROUP BY 
    e.razaoSocial,
    m.nomeMaquina
ORDER BY 
    e.razaoSocial,
    valorRegistrado DESC;
            `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ranking(idEmpresa) {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ranking():", idEmpresa);
    const instrucao = `
    SELECT
    e.razaoSocial AS Empresa,
    m.nomeMaquina AS Servidor,
    MAX(CASE WHEN dc.fkRecurso = 1 THEN dc.registro ELSE NULL END) AS CPU,
    MAX(CASE WHEN dc.fkRecurso = 2 THEN dc.registro ELSE NULL END) AS RAM,
    COUNT(a.idAlerta) AS totalAlertas
FROM
    dado_capturado dc
JOIN
    maquina m ON dc.fkMaquina = m.idMaquina
JOIN
    empresa e ON m.fkEmpresa = e.idEmpresa
LEFT JOIN
    alerta a ON a.fkDadoCapturado = dc.idDadoCapturado
WHERE
    e.idEmpresa = ${idEmpresa} -- Substitua pelo ID da empresa desejada
GROUP BY
    e.razaoSocial,
    m.nomeMaquina
ORDER BY
    totalAlertas DESC -- Ordenação decrescente pelo total de alertas
LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);  // Executa a consulta no banco de dados
}

function picosMensal(fkRecurso, idEmpresa) {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function picosMensal():", fkRecurso, idEmpresa);
    const instrucao = `
       SELECT 
    e.razaoSocial, 
    DATE_FORMAT(dc.dtHora, '%Y-%m') AS mes,
    r.nomeRecurso,
    AVG(dc.registro) AS valorMedio
FROM 
    dado_capturado dc
JOIN 
    maquina m ON dc.fkMaquina = m.idMaquina
JOIN 
    empresa e ON m.fkEmpresa = e.idEmpresa
JOIN 
    recurso r ON dc.fkRecurso = r.idRecurso
WHERE 
    e.idEmpresa = ${idEmpresa} 
    AND dc.fkRecurso = ${fkRecurso} 
GROUP BY 
    e.razaoSocial, 
    DATE_FORMAT(dc.dtHora, '%Y-%m'), 
    r.nomeRecurso
ORDER BY 
    e.razaoSocial, 
    mes, 
    r.nomeRecurso;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);  // Executa a consulta no banco de dados
}

function UsoPorHora(fkRecurso, idEmpresa) {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function UsoPorHora():", fkRecurso, idEmpresa);
    const instrucao = `
    SELECT 
    e.razaoSocial,
    DATE_FORMAT(dc.dtHora, '%Y-%m') AS mes,
    m.nomeMaquina,   
    r.nomeRecurso,    
    DATE_FORMAT(dc.dtHora, '%Y-%m-%d') AS dia_captura,  
    DATE_FORMAT(dc.dtHora, '%H:%i:%s') AS hora_captura,  
    DAYOFWEEK(dc.dtHora) AS dia_semana,  
    AVG(dc.registro) AS valorMedio
FROM 
    dado_capturado dc
JOIN 

    maquina m ON dc.fkMaquina = m.idMaquina
JOIN 
    empresa e ON m.fkEmpresa = e.idEmpresa
JOIN 
    recurso r ON dc.fkRecurso = r.idRecurso
WHERE 
    e.idEmpresa = ${idEmpresa} 
    AND dc.fkRecurso = ${fkRecurso} 
GROUP BY 
    e.razaoSocial, 
    DATE_FORMAT(dc.dtHora, '%Y-%m'), 
    m.nomeMaquina, 
    r.nomeRecurso, 
    DATE_FORMAT(dc.dtHora, '%Y-%m-%d'), 
    DATE_FORMAT(dc.dtHora, '%H:%i:%s'), 
    DAYOFWEEK(dc.dtHora)
ORDER BY 
    e.razaoSocial, 
    mes, 
    m.nomeMaquina, 
    r.nomeRecurso, 
    dia_captura, 
    hora_captura;

`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [fkRecurso]);  // Utiliza parâmetros preparados
  // Executa a consulta no banco de dados
}



module.exports = {
    serverMax,
    ranking,
    picosMensal,
    UsoPorHora
};
