var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {
    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;
    var componente = req.params.componente;

    console.log(`Recuperando as últimas ${limite_linhas} medidas de ${componente} para a máquina ${idMaquina}`);

    medidaModel.buscarUltimasMedidasComponente(idMaquina, componente, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoReal(req, res) {
    var idMaquina = req.params.idMaquina;
    var componente = req.params.componente;

    console.log(`Recuperando medidas em tempo real de ${componente} para a máquina ${idMaquina}`);

    medidaModel.buscarMedidasEmTempoRealComponente(idMaquina, componente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function obterIndicadores(req, res) {
    let dados = {};

    medidaModel.buscarQuantidadeMaquinas()
        .then(result => {
            dados.quantidadeMaquinas = result[0].quantidade;
            return medidaModel.buscarMaquinasConectadas();
        })
        .then(result => {
            dados.maquinasConectadas = result[0].conectadas;
            return medidaModel.buscarAlertasRecentes();
        })
        .then(result => {
            dados.alertasRecentes = result[0].alertas;
            return medidaModel.buscarMbpsUpload();
        })
        .then(result => {
            dados.upload = result[0].upload;
            return medidaModel.buscarMbpsDownload();
        })
        .then(result => {
            dados.download = result[0].download;
            res.status(200).json(dados);
        })
        .catch(error => {
            console.log("Erro ao obter indicadores:", error);
            res.status(500).json(error.sqlMessage || "Erro ao obter indicadores");
        });
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    obterIndicadores

}