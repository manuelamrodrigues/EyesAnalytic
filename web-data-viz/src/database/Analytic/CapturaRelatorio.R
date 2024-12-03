library(DBI)
library(RMySQL)

conexao <- dbConnect(RMySQL::MySQL(),
                     dbname = "eyesAnalytic",
                     host = "localhost",
                     port = 3306,
                     user = "Gustavo",
                     password = "sptech"
                     )
tabelas <- dbListTables(conexao)
print(tabelas)

for(tabela in tabelas){
  print(tabela)
}



tabelas <- dbListTables(conexao)
print(tabelas)

dbGetQuery(conexao, "DESCRIBE dado_capturado;")

dados <- dbReadTable(conexao, "dado_capturado")
print(head(dados))

#2.	Uso de Recurso
#============================================

library(ggplot2)

query_dados <- paste("
SELECT 
    fkRecurso,
    DATE(dtHora) AS data,
    AVG(registro) AS media_uso,
    MAX(registro) AS pico_uso
FROM 
    dado_capturado
WHERE 
    fkRecurso IN (1, 2)  -- Substituir 1 e 2 pelos IDs correspondentes a CPU e RAM
GROUP BY 
    fkRecurso, DATE(dtHora)
ORDER BY 
    data ASC;

                   ")

dados_uso <- dbGetQuery(conexao,query_dados)

# Gráfico de dispersão para uso de CPU e RAM ao longo do tempo
ggplot(dados_uso, aes(x = data, y = media_uso, color = as.factor(fkRecurso))) +
  geom_point(size = 3, alpha = 0.7) +  # Pontos para dispersão
  labs(
    title = "Dispersão do Uso de CPU e RAM ao longo do tempo",
    x = "Data",
    y = "Uso Médio",
    color = "Recurso"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  # Inclina as datas para melhor visualização

query_comparativo <- paste("
                           SELECT 
    fkMaquina,
    fkRecurso,
    AVG(registro) AS media_uso
FROM 
    dado_capturado
WHERE 
    fkRecurso IN (1, 2)  -- Substituir 1 e 2 pelos IDs correspondentes a CPU e RAM
GROUP BY 
    fkMaquina, fkRecurso
ORDER BY 
    media_uso DESC;

                           ")
dados_comparativo <- dbGetQuery(conexao, query_comparativo)


ggplot(dados_comparativo, aes(x = reorder(as.factor(fkMaquina), -media_uso), y = media_uso, fill = as.factor(fkRecurso))) +
  geom_bar(stat = "identity", position = "dodge") +
  labs(
    title = "Comparativo de Uso de CPU e RAM por Máquina",
    x = "Máquina",
    y = "Média de Uso",
    fill = "Recurso"
  ) +
  theme_minimal()
# 3.	Análise de Rede
 # ====================================================================


query_desempenho <- paste("
SELECT 
    CONCAT(YEAR(dc.dtHora), '-B', FLOOR((MONTH(dc.dtHora) - 1) / 2) + 1) AS bimestre,
    SUM(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro ELSE 0 END) AS bytes_recebidos,
    SUM(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro ELSE 0 END) AS bytes_enviados
FROM 
    dado_capturado dc
JOIN 
    recurso r ON dc.fkRecurso = r.idRecurso
WHERE 
    r.nomeRecurso IN ('Bytes Recebidos', 'Bytes Enviados')
GROUP BY 
    bimestre
ORDER BY 
    bimestre;
")

# Executando a query
dado_desempenho <- dbGetQuery(conexao, query_desempenho) 

# Gerar gráfico de dispersão para Bytes Recebidos e Bytes Enviados por bimestre
ggplot(dado_desempenho, aes(x = bimestre)) +
  geom_line(aes(y = bytes_recebidos, color = "Bytes Recebidos"), size = 1) +
  geom_line(aes(y = bytes_enviados, color = "Bytes Enviados"), size = 1) +
  labs(
    title = "Tráfego de Rede (Bytes Recebidos e Enviados) por Bimestre",
    x = "Bimestre",
    y = "Quantidade de Bytes",
    color = "Tipo de Tráfego"
  ) +
  theme_minimal()

# Definir a query SQL
# Consulta SQL para buscar os dados de recursos de rede
query_rede <- "
SELECT
    r.nomeRecurso,  -- Nome do recurso
    dc.dtHora,      -- Data e hora do registro
    dc.registro     -- Valor do registro para o recurso
FROM
    dado_capturado dc
JOIN
    maquina_recurso mr ON dc.fkMaquina = mr.fkMaquina
JOIN
    recurso r ON dc.fkRecurso = r.idRecurso
WHERE
    r.nomeRecurso IN ('Bytes Recebidos', 'Bytes Enviados', 'Pacotes Enviados', 'Pacotes Recebidos')
ORDER BY
    dc.dtHora;
"

# Executar a query e carregar os dados
dado_rede <- dbGetQuery(conexao, query_rede)

# Garantir que a variável 'dtHora' esteja no formato de data e hora
dado_rede$dtHora <- as.POSIXct(dado_rede$dtHora, format = "%Y-%m-%d %H:%M:%S")

# Agrupar os dados por ano e mês
dado_rede$mes <- format(dado_rede$dtHora, "%Y-%m")  # Ano-Mês

# Agregar os dados por mês e nome do recurso
dado_rede_agg_mes <- aggregate(registro ~ mes + nomeRecurso, data = dado_rede, FUN = mean)

# Dividir os dados entre Download (Bytes Recebidos) e Upload (Bytes Enviados)
dado_rede_download <- dado_rede_agg_mes[dado_rede_agg_mes$nomeRecurso == "Bytes Recebidos", ]
dado_rede_upload <- dado_rede_agg_mes[dado_rede_agg_mes$nomeRecurso == "Bytes Enviados", ]
dado_rede_pacotes_recebidos <- dado_rede_agg_mes[dado_rede_agg_mes$nomeRecurso == "Pacotes Recebidos", ]
dado_rede_pacotes_enviados <- dado_rede_agg_mes[dado_rede_agg_mes$nomeRecurso == "Pacotes Enviados", ]

# Calcular Tamanho Médio de Pacotes
tamanho_pacote_recebido <- dado_rede_download$registro / dado_rede_pacotes_recebidos$registro
tamanho_pacote_enviado <- dado_rede_upload$registro / dado_rede_pacotes_enviados$registro

# Combinar todos os dados em um dataframe
dados_final <- data.frame(
  mes = dado_rede_download$mes,
  download_medio = dado_rede_download$registro,
  upload_medio = dado_rede_upload$registro,
  tamanho_pacote_recebido = tamanho_pacote_recebido,
  tamanho_pacote_enviado = tamanho_pacote_enviado
)



# Carregar a biblioteca necessária
library(ggplot2)


# Gráfico de linha para visualização
ggplot(dados_final, aes(x = mes)) +
  geom_line(aes(y = download_medio, color = "Download Médio", group = 1), size = 1) +
  geom_line(aes(y = upload_medio, color = "Upload Médio", group = 1), size = 1) +
  geom_line(aes(y = tamanho_pacote_recebido, color = "Tamanho Médio Pacote Recebido", group = 1), size = 1) +
  geom_line(aes(y = tamanho_pacote_enviado, color = "Tamanho Médio Pacote Enviado", group = 1), size = 1) +
  labs(
    title = "Monitoramento de Recursos de Rede - Média de Download, Upload e Tamanho de Pacotes",
    x = "Mês",
    y = "Valor Médio"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
  scale_color_manual(values = c("Download Médio" = "blue", "Upload Médio" = "red", 
                                "Tamanho Médio Pacote Recebido" = "green", "Tamanho Médio Pacote Enviado" = "purple"))

# Calcular a média de download e upload em Mb
media_download_mb <- mean(dados_final$download_medio, na.rm = TRUE) / 1024 / 1024  # Convertendo para MB
media_upload_mb <- mean(dados_final$upload_medio, na.rm = TRUE) / 1024 / 1024  # Convertendo para MB

# Calcular o tamanho médio dos pacotes em Kb
media_tamanho_pacote_kb <- mean(c(dados_final$tamanho_pacote_recebido, dados_final$tamanho_pacote_enviado), na.rm = TRUE) / 1024  # Convertendo para Kb

# Exibir os resultados no formato solicitado
cat(sprintf("Média de Download: %.2f Mb\n", media_download_mb))
cat(sprintf("Média de Upload: %.2f Mb\n", media_upload_mb))
cat(sprintf("Tamanho médio de pacotes: %.10f Kb\n", media_tamanho_pacote_kb))

#4.	Análise de Segurança
#=========================================

query_exce <- paste("
                      SELECT 
    CONCAT(YEAR(dc.dtHora), '-B', FLOOR((MONTH(dc.dtHora) - 1) / 2) + 1) AS bimestre,
    r.nomeRecurso,
    AVG(dc.registro) AS media_uso,
    MAX(dc.registro) AS pico_uso
FROM 
    dado_capturado dc
JOIN 
    recurso r ON dc.fkRecurso = r.idRecurso
WHERE 
    r.nomeRecurso IN ('CPU', 'RAM')
GROUP BY 
    bimestre, r.nomeRecurso
HAVING 
    pico_uso >  40
ORDER BY 
    bimestre;")

dados_excessivos <- dbGetQuery(conexao, query_exce)

ggplot(dados_excessivos, aes(x = bimestre, y = pico_uso, fill = nomeRecurso)) +
  geom_bar(stat = "identity", position = "dodge") +  # "dodge" separa as barras por recurso
  labs(
    title = "Uso Excessivo de CPU e RAM por Bimestre",
    x = "Bimestre",
    y = "Pico de Uso",
    fill = "Recurso"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))


query_periodo_carga <- paste("
                             SELECT 
    d.dtHora,
    m.nomeMaquina,
    r.nomeRecurso,
    d.registro AS valorRegistrado,
    COUNT(a.idAlerta) AS totalAlertas
FROM 
    dado_capturado d
LEFT JOIN 
    alerta a ON d.idDadoCapturado = a.fkDadoCapturado
JOIN 
    maquina m ON d.fkMaquina = m.idMaquina
JOIN 
    recurso r ON d.fkRecurso = r.idRecurso
WHERE 
    r.nomeRecurso IN ('CPU', 'RAM')
    AND d.registro > 40  -- Período de sobrecarga
GROUP BY 
    d.dtHora, m.nomeMaquina, r.nomeRecurso, d.registro
ORDER BY 
    d.dtHora DESC;

  ")

# Carregar dados da query
dados_alertas <- dbGetQuery(conexao, query_periodo_carga)

# Gráfico de linha com pontos representando alertas
library(ggplot2)

ggplot(dados_alertas, aes(x = as.POSIXct(dtHora), y = valorRegistrado, color = nomeRecurso)) +
  geom_line(size = 1) +  # Linhas para CPU e RAM
  geom_point(aes(size = totalAlertas), alpha = 0.2) +  # Alertas como pontos
  labs(
    title = "Alertas de Segurança durante Períodos de Uso Excessivo",
    x = "Data e Hora",
    y = "Valor Registrado (CPU e RAM)",
    color = "Recurso",
    size = "Total de Alertas"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

#alertas
#==============================================

query_prioridade_alertas<- paste("
SELECT 
    d.dtHora,
    m.nomeMaquina,
    r.nomeRecurso,
    d.registro AS valorRegistrado,
    CASE
        WHEN d.registro > 90 THEN 'Alto'
        WHEN d.registro BETWEEN 70 AND 90 THEN 'Médio'
        ELSE 'Baixo'
    END AS gravidade,
    COUNT(a.idAlerta) AS totalAlertas
FROM 
    dado_capturado d
LEFT JOIN 
    alerta a ON d.idDadoCapturado = a.fkDadoCapturado
JOIN 
    maquina m ON d.fkMaquina = m.idMaquina
JOIN 
    recurso r ON d.fkRecurso = r.idRecurso
WHERE 
    r.nomeRecurso IN ('CPU', 'RAM', 'Bytes Recebidos', 'Bytes Enviados', 
                      'Pacotes Recebidos', 'Pacotes Enviados', 'Latência', 
                      'Conexões Ativas')
    AND d.registro > 40  -- Apenas períodos de sobrecarga
GROUP BY 
    d.dtHora, m.nomeMaquina, r.nomeRecurso, d.registro, gravidade
ORDER BY 
    gravidade DESC, d.dtHora DESC;


                                 ")

# Carregar os dados
dados_priorizados <- dbGetQuery(conexao, query_prioridade_alertas)

# Garantir que a gravidade seja um fator ordenado
dados_priorizados$gravidade <- factor(dados_priorizados$gravidade, 
                                      levels = c("Baixo", "Médio", "Alto"))

# Criar o gráfico
library(ggplot2)

ggplot(dados_priorizados, aes(x = gravidade, fill = nomeRecurso)) +
  geom_bar(stat = "count", position = "dodge") +
  labs(
    title = "Priorização de Alertas por Gravidade",
    x = "Gravidade do Alerta",
    y = "Quantidade de Alertas",
    fill = "Recurso"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

ggplot(dados_priorizados, aes(x = gravidade, fill = gravidade)) +
  geom_bar(stat = "count", position = "dodge") +
  labs(
    title = "Priorização de Alertas por Gravidade",
    x = "Gravidade do Alerta",
    y = "Quantidade de Alertas",
    fill = "Gravidade"
  ) +
  scale_fill_manual(values = c("Baixo" = "green", "Médio" = "yellow", "Alto" = "red")) +  # Cores diferenciadas
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))


# Obter os dados do ranking
query_ranking <- paste("
SELECT 
    r.nomeRecurso AS componente,
    COUNT(a.idAlerta) AS totalAlertas
FROM 
    alerta a
JOIN 
    dado_capturado d ON a.fkDadoCapturado = d.idDadoCapturado
JOIN 
    recurso r ON d.fkRecurso = r.idRecurso
GROUP BY 
    r.nomeRecurso
ORDER BY 
    totalAlertas DESC;
")

ranking_alertas <- dbGetQuery(conexao, query_ranking)

# Criar um gráfico de barras para o ranking
library(ggplot2)

ggplot(ranking_alertas, aes(x = reorder(componente, -totalAlertas), y = totalAlertas, fill = componente)) +
  geom_bar(stat = "identity") +
  labs(
    title = "Ranking de Componentes com Mais Alertas",
    x = "Componente",
    y = "Total de Alertas",
    fill = "Componente"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))



# Obter os dados do ranking
# Obter os dados do ranking
query_ranking <- paste("
SELECT 
    r.nomeRecurso AS componente,
    COUNT(a.idAlerta) AS totalAlertas
FROM 
    alerta a
JOIN 
    dado_capturado d ON a.fkDadoCapturado = d.idDadoCapturado
JOIN 
    recurso r ON d.fkRecurso = r.idRecurso
GROUP BY 
    r.nomeRecurso
ORDER BY 
    totalAlertas DESC;
")

# Carregar os dados
ranking_alertas <- dbGetQuery(conexao, query_ranking)

# Adicionar a coluna de posição (ranking)
ranking_alertas$Posicao <- seq_len(nrow(ranking_alertas))

# Exibir a tabela formatada no console
library(knitr)
kable(ranking_alertas, col.names = c("Componente", "Total de Alertas", "Posição"), align = "c", caption = "Ranking de Componentes por Total de Alertas")
print(ranking_alertas)

#conclusão
#===================================================

# Carregar pacotes necessários
library(dplyr)

# Exemplo de consulta SQL (substitua pela sua consulta real)
query_conc <- "
  SELECT 
    a.idAlerta,
    r.nomeRecurso,
    d.registro AS valorRegistrado,
    d.dtHora,
    m.nomeMaquina,
    e.idEmpresa
  FROM 
    alerta a
  JOIN dado_capturado d ON a.fkDadoCapturado = d.idDadoCapturado
  JOIN maquina m ON d.fkMaquina = m.idMaquina
  JOIN recurso r ON d.fkRecurso = r.idRecurso
  JOIN empresa e ON m.fkEmpresa = e.idEmpresa
  WHERE r.nomeRecurso IN ('CPU', 'RAM')
  AND d.registro > 40
  ORDER BY d.dtHora DESC
"

# Supondo que dados estejam carregados em 'dados_alertas'
dados_conc <- dbGetQuery(conexao, query_conc)

# Agrupar por máquina e recurso para ver a quantidade de alertas
vulnerabilidades <- dados_conc %>%
  group_by(nomeMaquina, nomeRecurso) %>%
  summarise(total_alertas = n()) %>%
  arrange(desc(total_alertas))

# Exibir as máquinas e recursos mais vulneráveis
head(vulnerabilidades)


# Calcular o uso médio de recursos (CPU, RAM)
otimizacao <- dados_conc %>%
  group_by(nomeMaquina, nomeRecurso) %>%
  summarise(media_uso = mean(valorRegistrado, na.rm = TRUE)) %>%
  arrange(desc(media_uso))

# Identificar máquinas com maior uso de CPU/RAM
maquinas_criticas <- otimizacao %>%
  filter(media_uso > 70)  # Exemplo de limite para "uso excessivo"

# Exibir as máquinas que precisam de otimização
head(maquinas_criticas)


# Instalar e carregar pacotes
library(zoo)

# Adicionar uma coluna de média móvel para detectar tendências
dados_alertas <- dados_alertas %>%
  arrange(dtHora) %>%
  group_by(nomeMaquina, nomeRecurso) %>%
  mutate(media_movel = rollmean(valorRegistrado, k = 5, fill = NA))  # Média móvel de 5 períodos

# Identificar quando o uso excede o limite da média móvel
alertas_antecipados <- dados_alertas %>%
  filter(media_movel > 70)  # Exemplo de limite crítico

# Exibir alertas que indicam problemas antecipados
head(alertas_antecipados)
