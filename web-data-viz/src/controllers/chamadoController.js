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

// function listarPorUsuario(req, res) {
//     var idUsuario = req.params.idUsuario;

//     avisoModel.listarPorUsuario(idUsuario)
//         .then(
//             function (resultado) {
//                 if (resultado.length > 0) {
//                     res.status(200).json(resultado);
//                 } else {
//                     res.status(204).send("Nenhum resultado encontrado!");
//                 }
//             }
//         )
//         .catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log(
//                     "Houve um erro ao buscar os avisos: ",
//                     erro.sqlMessage
//                 );
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

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
    var dtHora = req.params.dtHora;
    var fkDiretor = req.body.fkDiretor;
    var fkEspecialista = req.params.fkEspecialista;
    var fkUrgencia = req.params.fkUrgencia;

    if (assunto == undefined) {
        res.status(400).send("O assunto está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (dtHora == undefined) {
        res.status(403).send("O a data e a hora estão indefinidos!");
    } else if (fkDiretor == undefined) {
        res.status(403).send("A fkDiretor está indefinida!");
    } else if (fkEspecialista == undefined) {
        res.status(403).send("A fkEspecialista está indefinida!");
    } else if (fkUrgencia == undefined) {
        res.status(403).send("A fkUrgencia está indefinida!");
    } else {
        avisoModel.publicar(assunto, descricao, dtHora, fkDiretor, fkEspecialista, fkUrgencia)
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

function editar(req, res) {
    var novaDescricao = req.body.descricao;
    var idChamado = req.params.idChamado;

    avisoModel.editar(novaDescricao, idChamado)
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
    var idChamado = req.params.idChamado;

    avisoModel.deletar(idChamado)
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
    cadastrar,
    editar,
    deletar
}