var database = require("../database/config")

function autenticar( email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
    select idUsuario, nome, email, senha, situacao, fkEmpresa, fkTipoUsuario from usuario where email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa, fkTipoUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fkEmpresa, fkTipoUsuario) VALUES ('${nome}', '${email}', '${senha}',  '${fkEmpresa}', '${fkTipoUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarFunc(idEmpresa){
    var instrucaoSql = `
    SELECT * FROM usuario WHERE fkEmpresa = ${idEmpresa} AND fkTipoUsuario = 2; 
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}
function listar(idEmpresa){
    var instrucaoSql = `
    SELECT * FROM usuario WHERE fkEmpresa = ${idEmpresa} ORDER BY situacao != 'Ativo'; 
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function buscarPorId(idUsuario){
    var instrucaoSql = `
    SELECT * from buscarUsuario WHERE idUsuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function desativarFunc(idUsuario){
    var instrucaoSql = `
    UPDATE usuario SET situacao = "Inativo" WHERE idUsuario = ${idUsuario}
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function alterarFunc(nome, email, senha, idUsuario){
    var instrucaoSql = `
    UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' WHERE idUsuario = ${idUsuario}
    `
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    listarFunc,
    listar,
    buscarPorId,
    desativarFunc,
    alterarFunc
};