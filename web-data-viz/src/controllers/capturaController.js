var capturaModel = require("../models/capturaModel");

function buscarTempoReal(req,res){
    var idMaquina = req.query.idMaquina;
    var idRecurso = req.query.idRecurso;

    console.log(idMaquina, idRecurso)

    capturaModel.buscarTempoReal(idMaquina, idRecurso)
        .then(
            function(resultado){
                res.status(200).json(resultado)   
            }
        ).catch(
            function(erro){
                console.log(erro)
                console.log("Houve um erro ao buscar dado!",
                    erro.sqlMenssage
                )
                res.status(500).json(erro.sqlMenssage)
            }
        )
}

function listarCapturas(req, res) {
    var idEmpresa = req.params.idEmpresa
        // Chamando o model para listar capturas de alertas
        capturaModel.listarCapturas(idEmpresa)
                 .then(function (resultado) {
                     if (resultado.length > 0) {
                         res.status(200).json(resultado);
                     } else {
                         res.status(204).send("Nenhum alerta encontrado!");
                     }
                 })
                 .catch(function (erro) {
                     console.log(erro);
                     res.status(500).json(erro.sqlMessage);
                 });
}

function coletarRegrecaoConexao(req,res){
    var idEmpresa = req.params.idEmpresa

    capturaModel.coletarRegrecaoConexao(idEmpresa)
    .then(function(resultado){
        if(resultado.length > 0)
            res.status(200).json(resultado)
        else
            res.status(204).send("Nenhum dado encontrado")
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage)
    })
}

function coletarHistoricoConexoes(req,res){
   var idEmpresa = req.params.idEmpresa

    capturaModel.coletarHistoricoConexoes(idEmpresa)
    .then(function(resultado){
        if(resultado.length > 0)
            res.status(200).json(resultado)
        else
            res.status(204).send("Nenhum dado encontrado")
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage)
    })
}

function coletarComparacaoSemana(req,res){
    var idEmpresa = req.params.idEmpresa
 
     capturaModel.coletarComparacaoSemana(idEmpresa)
     .then(function(resultado){
         if(resultado.length > 0)
             res.status(200).json(resultado)
         else
             res.status(204).send("Nenhum dado encontrado")
     })
     .catch(function(erro){
         console.log(erro);
         res.status(500).json(erro.sqlMessage)
     })
 }

        
module.exports = {
    buscarTempoReal,
    listarCapturas,
    coletarRegrecaoConexao,
    coletarHistoricoConexoes,
    coletarComparacaoSemana
     };
