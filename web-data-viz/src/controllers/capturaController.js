var capturaModel = require("../models/capturaModel");

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
        
module.exports = {
    listarCapturas
     };
