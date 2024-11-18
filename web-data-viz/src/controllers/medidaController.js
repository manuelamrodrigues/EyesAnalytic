var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {
    const limite_linhas = 7;
    const { idMaquina, componente } = req.query;

    if (!idMaquina || !componente) {
        return res.status(400).json({ error: "Parâmetros idMaquina e componente são obrigatórios." });
    }

    console.log(`Recuperando as últimas ${limite_linhas} medidas de ${componente} para a máquina ${idMaquina}`);

    medidaModel.buscarMediasHistoricoComponentes(idMaquina, componente, limite_linhas)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar as últimas medidas:", erro.sqlMessage || erro);
            res.status(500).json({ error: erro.sqlMessage || "Erro ao buscar as últimas medidas" });
        });
}

function buscarMedidasEmHistorico(req, res) {
    const { idMaquina, componente, periodo } = req.query;

    if (!idMaquina || !componente || !periodo) {
        return res.status(400).json({ error: "Parâmetros idMaquina, componente e período são obrigatórios." });
    }

    console.log(`Recuperando histórico de medidas de ${componente} para a máquina ${idMaquina} no período ${periodo}`);

    medidaModel.buscarMedidasHistorico(idMaquina, componente, periodo)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar medidas em histórico:", erro.sqlMessage || erro);
            res.status(500).json({ error: erro.sqlMessage || "Erro ao buscar medidas em histórico" });
        });
}

function obterIndicadores(req, res) {
    let dados = {};

    console.log("Iniciando a recuperação dos indicadores gerais do sistema.");

    medidaModel.buscarQuantidadeMaquinas()
        .then((result) => {
            dados.quantidadeMaquinas = result[0]?.quantidade || 0;
            return medidaModel.buscarMaquinasConectadas();
        })
        .then((result) => {
            dados.maquinasConectadas = result[0]?.conectadas || 0;
            return medidaModel.buscarAlertasRecentes();
        })
        .then((result) => {
            dados.alertasRecentes = result[0]?.alertas || 0;
            return medidaModel.buscarMbpsUpload();
        })
        .then((result) => {
            dados.upload = result[0]?.upload || 0;
            return medidaModel.buscarMbpsDownload();
        })
        .then((result) => {
            dados.download = result[0]?.download || 0;

            if (req.accepts('html')) {
                res.render("indicadores", { indicadores: dados });
            } else {
                res.status(200).json(dados);
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter indicadores:", erro.sqlMessage || erro);
            res.status(500).json({ error: erro.sqlMessage || "Erro ao obter indicadores" });
        });
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmHistorico,
    obterIndicadores
};