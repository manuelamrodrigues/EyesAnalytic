var database = require("../database/config");

function listar() {
    console.log("ACESSEI O CHAMADO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
      SELECT * FROM view_select_listar_chamados;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorIdEspecialista(idEspecialista){
    console.log("ACESSEI O CHAMADO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql= `
    SELECT * FROM view_select_listar_chamados WHERE idEspecialista = ${idEspecialista} ORDER BY situacao DESC; 
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}
function listarPorDiretor(idDiretor){
    var instrucaoSql = `
    SELECT * FROM view_select_listar_chamados WHERE idDiretor = ${idDiretor} 
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}

function buscarPorId(idChamado) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId()");
    var instrucaoSql = `
       SELECT * FROM view_select_listar_chamados WHERE idChamado= ${idChamado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function publicar(titulo, descricao, idUsuario) {
function cadastrar(assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia);
    var instrucaoSql = `
        INSERT INTO chamado (assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia) VALUES ('${assunto}', '${descricao}', '${fkDiretor}', '${fkEspecialista}', '${fkUrgencia}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idChamado, novoAssunto, novaDescricao, novoSituacao) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idChamado, novoAssunto, novaDescricao, novoSituacao);
    var instrucaoSql = `
        UPDATE chamado SET assunto = '${novoAssunto}', descricao = '${novaDescricao}', situacao = '${novoSituacao}' WHERE idChamado = ${idChamado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idChamado) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idChamado);
    var instrucaoSql = `
        DELETE FROM chamado WHERE idChamado = ${idChamado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atender(idChamado){
    var instrucaoSql = `
    UPDATE chamado SET situacao = 'Atendido' WHERE idChamado = ${idChamado} 
    `
    console.log ("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function cancelar(idChamado){
    var instrucaoSql = `
    UPDATE chamado SET situacao = 'Cancelado' WHERE idChamado = ${idChamado} 
    `
    console.log ("Executando a instrução SQL: \n" + instrucaoSql)
        return database.executar(instrucaoSql)
}

// module.exports = {
//     listar,
//     listarPorUsuario,
//     pesquisarDescricao,
//     cadastrar,
//     editar,
//     deletar
// }

module.exports = {
    listar,
    listarPorIdEspecialista,
    listarPorDiretor,
    buscarPorId,
    cadastrar,
    atualizar,
    deletar,
    atender,
    cancelar
}
