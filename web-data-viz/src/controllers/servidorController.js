var servidorModel = require("../models/servidorModel");

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa
    servidorModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function listarEspecifico(req, res) {
    var idMaquina = req.params.idMaquina

    servidorModel.listarEspecifico(idMaquina)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function alterarServidor(req, res) {
    var nomeMaquina = req.body.nomeMaquina
    var idPrioridade = req.body.idPrioridade
    var idMaquina = req.body.idMaquina

    servidorModel.alterarServidor(nomeMaquina, idPrioridade, idMaquina)
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

function listarPrioridade(req, res) {
    var idPrioridade = req.params.idPrioridade
    servidorModel.listarPrioridade(idPrioridade)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function desativarServidor(req, res) {
    var idMaquina = req.params.idMaquina

    servidorModel.desativarServidor(idMaquina)
        .then(
            function (resultado) {
                res.status(200).json(resultado)
            }

        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a alteracao: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function indicadores(req, res) {
    const idMaquina = req.params.idMaquina;

    servidorModel.indicadores(idMaquina)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado); // Retorna os indicadores para o frontend
            } else {
                res.status(204).send("Nenhum dado encontrado");
            }
        })
        .catch((erro) => {
            console.log("Erro ao buscar indicadores:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    listar,
    listarEspecifico,
    alterarServidor,
    desativarServidor,
    listarPrioridade, 
    indicadores
}