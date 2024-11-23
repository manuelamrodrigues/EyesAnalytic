var database = require("../database/config");

function listarCapturas(idEmpresa) {
    const instrucao = `
        SELECT * FROM alertas_detalhados WHERE empresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function coletarRegrecaoConexao(idEmpresa){
    const instrucao = `
        SELECT minuto, conexoes_ativas, uso_cpu, uso_ram FROM conexao_regressao WHERE idEmpresa = ${idEmpresa};
    `
    console.log(instrucao)
    return database.executar(instrucao)
}

module.exports = { 
    listarCapturas,
    coletarRegrecaoConexao
};

