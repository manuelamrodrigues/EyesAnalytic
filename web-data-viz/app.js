// var ambiente_processo = 'producao';
var ambiente_processo = 'producao';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var aquariosRouter = require("./src/routes/aquarios");
var empresasRouter = require("./src/routes/empresas");
var chamadosRouter = require("./src/routes/chamados");
var tipoRouter = require("./src/routes/tipo");
var urgenciaRouter = require("./src/routes/urgencias")
var servidorRouter = require("./src/routes/servidor")
var capturaRouter = require("./src/routes/capturas")
var metricaRouter = require("./src/routes/metricas")
var individualRouter = require("./src/routes/individual")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter);
app.use("/chamados", chamadosRouter);
app.use("/tipo", tipoRouter);
app.use("/urgencias", urgenciaRouter)
app.use("/servidor", servidorRouter)
app.use("/capturas",capturaRouter)
app.use("/metricas", metricaRouter)
app.use("/individual", individualRouter)



app.listen(PORTA_APP, function () {
    console.log(`
                                                 
 _____             _____         _     _   _     
|   __|_ _ ___ ___|  _  |___ ___| |_ _| |_|_|___ 
|   __| | | -_|_ -|     |   | .'| | | |  _| |  _|
|_____|_  |___|___|__|__|_|_|__,|_|_  |_| |_|___|
      |___|                       |___|          
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
