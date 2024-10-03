var database = require("../database/config");

function listar() {
    console.log("ACESSEI O CHAMADO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT c.idChamado,
        c.assunto,
        c.descricao,
        c.dtHora,
        d.idUsuario AS idDiretor,
        d.nome as NomeDiretor,
        d.email as EmailDiretor,
        e.idUsuario AS idEspecialista,
        e.nome as NomeDiretor,
        e.email as EmailDiretor,
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

// function pesquisarDescricao(texto) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
//     var instrucaoSql = `
//         SELECT 
//             a.id AS idAviso,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE a.descricao LIKE '${texto}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function listarPorUsuario(idUsuario) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
//     var instrucaoSql = `
//         SELECT 
//             a.id AS idAviso,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE u.id = ${idUsuario};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function publicar(titulo, descricao, idUsuario) {
function cadastrar(assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia);
    var instrucaoSql = `
        INSERT INTO Chamado (assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia) VALUES ('${assunto}', '${descricao}', ${fkDiretor}, ${fkEspecialista}, ${fkUrgencia});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idChamado,novaDescricao) {
    console.log("ACESSEI O CHAMADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",idChamado, novaDescricao );
    var instrucaoSql = `
        UPDATE Chamado SET descricao = '${novaDescricao}' WHERE idChamado = ${idChamado};
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
    cadastrar,
    editar,
    deletar
}
