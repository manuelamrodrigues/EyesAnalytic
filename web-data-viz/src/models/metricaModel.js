var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(idRecurso, valorMetrica) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idRecurso, valorMetrica);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
   const instrucao = `
        INSERT INTO metrica (idRecurso, valorMetrica) VALUES ('${idRecurso}', '${valorMetrica}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// feito :>

function listar(){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():");
    const instrucao = `
    SELECT * FROM metrica_view; 
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



function desativarMetrica(idMetrica){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function desativarMetrica():", idMetrica);
    const instrucao = `
    DELETE FROM metrica_view WHERE idMetrica = ${idMetrica}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function alterarMetrica(idRecurso, valorMetrica, idMetrica){
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterarMetrica():", idRecurso, valorMetrica, idMetrica);
    const instrucao = `
    UPDATE metrica_view SET idRecurso = '${idRecurso}', valorMetrica = '${valorMetrica}' WHERE idMetrica = ${idMetrica}
    `
    return database.executar(instrucao)
}


module.exports = {
    cadastrar,
    listar,
    desativarMetrica,
    alterarMetrica

};