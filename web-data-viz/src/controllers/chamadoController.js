var chamadoModel = require("../models/chamadoModel");

function listar(req, res) {
    chamadoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os chamados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorId(req, res) {
    var idChamado = req.body.idChamado;

    chamadoModel.buscarPorId(idChamado)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os chamados: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// function pesquisarDescricao(req, res) {
//     var descricao = req.params.descricao;

//     avisoModel.pesquisarDescricao(descricao)
//         .then(
//             function (resultado) {
//                 if (resultado.length > 0) {
//                     res.status(200).json(resultado);
//                 } else {
//                     res.status(204).send("Nenhum resultado encontrado!");
//                 }
//             }
//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

function cadastrar(req, res) {
    var assunto = req.body.assunto;
    var descricao = req.body.descricao;
    var fkDiretor = req.body.fkDiretor;
    var fkEspecialista = req.body.fkEspecialista;
    var fkUrgencia = req.body.fkUrgencia;

    if (assunto == undefined) {
        res.status(400).send("O assunto está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (fkDiretor == undefined) {
        res.status(403).send("A fkDiretor está indefinida!");
    } else if (fkEspecialista == undefined) {
        res.status(403).send("A fkEspecialista está indefinida!");
    } else if (fkUrgencia == undefined) {
        res.status(403).send("A fkUrgencia está indefinida!");
    } else {
        chamadoModel.cadastrar(assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    
    var novoAssunto = req.body.assunto;
    var novaDescricao = req.body.descricao;
    var novoStatus = req.body.status;
    var idChamado = req.body.idChamado;

    chamadoModel.atualizar(idChamado, novoAssunto, novaDescricao, novoStatus)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idChamado = req.body.idChamado;

    chamadoModel.deletar(idChamado)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// module.exports = {
//     listar,
//     listarPorUsuario,
//     pesquisarDescricao,
//     publicar,
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