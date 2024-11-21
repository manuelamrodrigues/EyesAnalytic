var database = require("../database/config");

function serverMax(fkRecurso) {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function serverMax():", fkRecurso);
    const instrucao = `
         SELECT 
                m.nomeMaquina, 
                dc.registro AS valorRegistrado
            FROM dado_capturado dc
            JOIN maquina m ON dc.fkMaquina = m.idMaquina
            WHERE dc.fkRecurso = ${fkRecurso}
            ORDER BY dc.registro DESC;;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ranking() {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ranking():");
    const instrucao = `
        SELECT * FROM estado_maquinas ORDER BY CPU DESC, RAM DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);  // Executa a consulta no banco de dados
}

function picosMensal(fkRecurso) {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function picosMensal():", fkRecurso);
    const instrucao = `
        SELECT 
    m.nomeMaquina, 
    dc.fkRecurso,  -- Exibe o código do recurso diretamente
    DATE_FORMAT(dc.dtHora, '%Y-%m') AS mes,
    MAX(dc.registro) AS valorRegistrado
FROM 
    dado_capturado dc
JOIN 
    maquina m ON dc.fkMaquina = m.idMaquina
WHERE 
    dc.fkRecurso = ${fkRecurso}
GROUP BY 
    m.nomeMaquina,
    dc.fkRecurso,
    DATE_FORMAT(dc.dtHora, '%Y-%m')
ORDER BY 
    m.nomeMaquina,
    dc.fkRecurso,
    mes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);  // Executa a consulta no banco de dados
}

function UsoPorHora(fkRecurso) {
    console.log("ACESSEI O INDIVIDUAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function UsoPorHora():", fkRecurso);
    const instrucao = `
    SELECT 
        m.nomeMaquina,   
        dc.fkRecurso,    
        DATE_FORMAT(dc.dtHora, '%Y-%m-%d') AS dia_captura,  
        DATE_FORMAT(dc.dtHora, '%H:%i:%s') AS hora_captura,  
        DAYOFWEEK(dc.dtHora) AS dia_semana,  
        dc.registro
    FROM 
        dado_capturado dc
    JOIN 
        maquina m ON dc.fkMaquina = m.idMaquina  
    WHERE 
        dc.fkRecurso = ${fkRecurso}  
    ORDER BY 
        m.nomeMaquina, 
        dc.fkRecurso, 
        dc.dtHora;
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
