const segurancaModel = require("../models/segurancaModel");

function getParametro(req, nome) {
    return req.query[nome] || req.body[nome] || req.params[nome];
}

/**
 * Listar servidores ativos.
 */
async function listarServidores(req, res) {
    try {
        const fkEmpresa = req.session?.fkEmpresa || req.query.fkEmpresa || req.body.fkEmpresa;
        
        if (!fkEmpresa) {
            return res.status(400).json({ erro: "O identificador da empresa (fkEmpresa) é obrigatório." });
        }

        const resultado = await segurancaModel.listarServidoresPorEmpresa(fkEmpresa);

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ mensagem: "Nenhum servidor encontrado para esta empresa." });
        }
    } catch (erro) {
        console.error("Erro ao listar servidores:", erro.sqlMessage || erro);
        res.status(500).json({ erro: "Erro ao listar servidores. Por favor, tente novamente mais tarde." });
    }
}

/**
 * Buscar desempenho de um servidor.
 */
function buscarDesempenho(req, res) {
    const idServidor = getParametro(req, "idServidor");

    segurancaModel.buscarDesempenho(idServidor)
        .then((resultado) => {
            if (resultado && resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({ mensagem: "Nenhum desempenho encontrado para o servidor." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar desempenho do servidor:", erro);
            res.status(500).json({ erro: "Erro interno ao buscar desempenho do servidor. Tente novamente mais tarde." });
        });
}

/**
 * Buscar dados perdidos de um servidor.
 */
function buscarDadosPerdidos(req, res) {
    const idServidor = getParametro(req, "idServidor");

    segurancaModel.buscarDadosPerdidos(idServidor)
        .then((resultado) => {
            if (resultado && resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({ mensagem: "Nenhum dado de perda encontrado para o servidor." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar dados perdidos do servidor:", erro);
            res.status(500).json({ erro: "Erro interno ao buscar dados perdidos do servidor. Tente novamente mais tarde." });
        });
}

/**
 * Buscar vulnerabilidades de um servidor.
 */
function buscarVulnerabilidades(req, res) {
    const idServidor = getParametro(req, "idServidor");

    segurancaModel.buscarVulnerabilidadeServidor(idServidor)
        .then((resultado) => {
            if (resultado && resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({ mensagem: "Nenhuma vulnerabilidade encontrada para o servidor." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar vulnerabilidades do servidor:", erro);
            res.status(500).json({ erro: "Erro interno ao buscar vulnerabilidades do servidor. Tente novamente mais tarde." });
        });
}

/**
 * Buscar dados em tempo real para gráficos.
 */
async function buscarDadosTempoReal(req, res) {
    const idServidor = req.params.idServidor;
    const indicador = req.params.indicador;

    try {
        const resultado = await segurancaModel.buscarDadosTempoReal(idServidor, indicador);

        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado); // Retorna todos os dados como array
        } else {
            res.status(404).json({ mensagem: "Nenhum dado encontrado para o indicador especificado." });
        }
    } catch (erro) {
        console.error("Erro ao buscar dados em tempo real:", erro);
        res.status(500).json({ erro: "Erro interno ao buscar dados em tempo real. Tente novamente mais tarde." });
    }
}

module.exports = {
    listarServidores,
    buscarDesempenho,
    buscarDadosPerdidos,
    buscarVulnerabilidades,
    buscarDadosTempoReal,
};
