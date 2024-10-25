var database = require("../database/config")

function listar(){
    var instrucaoSql= "SELECT * FROM urgencia"
    return database.executar(instrucaoSql)
}

module.exports={
    listar
}