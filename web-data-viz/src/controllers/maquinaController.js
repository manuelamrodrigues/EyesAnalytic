var maquinaModel = require("../models/maquinaModel");
const { autenticar } = require("./usuarioController");

function listarMaquina(req, res) {
    var idEmpresa = req.body.idEmpresaServer;

    if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa não está definido")
    }
    else {
        maquinaModel.listarMaquina(idEmpresa)
            .then(
                function (resultadolistar) {
                    console.log(`\n Resultados encontrados: ${resultadolistar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadolistar)}`)

                    if (resultadolistar.length > 0) {
                        resultadolistar.for
                        console.log(resultadolistar)
                        res.status(200).json(resultadolistar)
                    }
                    else {
                        res.status(400).send("Não foram encontradas Máquinas dessa empresa");

                    }
                }
            ).catch(function (erro) {
                console.log(erro)
                console.log("\n Houve um erro ao listar Máquina! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            })
    }
}

function atualizarPrioridade(req, res) {
    var idPrioridade = req.body.idPrioridadeServer
    var idMaquina = req.body.idMaquinaServer

    if (idPrioridade == undefined) {
        res.status(400).send("Prioridade não definida!")
    }
    else if (idMaquina == undefined) {
        res.status(400).send("Máquina não definida!")
    }
    else {
        maquinaModel.atualizarPrioridade(idPrioridade, idMaquina)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a alteração: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function desativarMaquina(req, res) {
    var idMaquina = req.body.idMaquinaServer

    if (idMaquina == undefined) {
        res.status(400).send("O id da máquina não está definido!")
    }
    else {
        maquinaModel.desativarMaquina(idMaquina)
            .then(
                function (resposta) {
                    res.json(resposta)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a alteração: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

module.exports = {
    listarMaquina,
    atualizarPrioridade,
    desativarMaquina
}