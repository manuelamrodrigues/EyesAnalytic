var medidaModel = require("../models/medidaModel");

function buscarIndicadores(req, res) {
    idEmpresa = req.params.idEmpresa
    let dados = {};

    medidaModel.buscarQuantidadeMaquinas(idEmpresa)
        .then((result) => {
            dados.quantidadeMaquinas = result[0]?.quantidade || 0;
            return medidaModel.buscarMaquinasConectadas(idEmpresa);
        })
        .then((result) => {
            dados.maquinasConectadas = result[0]?.conectadas || 0;
            return medidaModel.buscarAlertasRecentes(idEmpresa);
        })
        .then((result) => {
            dados.alertasRecentes = result[0]?.alertas || 0;
            return medidaModel.buscarMbpsUpload(idEmpresa);
        })
        .then((result) => {
            dados.upload = result[0]?.upload || 0;
            return medidaModel.buscarMbpsDownload(idEmpresa);
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
    const idEmpresa = req.params.idEmpresa
    const intervaloTempo = req.params.intervalo || "semanal";
    const componente = req.params.componente?.toLowerCase() || "cpu"; // Recebe o componente (cpu, ram, disco) em minúsculo por segurança

    // Mapear opções para o intervalo SQL adequado
    const mapeamentoIntervalo = {
        semanal: "WEEK",
        mensal: "MONTH",
        bimestral: "BIMONTHLY", // Corrigido para refletir um intervalo de 2 meses
        semestral: "SEMIANNUAL" // Corrigido para refletir um intervalo de 6 meses
    };

    const intervaloSQL = mapeamentoIntervalo[intervaloTempo];
    if (!intervaloSQL) {
        return res.status(400).json({ erro: "Intervalo inválido. Use: semanal, mensal, bimestral ou semestral." });
    }

    console.log(`Buscando médias históricas para ${componente} com intervalo: ${intervaloTempo} (${intervaloSQL})`);

    medidaModel.buscarMediasHistoricoComponentes(intervaloSQL, idEmpresa)
        .then((resultado) => {
            if (resultado.length > 0) {
                // Processar os dados para o formato do gráfico
                const labels = resultado.map(row => row.intervalo || row.diaSemana); // Use 'diaSemana' para intervalo semanal
                const data = resultado.map(row => {
                    switch (componente) {
                        case "cpu": return row.mediaCPU;
                        case "ram": return row.mediaRAM;
                        case "disco": return row.mediaDisco;
                        default: return 0; // Valor padrão caso o componente não seja reconhecido
                    }
                });

                res.status(200).json({ labels, data });
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