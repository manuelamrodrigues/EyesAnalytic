var individualModel = require("../models/individualModel");

function serverMax(req, res) {
    const fkRecurso = req.params.fkRecurso; // Obtém o fkRecurso diretamente da rota
    const idEmpresa = req.query.idEmpresa; // Obtém o idEmpresa dos parâmetros da query

    if (!idEmpresa) {
        return res.status(400).json({ error: "ID da empresa não fornecido." });
    }

    // Chama o método do modelo individualModel passando fkRecurso e idEmpresa
    individualModel.serverMax(fkRecurso, idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma captura encontrada!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao listar capturas:", erro);
            res.status(500).json({ error: erro.sqlMessage || erro.message });
        });
}

// Função no controller que chama o modelo e retorna os dados ao frontend
function ranking(req, res) {
    const idEmpresa = req.params.idEmpresa; // Obtém o idEmpresa dos parâmetros da URL

    if (!idEmpresa) {
        return res.status(400).json({ error: "ID da empresa não fornecido." });
    }

    individualModel.ranking(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);  // Retorna os dados como JSON
            } else {
                res.status(204).send("Nenhuma captura encontrada!");  // Caso não haja dados
            }
        })
        .catch(function (erro) {
            console.error("Erro ao listar capturas:", erro);
            res.status(500).json({ error: erro.sqlMessage || erro.message });  // Erro ao consultar o banco de dados
        });
}

function picosMensal(req, res) {
    const fkRecurso = req.params.fkRecurso; // Obtém o fkRecurso diretamente da rota
    const idEmpresa = req.query.idEmpresa; // Obtém o idEmpresa dos parâmetros da query

    if (!idEmpresa) {
        return res.status(400).json({ error: "ID da empresa não fornecido." });
    }

    individualModel.picosMensal(fkRecurso, idEmpresa)
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                res.status(200).json(resultado);  // Retorna os dados como JSON
            } else {
                res.status(204).send("Nenhuma captura encontrada!");  // Caso não haja dados
            }
        })
        .catch(function (erro) {
            console.error("Erro ao listar capturas:", erro);
            res.status(500).json({ message: "Erro ao consultar o banco de dados", error: erro.sqlMessage });  // Erro ao consultar o banco de dados
        });
}

function UsoPorHora(req, res) {
    const fkRecurso = req.params.fkRecurso; // Obtém o fkRecurso diretamente da rota
    const idEmpresa = req.query.idEmpresa; // Obtém o idEmpresa dos parâmetros da query

    if (!idEmpresa) {
        return res.status(400).json({ error: "ID da empresa não fornecido." });
    }

    individualModel.UsoPorHora(fkRecurso, idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);  // Retorna os dados como JSON
            } else {
                res.status(204).send("Nenhuma captura encontrada!");  // Caso não haja dados
            }
        })
        .catch(function (erro) {
            console.error("Erro ao listar capturas:", erro);
            res.status(500).json(erro.sqlMessage);  // Erro ao consultar o banco de dados
        });
}

module.exports = {
    serverMax,
    ranking,
    picosMensal,
    UsoPorHora
};



     
