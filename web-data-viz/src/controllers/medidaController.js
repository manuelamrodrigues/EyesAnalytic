var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidasCPU(req, res) {

    medidaModel.buscarUltimasMedidasCPU().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasRAM(req, res) {
    medidaModel.buscarUltimasMedidasRAM().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);  // Retorna as medidas de RAM em formato JSON
        } else {
            res.status(204).send("Nenhum resultado encontrado!");  // Caso não encontre dados
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as últimas medidas de RAM.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);  // Retorna erro no formato JSON
    });
}

// function buscarMedidasEmTempoReal(req, res) {

//     var idAquario = req.params.idAquario;

//     console.log(`Recuperando medidas em tempo real`);

//     medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

function buscarUsoRAM(req, res) {
    var idMaquina = req.params.idMaquina;  // Pega o id da máquina do parâmetro da URL

    medidaModel.buscarUsoRAMEmTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);  // Retorna os dados de RAM em tempo real
        } else {
            res.status(204).send("Nenhum resultado encontrado para RAM!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o uso de RAM.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUsoCPU(req, res) {
    var idMaquina = req.params.idMaquina;  // Pega o id da máquina do parâmetro da URL

    medidaModel.buscarUsoCPUEmTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);  // Retorna os dados de CPU em tempo real
        } else {
            res.status(204).send("Nenhum resultado encontrado para CPU!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o uso de CPU.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarUsoRAM,
    buscarUsoCPU
    
    // buscarMedidasEmTempoReal

}