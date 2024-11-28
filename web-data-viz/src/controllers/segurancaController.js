const segurancaModel = require("../models/segurancaModel");

/**
 * Listar servidores ativos.
 */
function listarServidores(req, res) {
    // Recuperando o fkEmpresa da sessão ou dos parâmetros da requisição
    const fkEmpresa = req.session?.fkEmpresa || req.query.fkEmpresa || req.body.fkEmpresa;

    if (!fkEmpresa) {
        return res.status(400).send("O identificador da empresa (fkEmpresa) é obrigatório.");
    }

    // Consultando os servidores associados à empresa
    segurancaModel.listarServidoresPorEmpresa(fkEmpresa)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).send("Nenhum servidor encontrado para esta empresa.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao listar servidores:", erro);
            res.status(500).send("Erro ao listar servidores. Por favor, tente novamente mais tarde.");
        });
}



/**
 * Buscar dados de desempenho de um servidor.
 */
function buscarIndicadores(req, res) {
    const servidor = req.query.idServidor;

    if (!servidor) {
        res.status(400).send("O ID do servidor está indefinido!");
        return;
    }

    segurancaModel.buscarDesempenhoServidor(servidor)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).send("Nenhum dado de desempenho encontrado para o servidor.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar desempenho do servidor: ", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro interno ao processar a requisição." });
        });
}

/**
 * Buscar dados de um gráfico com base no indicador selecionado.
 */
function buscarIndicadoresGrafico(req, res) {
    const servidor = req.query.idServidor;
    const indicador = req.query.indicador;

    if (!servidor || !indicador) {
        res.status(400).send("ID do servidor ou nome do indicador está indefinido!");
        return;
    }

    segurancaModel.buscarIndicadoresGrafico(servidor, indicador)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).send("Nenhum dado encontrado para o indicador especificado.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar indicadores para gráfico: ", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro interno ao processar a requisição." });
        });
}

/**
 * Buscar dados em tempo real de um indicador específico.
 */

function buscarDadosTempoReal(req, res) {
    const { idServidor, indicador } = req.query;
    

    // Verifica se os parâmetros estão definidos
    if (!idServidor || !indicador) {
        return res.status(400).json({ erro: "ID do servidor ou indicador não foram fornecidos." });
    }

    console.log(`Buscando dados em tempo real para o servidor: ${idServidor}, indicador: ${indicador}`);

    segurancaModel.buscarDadosTempoReal(idServidor, indicador)
        .then(resultado => {
            if (resultado.length > 0) {
                const dado = resultado[0];

                // Monta o objeto esperado pelo frontend
                const resposta = {
                    servidor: dado.nomeServidor || "N/A",
                    vulnerabilidade: dado.vulnerabilidade || "N/A",
                    dados_perdidos: dado.porcentagem_perda_dados || "N/A",
                    periodo: dado.periodo || "N/A", // Exemplo: data ou período do dado capturado
                    valor: dado.valor || 0,        // Valor do indicador (por exemplo, percentual)
                };

                res.status(200).json(resposta);
            } else {
                res.status(404).json({ erro: `Nenhum dado encontrado para o indicador "${indicador}".` });
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar dados em tempo real:", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro interno ao processar a requisição." });
        });
}



/**
 * Buscar vulnerabilidades de um servidor.
 */
function buscarVulnerabilidades(req, res) {
    const servidor = req.query.idServidor;

    if (!servidor) {
        res.status(400).send("O ID do servidor está indefinido!");
        return;
    }

    segurancaModel.buscarVulnerabilidadeServidor(servidor) // Corrigir chamada do método
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).send("Nenhuma vulnerabilidade encontrada para o servidor.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar vulnerabilidades do servidor: ", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro interno ao processar a requisição." });
        });
}

module.exports = {
    listarServidores,
    buscarIndicadores,
    buscarIndicadoresGrafico,
    buscarDadosTempoReal,
    buscarVulnerabilidades
};
