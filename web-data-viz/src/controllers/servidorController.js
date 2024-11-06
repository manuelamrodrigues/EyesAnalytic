var servidorModel = require("../models/servidorModel");

function listar(req, res) {
    // var idMaquina = req.params.idMaquina
    // var situacao = req.params.situacao
    var idEmpresa = req.params.idEmpresa
    // var fkPrioridade = req.params.fkPrioridade

    servidorModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
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

function alterarServidor(req, res) {
    var idMaquina = req.body.idMaquina
    var idPrioridade = req.body.idPrioridade;

    usuarioModel.alterarFunc(idMaquina, idPrioridade)
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

// function autenticar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;


//     if (email == undefined) {
//         res.status(400).send("Seu email está indefinido+!");
//     }
//     else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     }

//     else {

//         usuarioModel.autenticar(email, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);
//                         res.json({
//                             idUsuario: resultadoAutenticar[0].idUsuario,
//                             nome: resultadoAutenticar[0].nome,
//                             email: resultadoAutenticar[0].email,
//                             situacao: resultadoAutenticar[0].situacao,
//                             fkEmpresa: resultadoAutenticar[0].fkEmpresa,
//                             fkTipoUsuario: resultadoAutenticar[0].fkTipoUsuario
//                         });


//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

// function cadastrar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var nome = req.body.nomeServer;
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;
//     var fkEmpresa = req.body.empresaServer;
//     var fkTipoUsuario = req.body.tipoUsuarioServer;

//     // Faça as validações dos valores
//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!");
//     // } else if (situacao == undefined) {
//     //     res.status(400).send("Sua situacao está undefined!");
//     } else if (fkEmpresa == undefined) {
//         res.status(400).send("Sua empresa está undefined!");
//     } else if (fkTipoUsuario == undefined) {
//         res.status(400).send("Seu tipo está undefined!")
//     }
//     else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.cadastrar(nome, email, senha, fkEmpresa, fkTipoUsuario)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

// function listarFunc(req, res) {
//     var idEmpresa = req.params.idEmpresa
//     console.log(idEmpresa)
//     usuarioModel.listarFunc(idEmpresa)
//         .then(function (resultado) {
//             res.status(200).json(resultado)
//         }).catch(function (erro) {
//             console.log(erro)
//             console.log(
//                 "\nHouve um erro listar! Erro: ",
//                 erro.sqlMessage
//             )
//             res.status(500).json(erro.sqlMessage);
//         })
// }


// function buscarPorId(req, res) {
//     var idUsuario = req.params.idUsuario
//     usuarioModel.buscarPorId(idUsuario)
//         .then(function (resultado) {
//             res.status(200).json(resultado)
//         }).catch(function (erro) {
//             console.log(erro)
//             res.status(500).json(erro.sqlMessage)
//         })
// }

// function desativarFunc(req, res) {
//     var idUsuario = req.params.idUsuario
//     usuarioModel.desativarFunc(idUsuario)
//         .then(
//             function (resultado) {
//                 res.status(200).json(resultado)
//             }

//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("Houve um erro ao realizar a alteracao: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         )
// }

// function alterarFunc(req, res) {
//     var nome = req.body.nome
//     var email = req.body.email
//     var senha = req.body.senha
//     var idUsuario = req.body.idUsuario

//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!");
//     }
//     else {
//         usuarioModel.alterarFunc(nome, email, senha, idUsuario)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

module.exports = {
    listar,
    listarPrioridade,
    alterarServidor,
    desativarServidor
    // autenticar,
    // cadastrar,
    // listarFunc,
    // buscarPorId,
    // desativarFunc,
    // alterarFunc
}