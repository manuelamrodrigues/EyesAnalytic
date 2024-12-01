const segurancaModel = require("../models/segurancaModel");

/**
 * Listar servidores ativos.
 */
function listarServidores(req, res) {
    const fkEmpresa = req.session?.fkEmpresa || req.query.fkEmpresa || req.body.fkEmpresa;

    if (!fkEmpresa) {
        return res.status(400).json({ erro: "O identificador da empresa (fkEmpresa) é obrigatório." });
    }

    segurancaModel.listarServidoresPorEmpresa(fkEmpresa)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensagem: "Nenhum servidor encontrado para esta empresa." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao listar servidores:", erro);
            res.status(500).json({ erro: "Erro ao listar servidores. Por favor, tente novamente mais tarde." });
        });
}

/**
 * Buscar dados de desempenho de um servidor.
 */
function buscarIndicadores(req, res) {
    const servidor = req.query.idServidor;

    if (!servidor) {
        return res.status(400).json({ erro: "O ID do servidor está indefinido!" });
    }

    segurancaModel.buscarDesempenhoServidor(servidor)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensagem: "Nenhum dado de desempenho encontrado para o servidor." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar desempenho do servidor:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao processar a requisição." });
        });
}

/**
 * Buscar dados de um gráfico com base no indicador selecionado.
 */
function buscarIndicadoresGrafico(req, res) {
    const { idServidor: servidor, indicador } = req.query;

    if (!servidor || !indicador) {
        return res.status(400).json({ erro: "ID do servidor ou nome do indicador está indefinido!" });
    }

    segurancaModel.buscarIndicadoresGrafico(servidor, indicador)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensagem: "Nenhum dado encontrado para o indicador especificado." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar indicadores para gráfico:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao processar a requisição." });
        });
}

function buscarDadosTempoReal(req, res) {
    const { idServidor, indicador } = req.params;

    if (!idServidor || !indicador) {
        return res.status(400).json({ erro: "ID do servidor ou indicador não foram fornecidos." });
    }

    segurancaModel.buscarDadosTempoReal(idServidor, indicador)
        .then((resultado) => {
            if (resultado.length > 0) {
                const dado = resultado[0];
                res.status(200).json({
                    servidor: dado.nomeServidor || "N/A",
                    vulnerabilidade: dado.vulnerabilidade || 0,
                    dadosPerdidos: dado.porcentagem_perda_dados || 0,
                    periodo: dado.periodo || "N/A",
                    valor: dado.valor || 0,
                });
            } else {
                res.status(404).json({ mensagem: "Nenhum dado encontrado para o indicador especificado." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar dados em tempo real:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao processar a requisição." });
        });
}

/**
 * Buscar vulnerabilidades de um servidor.
 */
function buscarVulnerabilidades(req, res) {
    const servidor = req.query.idServidor;

    if (!servidor) {
        return res.status(400).json({ erro: "O ID do servidor está indefinido!" });
    }

    segurancaModel.buscarVulnerabilidadeServidor(servidor)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensagem: "Nenhuma vulnerabilidade encontrada para o servidor." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar vulnerabilidades do servidor:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao processar a requisição." });
        });
}



module.exports = {
    listarServidores,
    buscarIndicadores,
    buscarIndicadoresGrafico,
    buscarDadosTempoReal,
    buscarVulnerabilidades
};
