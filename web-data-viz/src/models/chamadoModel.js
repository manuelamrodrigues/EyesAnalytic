var database = require("../database/config");

function listar() {
    console.log("ACESSEI O CHAMADO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
      SELECT c.idChamado,
        c.assunto,
        c.descricao,
        c.status,
        c.dtHora,
        d.idUsuario AS idDiretor,
        d.nome as NomeDiretor,
        d.email as EmailDiretor,
        e.idUsuario AS idEspecialista,
        e.nome as NomeEspecialista,
        e.email as EmailEspecialista,
        u.idUrgencia
        FROM Chamado as c
        INNER JOIN Usuario as d
        ON c.fkDiretor = d.idUsuario
        INNER JOIN Usuario as e
        ON c.fkEspecialista = e.idUsuario
        INNER JOIN Urgencia as u
        ON c.fkUrgencia = u.idUrgencia;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(idChamado) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId()");
    var instrucaoSql = `
        SELECT c.idChamado,
        c.assunto,
        c.descricao,
        c.status,
        c.dtHora,
        d.idUsuario AS idDiretor,
        d.nome as NomeDiretor,
        d.email as EmailDiretor,
        e.idUsuario AS idEspecialista,
        e.nome as NomeEspecialista,
        e.email as EmailEspecialista,
        u.idUrgencia
        FROM Chamado as c
        INNER JOIN Usuario as d
        ON c.fkDiretor = d.idUsuario
        INNER JOIN Usuario as e
        ON c.fkEspecialista = e.idUsuario
        INNER JOIN Urgencia as u
        ON c.fkUrgencia = u.idUrgencia WHERE idChamado= ${idChamado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function publicar(titulo, descricao, idUsuario) {
function cadastrar(assunto, descricao, status, fkDiretor, fkEspecialista, fkUrgencia) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", assunto, descricao, status, fkDiretor, fkEspecialista, fkUrgencia);
    var instrucaoSql = `
        INSERT INTO Chamado (assunto, descricao, status, fkDiretor, fkEspecialista, fkUrgencia) VALUES ('${assunto}', '${descricao}', '${status}', '${fkDiretor}', '${fkEspecialista}', '${fkUrgencia}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idChamado, novoAssunto, novaDescricao, novoStatus) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idChamado, novoAssunto, novaDescricao, novoStatus);
    var instrucaoSql = `
        UPDATE Chamado SET assunto = '${novoAssunto}', descricao = '${novaDescricao}', status = '${novoStatus}' WHERE idChamado = ${idChamado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idChamado) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idChamado);
    var instrucaoSql = `
        DELETE FROM Chamado WHERE idChamado = ${idChamado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
    buscarPorId,
    cadastrar,
    atualizar,
    deletar
}
