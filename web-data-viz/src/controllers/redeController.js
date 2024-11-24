var redeModel = require("../models/redeModel.js");

function listarServidor(req, res) {
    var idEmpresa = req.params.idEmpresa
    redeModel.listarServidor(idEmpresa)
        .then((resultado) => {
            res.status(200).json(resultado);
        });
}

function listarIp(req, res) {
    var idMaquina = req.params.idMaquina
    redeModel.listarIp(idMaquina)
        .then((resultado) => {
            res.status(200).json(resultado);
        });
}

function listarIndicadorPacote(req, res) {
    var idMaquina = req.params.idMaquina

    redeModel.listarIndicadorPacote(idMaquina)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function listarIndicadorOutros(req, res) {
    var idMaquina = req.params.idMaquina

    redeModel.listarIndicadorOutros(idMaquina)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarQualidade(req, res) {
    var idMaquina = req.params.idMaquina

    redeModel.buscarQualidade(idMaquina)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function atualizarQualidade(req, res) {
    var qualidadeRede = req.body.qualidadeRede
    var idMaquina = req.body.idMaquina

    redeModel.atualizarQualidade(qualidadeRede, idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarTempoReal(req, res) {
    var idMaquina = req.query.idMaquina;
    // var idRecurso = req.query.idRecurso;
    console.log(idMaquina)
    redeModel.buscarTempoReal(idMaquina)
        .then(
            function (resultado) {
                res.status(200).json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro)
                console.log("Houve um erro ao buscar dado!",
                    erro.sqlMenssage
                )
                res.status(500).json(erro.sqlMenssage)
            }
        )
}

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa
    redeModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado)
            console.log(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}


module.exports = {
    listarIndicadorPacote,
    listarIndicadorOutros,
    listarServidor,
    buscarTempoReal,
    buscarQualidade,
    atualizarQualidade,
    listar,
    listarIp

}