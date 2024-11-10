var database = require("../database/config")

function listar(fkEmpresa) {
    var instrucaoSql = `
        SELECT * FROM view_listagem_maquinas WHERE fkEmpresa = ${fkEmpresa} AND situacao = 'Ativo'; 
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarEspecifico(idMaquina) {
    var instrucaoSql = `
    SELECT * FROM view_maquina_especifica WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function desativarServidor(idMaquina) {
    var instrucaoSql = `
    UPDATE maquina SET situacao = 'inativa' WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

// function listarPrioridade(idPrioridade) {
//     var instrucaoSql = `
//     SELECT tipo FROM prioridade;
//     `
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql)
// }

function alterarServidor(nomeMaquina, idPrioridade, idMaquina) {
    var instrucaoSql = `
        UPDATE maquina SET nomeMaquina = "${nomeMaquina}", fkPrioridade = ${idPrioridade}  WHERE idMaquina = ${idMaquina};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarPrioridade() {
    var instrucaoSql = `
            SELECT * FROM prioridade;
            `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


// function autenticar( email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucaoSql = `
//     select idUsuario, nome, email, senha, situacao, fkEmpresa, fkTipoUsuario from usuario where email = '${email}' AND senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// // Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
// function cadastrar(nome, email, senha, fkEmpresa, fkTipoUsuario) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

//     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//     //  e na ordem de inserção dos dados.
//     var instrucaoSql = `
//         INSERT INTO usuario (nome, email, senha, fkEmpresa, fkTipoUsuario) VALUES ('${nome}', '${email}', '${senha}',  '${fkEmpresa}', '${fkTipoUsuario}');
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function listarFunc(idEmpresa){
//     var instrucaoSql = `
//     SELECT * FROM usuario WHERE fkEmpresa = ${idEmpresa} AND fkTipoUsuario = 2; 
//     `
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql)
// }

// function buscarPorId(idUsuario){
//     var instrucaoSql = `
//     SELECT * from buscarUsuario WHERE idUsuario = ${idUsuario};
//     `
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql)
// }

// function desativarFunc(idUsuario){
//     var instrucaoSql = `
//     UPDATE usuario SET situacao = "inativo" WHERE idUsuario = ${idUsuario}
//     `
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql)
// }

// function alterarFunc(nome, email, senha, idUsuario){
//     var instrucaoSql = `
//     UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' WHERE idUsuario = ${idUsuario}
//     `
//     return database.executar(instrucaoSql)
// }

module.exports = {
    listar,
    desativarServidor,
    listarEspecifico,
    alterarServidor,
    listarPrioridade
    // listarPrioridade,
    // listarInfoEdicao,
    // alterarServidor,
    // autenticar,
    // cadastrar,
    // listarFunc,
    // buscarPorId,
    // desativarFunc,
    // alterarFunc
};