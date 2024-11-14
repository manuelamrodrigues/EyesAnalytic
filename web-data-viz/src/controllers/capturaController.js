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

module.exports = {
    buscarTempoReal
}