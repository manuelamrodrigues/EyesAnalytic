var database = require("../database/config");

function listarCapturas(idEmpresa) {
    const instrucao = `
        SELECT * FROM alertas_detalhados WHERE empresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = { 
    listarCapturas
};

