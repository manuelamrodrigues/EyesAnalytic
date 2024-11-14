var metricaModel = require("../models/metricaModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var valorMetrica = req.body.valorMetricaServer;
    var fkRecurso = req.body.fkRecurso;
    var fkEmpresa = req.body.fkEmpresa;


    // Faça as validações dos valores
    if (valorMetrica == undefined) {
        res.status(400).send("valor metrica está undefined!");
    } else if (fkRecurso == undefined) {
        res.status(400).send("fkRecurso está undefined!");
    }else if (fkEmpresa == undefined){
        res.status(400).send("fkEmpresa está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        metricaModel.cadastrar(fkRecurso, valorMetrica, fkEmpresa)
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
}

// function listar(req, res) {
//     var idEmpresa = req.params.idEmpresa
//     metricaModel.listar(idEmpresa)
//         .then(function (resultado) {
//             res.status(200).json(resultado)
//         }).catch(function (erro) {
//             console.log(erro)
//             res.status(500).json(erro.sqlMessage)
//         })
// }
//listarCadastro

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa
    metricaModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}


function listarCadastrar(req, res) {
    var idEmpresa = req.params.idEmpresa
    metricaModel.listarCadastrar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

// function listarCadastrar() {
//     fetch("/metricas/listarCadastrar", {
//         method: "GET",
//     })
//         .then(function (resposta) {
//             resposta.json().then((metricas) => {
//                 const listaComponentes = document.getElementById("listaComponentes");
//                 metricas.forEach((metrica) => {
//                     listaComponentes.innerHTML += `<option value='${metrica.idRecurso}'>${metrica.nomeRecurso}</option>`;
//                 });
//             });
//         });
// }


// function listarComponentes(req, res) {
   
//     metricaModel.listarlistarComponentes()
//         .then(function (resultado) {
//             res.status(200).json(resultado)
//         }).catch(function (erro) {
//             console.log(erro)
//             res.status(500).json(erro.sqlMessage)
//         })
// }


function listarPorId(req, res) {
    var idMetrica = req.params.idMetrica
    metricaModel.listarPorId(idMetrica)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}


function desativarMetrica(req, res) {
    var idMetrica = req.params.idMetrica;
    metricaModel.desativarMetrica(idMetrica)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a desativação: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function alterarMetrica(req, res) {
    var idRecurso = req.body.idRecurso;
    var valorMetrica = req.body.valorMetrica;
    var idMetrica = req.body.idMetrica;

    if (idRecurso == undefined) {
        res.status(400).send("idRecurso está undefined!");
    } else if (valorMetrica == undefined) {
        res.status(400).send("valorMetrica está undefined!");
    } else if (idMetrica == undefined) {
        res.status(400).send("idMetrica está undefined!");
    } else {
        metricaModel.alterarMetrica(idRecurso, valorMetrica, idMetrica)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a alteração! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar,
    listar,
    listarCadastrar,
    listarPorId,
    desativarMetrica,
    alterarMetrica
}