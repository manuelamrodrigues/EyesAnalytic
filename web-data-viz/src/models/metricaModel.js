var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(fkRecurso, valorMetrica, fkEmpresa) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkRecurso, valorMetrica, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
   const instrucao = `
        INSERT INTO metrica (fkRecurso, valorMetrica, fkEmpresa) VALUES ('${fkRecurso}', '${valorMetrica}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

    // FALTA CADASTRAR COM A FKEMPRESA
}

// feito :>

function listarCadastrar(){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():");
    const instrucao = `
    SELECT * FROM metrica_view; 
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}

function listarRecursos(){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarRecusos():");
    const instrucao = `
    select * from recurso; 
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}
// feito :>
// Listar Cadastro

function listar(idEmpresa){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():", idEmpresa);
    const instrucao = `
    SELECT * FROM metrica_view WHERE idEmpresa = ${idEmpresa}; 
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}
// feito :>

function listarPorId(idMetrica){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():", idMetrica);
    const instrucao = `
    SELECT * FROM metrica_view WHERE idMetrica = ${idMetrica}; 
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}

// function listarComponentes(idMetrica){
//     console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():", idMetrica);
//     const instrucao = `
//     SELECT * FROM metrica_view WHERE idMetrica = ${idMetrica}; 
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao)
// }





function desativarMetrica(idMetrica){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function desativarMetrica():", idMetrica);
    const instrucao = `
    DELETE FROM metrica WHERE idMetrica = ${idMetrica}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function alterarMetrica(idMetrica, fkRecurso, valorMetrica){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterarMetrica():", fkRecurso, valorMetrica, idMetrica);
    const instrucao = `
    UPDATE metrica SET fkRecurso = '${fkRecurso}', valorMetrica = '${valorMetrica}' WHERE idMetrica = ${idMetrica}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}


module.exports = {
    cadastrar,
    listar,
    listarCadastrar,
    listarPorId,
    listarRecursos,
    desativarMetrica,
    alterarMetrica
};