var medidaModel = require("../models/medidaModel");

function buscarIndicadores(req, res) {
    let dados = {};

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
            res.status(200).json(dados);
        })
        .catch((erro) => {
            console.error("Erro ao buscar indicadores:", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao buscar indicadores" });
        });
}






function buscarMediasHistoricoComponentes(req, res) {
    const intervaloTempo = req.params.intervalo || "semanal";

    // Mapear opções para o intervalo SQL adequado
    const mapeamentoIntervalo = {
        semanal: "WEEK",
        mensal: "MONTH",
        bimestral: "QUARTER", // Utilizando QUARTER como aproximação
        semestral: "YEAR" // Utilizando YEAR e ajustando limite no SQL
    };

    const intervaloSQL = mapeamentoIntervalo[intervaloTempo];
    if (!intervaloSQL) {
        return res.status(400).json({ erro: "Intervalo inválido. Use: semanal, mensal, bimestral ou semestral." });
    }

    console.log(`Buscando médias históricas com intervalo: ${intervaloTempo} (${intervaloSQL})`);

    medidaModel.buscarMediasHistoricoComponentes(intervaloSQL)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para o intervalo fornecido.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar médias históricas dos componentes:", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao buscar médias históricas" });
        });
}
module.exports = {
    buscarMediasHistoricoComponentes,
    buscarIndicadores
    
};