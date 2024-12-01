create database eyesAnalytic;
use eyesAnalytic;

-- Criando tabela tipo de usuario
create table tipo_usuario(
idTipoUsuario int primary key auto_increment,
tipo varchar(45)
);

-- Criando tabela componente
create table recurso(
idRecurso int primary key auto_increment,
nomeRecurso varchar(45),
unidadeMedida char(6)
);

-- Criando tabela atributo
create table atributo(
idAtributo int primary key auto_increment,
nomeAtributo varchar(225)
);

-- Criando tabela Prioridade
create table prioridade(
idPrioridade int primary key auto_increment,
nivel varchar(45)
);

-- Criando tabela empresa
create table empresa(
idEmpresa int primary key auto_increment,
codSeg char(9),
razaoSocial varchar(225),
cnpj char(14) unique
);

-- Criando tabela metrica
create table metrica(
idMetrica int primary key auto_increment,
valorMetrica float,
fkRecurso int,
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa),
foreign key(fkRecurso) references recurso(idRecurso)
);

alter table metrica
add constraint unica_metrica unique (fkRecurso, fkEmpresa);

-- Criando tabela Maquina
create table maquina(
idMaquina int primary key auto_increment,
nomeMaquina varchar(255),
situacao varchar(45),
qualidadeRede varchar(45),
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa),
fkPrioridade int,
foreign key(fkPrioridade) references prioridade(idPrioridade)
);

create table log_ip(
idIp int primary key auto_increment,
ip char(15),
fkMaquina int,
foreign key (fkMaquina) references maquina(idMaquina)
);

-- Criando tabela Usuario
create table usuario(
idUsuario int primary key auto_increment,
nome varchar(225),
email varchar(225),
senha char(8),
situacao varchar(45) default 'Ativo',
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa),
fkTipoUsuario int,
foreign key(fkTipoUsuario) references tipo_usuario(idTipoUsuario)
);

-- Criando tabela MaquinaComponente
create table maquina_recurso(
idMaquinaRecurso int auto_increment,
fkMaquina int,
foreign key(fkMaquina) references maquina(idMaquina),
fkRecurso int,
foreign key(fkRecurso) references recurso(idRecurso),
primary key(idMaquinaRecurso, fkMaquina, fkRecurso)
);

-- Criando tabela Dado
create table dado_capturado(
idDadoCapturado int auto_increment,
registro float,
dtHora datetime default CURRENT_TIMESTAMP(),
fkMaquina int,
foreign key(fkMaquina) references maquina_recurso(fkMaquina),
fkRecurso int,
foreign key(fkRecurso) references maquina_recurso(fkRecurso),
primary key( idDadoCapturado, fkMaquina, fkRecurso)
);

-- Criando tabela Alerta
create table alerta(
idAlerta int primary key auto_increment,
valorMetrica float,
fkDadoCapturado int,
foreign key (fkDadoCapturado) references dado_capturado(idDadoCapturado)
);

-- Criando tabela AtributoMaquinaComponente
create table atributo_maquina_recurso(
valor varchar(225),
fkAtributo int,
foreign key(fkAtributo) references atributo(idAtributo),
fkMaquinaRecurso int,
foreign key(fkMaquinaRecurso) references maquina_recurso(idMaquinaRecurso),
primary key(fkAtributo, fkMaquinaRecurso)
);
-- ============================================================== Inserção de dados =============================================================
select* from dado_capturado;
-- Inserindo dados na tabela TipoUsuario
insert into tipo_usuario (tipo) values
('administrador'),
('especialista');

-- Inserindo dados na tabela Empresa
insert into empresa (codSeg, razaoSocial, cnpj) values
('123456789', 'Alpha', '12345678901234'),
('987654321', 'Beta', '4321987654321');

-- Inserindo dados na tabela Recurso
insert into recurso (nomeRecurso, unidadeMedida) values
('CPU', 'PCTG'),        -- Porcentagem
('RAM', 'GB'),          -- Gigabytes
('Disco Rígido', 'GB'), -- Gigabytes
('Bytes Recebidos', 'MB'), -- Megabytes
('Bytes Enviados', 'MB'),  -- Megabytes
('Pacotes Enviados', 'UNID'), -- Unidades
('Pacotes Recebidos', 'UNID'), -- Unidades
('Conexões Ativas', 'UNID'), -- Unidades
('Latência', 'MS'),     -- Milissegundos
('Perda de Pacotes', 'PCTG');     -- porcentagem

-- Inserindo dados na tabela Atributo
insert into atributo (nomeAtributo) values
('Fabricante'),
('Modelo'),
('Velocidade'),
('Núcleos'),
('Threads'),
('Capacidade');

-- Inserindo dados na tabela Prioridade
insert into prioridade (nivel) values
('Alta'),
('Média'),
('Baixa');

-- Inserindo dados na tabela Maquina
insert into maquina (nomeMaquina, situacao, fkEmpresa, fkPrioridade) values
('ServidorAWS', 'Ativo', 1, 1),
('ServidorIBM','Ativo', 1, 2),
('ServidorOracle', 'Ativo', 1, 3),
('ServidorAzure', 'Inativo', 2, 3);

-- Inserindo dados na tabela Usuario
insert into usuario (idUsuario, nome, email, senha, situacao, fkEmpresa, fkTipoUsuario) values
(default, 'João da Silva', 'joao.silva@email.com', 'senha123', 'Ativo', 1, 1),
(default, 'Maria Oliveira', 'maria.oliveira@email.com', 'senha123', 'Ativo', 2, 2),
(default, 'Pedro Souza', 'pedro.souza@email.com', 'senha123', 'Ativo', 1, 2);

-- Adicionando recursos para as máquinas
INSERT INTO maquina_recurso (fkMaquina, fkRecurso) VALUES
(1, 9), -- Máquina 1 com Latência
(1, 10), -- Máquina 1 com perdapacotes
(1, 4), -- Máquina 1 com Bytes Recebidos
(1, 5), -- Máquina 1 com Bytes Enviados
(1, 6), -- Máquina 1 com Pacotes Enviados
(1, 7), -- Máquina 1 com Pacotes Recebidos
(2, 9), -- Máquina 2 com Latência
(2, 10), -- Máquina 2 com perdapacotes
(2, 4), -- Máquina 2 com Bytes Recebidos
(2, 5), -- Máquina 2 com Bytes Enviados
(2, 6), -- Máquina 2 com Pacotes Enviados
(2, 7), -- Máquina 2 com Pacotes Recebidos
(3, 9), -- Máquina 2 com Latência
(3, 10), -- Máquina 1 com perdapacotes
(3, 4), -- Máquina 2 com Bytes Recebidos
(3, 5), -- Máquina 2 com Bytes Enviados
(3, 6),
(3, 7); -- Máquina 2 com Pacotes Recebidos

insert into metrica (valorMetrica, fkRecurso, fkEmpresa) VALUES
(90, 2, 2);

-- Inserindo dados na tabela Dado
-- Inserindo dados na tabela `dado_capturado` para máquina 1
-- Máquina 1 (Estável)
	INSERT INTO dado_capturado (registro, dtHora, fkMaquina, fkRecurso) VALUES
	(2500, NOW(), 1, 4),  -- Bytes Recebidos (Upload)
	(2000, NOW(), 1, 5),  -- Bytes Enviados (Download)
	(20, NOW(), 1, 9),    -- Latência
	(0, NOW(), 1, 10),    -- Latência
	(200, NOW(), 1, 6),   -- Pacotes Enviados
	(195, NOW(), 1, 7);   -- Pacotes Recebidos (Perda de pacotes = 2.5%)

	-- Máquina 2 (Média)
	INSERT INTO dado_capturado (registro, dtHora, fkMaquina, fkRecurso) VALUES
	(1500, NOW(), 2, 4),  -- Bytes Recebidos (Upload)
	(1200, NOW(), 2, 5),  -- Bytes Enviados (Download)
	(60, NOW(), 2, 9),    -- Latência
	(3, NOW(), 2, 10),    -- Latência
	(290, NOW(), 2, 6),   -- Pacotes Enviados
	(280, NOW(), 2, 7);   -- Pacotes Recebidos (Perda de pacotes = 3.4%)

	-- Máquina 3 (Baixa)
	INSERT INTO dado_capturado (registro, dtHora, fkMaquina, fkRecurso) VALUES
	(500, NOW(), 3, 4),  -- Bytes Recebidos (Upload)
	(300, NOW(), 3, 5),  -- Bytes Enviados (Download)
	(100, NOW(), 3, 9),  -- Latência
	(5, NOW(), 3, 10),  -- Latência
	(400, NOW(), 3, 6),  -- Pacotes Enviados
	(300, NOW(), 3, 7);  -- Pacotes Recebidos (Perda de pacotes = 25%)


-- Inserindo dados na tabela Atributo Máquina Recurso
INSERT INTO atributo_maquina_recurso (valor, fkAtributo, fkMaquinaRecurso) VALUES
('AMD', 1, 3),
('Samsung', 1, 2),
('lala', 1, 1),
('3000 GHZ', 2, 1),
('16', 5, 1), -- maquina desativada
-- maquina 2
('Intel', 1, 4),      -- Fabricante da CPU da máquina 2
('Xeon', 2, 4),       -- Modelo da CPU da máquina 2
('3.0 GHz', 3, 4),    -- Velocidade da CPU da máquina 2
('8', 4, 4),          -- Núcleos da CPU da máquina 2
('16', 5, 4),         -- Threads da CPU da máquina 2
('512 GB', 6, 5),     -- Capacidade do Disco da máquina 2
('32 GB', 6, 4);      -- Capacidade de RAM da máquina 2

-- ======================================================= VIEW =====================================================================================

-- VIEW LISTAGEM DE METRICAS DE ACORDO COM OS RECURSOS

CREATE VIEW estado_maquinas AS
SELECT
    m.nomeMaquina AS Servidor,
    MAX(CASE WHEN dc.fkRecurso = 1 THEN dc.registro ELSE NULL END) AS CPU,
    MAX(CASE WHEN dc.fkRecurso = 2 THEN dc.registro ELSE NULL END) AS RAM
FROM
    dado_capturado dc
JOIN
    maquina m ON dc.fkMaquina = m.idMaquina
GROUP BY
    m.nomeMaquina
LIMIT 5;

CREATE VIEW metrica_view AS
SELECT
    m.idMetrica,
    m.valorMetrica,
    r.idRecurso,
    r.nomeRecurso,      -- Nome ou descrição do recurso
    e.idEmpresa       -- Nome ou descrição da empresa
FROM metrica m
JOIN recurso r ON m.fkRecurso = r.idRecurso
JOIN empresa e ON m.fkEmpresa = e.idEmpresa;

CREATE VIEW buscarUsuario AS
SELECT u.idUsuario, u.nome, u.email, u.senha, u.situacao,
u.fkEmpresa, t.tipo
FROM usuario as u
JOIN tipo_usuario as t ON u.fkTipoUsuario = t.idTipoUsuario;

-- VIEW LISTAGEM DE MAQUINAS ESPECIFICAS
CREATE VIEW view_maquina_especifica AS
SELECT DISTINCT
    m.idMaquina as idMaquina,
    m.nomeMaquina as nomeMaquina,
    m.situacao as situacao,
    e.idEmpresa as idEmpresa,
    e.razaoSocial as nomeEmpresa,
    p.nivel as nivelPrioridade,
    r.nomeRecurso as nomeRecurso,
    a.nomeAtributo as nomeAtributo,
    amr.valor as valorAtributo
FROM atributo_maquina_recurso as amr
JOIN atributo as a ON amr.fkAtributo = a.idAtributo
JOIN maquina_recurso as mr ON amr.fkMaquinaRecurso = mr.idMaquinaRecurso
JOIN maquina as m ON mr.fkMaquina = m.idMaquina
JOIN empresa as e ON m.fkEmpresa = e.idEmpresa
JOIN prioridade as p ON m.fkPrioridade = p.idPrioridade
JOIN recurso as r ON mr.fkRecurso = r.idRecurso
WHERE r.nomeRecurso IN ('CPU', 'RAM', 'Disco Rígido');

-- VIEW DE LISTAGEM GERAL DE MAQUINAS
CREATE VIEW view_listagem_maquinas AS
SELECT
    m.idMaquina AS idMaquina,
    m.nomeMaquina AS nomeMaquina,
    p.idPrioridade AS prioridadeMaquina,
    m.situacao AS situacao,
    m.fkEmpresa AS fkEmpresa,
    cpu.registro AS CPU,
    ram.registro AS Memoria,
    disco.registro AS Disco
FROM maquina AS m
JOIN prioridade AS p ON m.fkPrioridade = p.idPrioridade
LEFT JOIN (
    SELECT dc.fkMaquina, dc.registro,
           ROW_NUMBER() OVER (PARTITION BY dc.fkMaquina ORDER BY dc.dtHora DESC) AS row_num
    FROM dado_capturado AS dc
    JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
    WHERE r.nomeRecurso = 'CPU'
) AS cpu ON m.idMaquina = cpu.fkMaquina AND cpu.row_num = 1
LEFT JOIN (
    SELECT dc.fkMaquina, dc.registro,
           ROW_NUMBER() OVER (PARTITION BY dc.fkMaquina ORDER BY dc.dtHora DESC) AS row_num
    FROM dado_capturado AS dc
    JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
    WHERE r.nomeRecurso = 'RAM'
) AS ram ON m.idMaquina = ram.fkMaquina AND ram.row_num = 1
LEFT JOIN (
    SELECT dc.fkMaquina, dc.registro,
           ROW_NUMBER() OVER (PARTITION BY dc.fkMaquina ORDER BY dc.dtHora DESC) AS row_num
    FROM dado_capturado AS dc
    JOIN recurso AS r ON dc.fkRecurso = r.idRecurso
    WHERE r.nomeRecurso = 'Disco Rígido'
) AS disco ON m.idMaquina = disco.fkMaquina AND disco.row_num = 1;

    -- VIEW para os alertas dinamicos
CREATE OR REPLACE VIEW alertas_detalhados AS
SELECT
    a.idAlerta,
    a.valorMetrica AS limiteMetrica,
    d.registro AS valorRegistrado,
    d.dtHora,
    m.nomeMaquina,
    r.nomeRecurso,
    e.idEmpresa AS empresa
FROM alerta AS a
JOIN dado_capturado AS d ON a.fkDadoCapturado = d.idDadoCapturado
JOIN maquina AS m ON d.fkMaquina = m.idMaquina
JOIN recurso AS r ON d.fkRecurso = r.idRecurso
JOIN empresa AS e ON m.fkEmpresa = e.idEmpresa
ORDER BY d.dtHora DESC;

-- View quantidade de uso da CPU
    CREATE VIEW view_quantidade_cpu AS
SELECT fkMaquina, SUM(registro) AS total_cpu
FROM dado_capturado
GROUP BY fkMaquina
ORDER BY total_cpu DESC
LIMIT 0, 1000;

CREATE VIEW estado_maquinas AS
SELECT
    m.nomeMaquina AS Servidor,
    MAX(CASE WHEN dc.fkRecurso = 1 THEN dc.registro ELSE NULL END) AS CPU,
    MAX(CASE WHEN dc.fkRecurso = 2 THEN dc.registro ELSE NULL END) AS RAM,
    MAX(CASE WHEN dc.fkRecurso = 3 THEN dc.registro ELSE NULL END) AS Disco
FROM dado_capturado dc
JOIN maquina m ON dc.fkMaquina = m.idMaquina
GROUP BY m.nomeMaquina;

-- View para ver quanto tempo o uso de cpu de cada servidor ficou acima da métrica
CREATE OR REPLACE VIEW diferenca_horas AS
SELECT 
    COUNT(d.registro) * 5 / 60 AS total_diferenca_horas, 
    q.idMaquina, 
    q.nomeMaquina,
    m.valorMetrica
FROM 
    dado_capturado AS d
JOIN 
    view_quantidade_cpu AS q ON d.fkMaquina = q.idMaquina
JOIN 
    metrica AS m ON d.fkRecurso = m.fkRecurso
WHERE 
    d.registro > m.valorMetrica
    AND d.dtHora > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY 
    fkMaquina, q.idMaquina, q.nomeMaquina, m.valorMetrica;

-- View Regressao Linear Conexões Ativas
CREATE or replace VIEW view_regressao AS
SELECT
    e.idEmpresa,
    e.razaoSocial,
    DATE_FORMAT(dados_filtrados.dtHora, '%Y-%m-%d %H:%i:00') AS minuto,
    SUM(CASE WHEN dados_filtrados.nomeRecurso = 'Conexões Ativas' THEN dados_filtrados.registro END) AS conexoes_ativas,
    ROUND(AVG(CASE WHEN dados_filtrados.nomeRecurso = 'CPU' THEN dados_filtrados.registro END),2) AS uso_cpu,
    ROUND(AVG(CASE WHEN dados_filtrados.nomeRecurso = 'RAM' THEN dados_filtrados.registro END),2) AS uso_ram
FROM (
    SELECT
        dc.fkMaquina,
        dc.fkRecurso,
        dc.registro,
        dc.dtHora AS dtHora,
        m.fkEmpresa,
        m.nomeMaquina,
        r.nomeRecurso,
        ROW_NUMBER() OVER (
            PARTITION BY dc.fkMaquina, r.nomeRecurso, DATE_FORMAT(dc.dtHora, '%Y-%m-%d %H:%i')
            ORDER BY dc.dtHora DESC
        ) AS row_num
    FROM dado_capturado dc
    JOIN maquina m ON dc.fkMaquina = m.idMaquina
    JOIN recurso r ON dc.fkRecurso = r.idRecurso
    WHERE r.nomeRecurso IN ('Conexões Ativas', 'CPU', 'RAM')
) AS dados_filtrados
JOIN empresa e ON dados_filtrados.fkEmpresa = e.idEmpresa
WHERE dados_filtrados.row_num = 1
GROUP BY e.idEmpresa, e.razaoSocial, minuto
HAVING conexoes_ativas IS NOT NULL AND uso_cpu IS NOT NULL AND uso_ram IS NOT NULL
ORDER BY minuto DESC;

CREATE OR REPLACE VIEW view_historico_conexao_ativa AS
WITH RECURSIVE dias AS (
    -- Gera todos os dias dos últimos 365 dias
    SELECT DATE(NOW() - INTERVAL 1 YEAR) AS data
    UNION ALL
    SELECT data + INTERVAL 1 DAY
    FROM dias
    WHERE data + INTERVAL 1 DAY < DATE(NOW())
)
SELECT DATE_FORMAT(d.data, "%Y/%m/%d") AS dia,
    m.fkEmpresa,
    COALESCE(AVG(dc.registro), 0) AS media_conexoes
FROM dias d
CROSS JOIN maquina m
LEFT JOIN maquina_recurso mr ON mr.fkMaquina = m.idMaquina AND mr.fkRecurso = 8
LEFT JOIN dado_capturado dc ON dc.fkRecurso = mr.fkRecurso AND DATE(dc.dtHora) = d.data
WHERE m.fkEmpresa IS NOT NULL
GROUP BY d.data, m.fkEmpresa
ORDER BY d.data, m.fkEmpresa;

CREATE OR REPLACE VIEW view_comparar_semana AS
WITH horarios AS (
    SELECT 0 AS hora UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
    SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL
    SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL
    SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL
    SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL
    SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23
),
dados AS (
    SELECT 
        m.fkEmpresa,
        HOUR(dc.dtHora) AS hora,  -- Hora extraída
        DATE(dc.dtHora) AS data,
        dc.registro
    FROM 
        dado_capturado dc
    JOIN 
        maquina_recurso mr ON dc.fkRecurso = mr.fkRecurso
    JOIN 
        maquina m ON mr.fkMaquina = m.idMaquina
    WHERE 
        dc.fkRecurso = 8 -- Filtra apenas os dados de conexões ativas
),
combinacoes AS (
    SELECT DISTINCT
        d.fkEmpresa,
        h.hora,
        CURDATE() AS data_atual,  -- Data do dia atual
        CURDATE() - INTERVAL 7 DAY AS data_anterior  -- Data do mesmo dia na semana passada
    FROM 
        dados d
    CROSS JOIN 
        horarios h
),
atual AS (
    SELECT 
        fkEmpresa,
        HOUR(dc.dtHora) AS hora,
        ROUND(AVG(dc.registro),2) AS media_atual,
        DATE(dc.dtHora) AS data_atual
    FROM 
        dado_capturado dc
    JOIN 
        maquina_recurso mr ON dc.fkRecurso = mr.fkRecurso
    JOIN 
        maquina m ON mr.fkMaquina = m.idMaquina
    WHERE 
        dc.fkRecurso = 8
        AND DATE(dc.dtHora) = CURDATE()  -- Dia atual
    GROUP BY 
        fkEmpresa, hora, data_atual
),
anterior AS (
    SELECT 
        fkEmpresa,
        HOUR(dc.dtHora) AS hora,
        ROUND(AVG(dc.registro),2) AS media_anterior,
        DATE(dc.dtHora) AS data_anterior
    FROM 
        dado_capturado dc
    JOIN 
        maquina_recurso mr ON dc.fkRecurso = mr.fkRecurso
    JOIN 
        maquina m ON mr.fkMaquina = m.idMaquina
    WHERE 
        dc.fkRecurso = 8
        AND DATE(dc.dtHora) = CURDATE() - INTERVAL 7 DAY  -- Mesmo dia da semana passada
    GROUP BY 
        fkEmpresa, hora, data_anterior
)
SELECT 
    c.fkEmpresa,
    CASE(dayofweek(c.data_atual))
		WHEN 1 THEN 'Domingo'
        WHEN 2 THEN 'Segunda'
        WHEN 3 THEN 'Terça'
        WHEN 4 THEN 'Quarta'
        WHEN 5 THEN 'Quinta'
        WHEN 6 THEN 'Sexta'
        WHEN 7 THEN 'Sabado'
        END as dia_semana,
    DATE_FORMAT(c.data_atual, '%d/%m/%Y ') as data_atual,
    DATE_FORMAT(c.data_anterior, '%d/%m/%Y') as data_anterior,
    c.hora,
    COALESCE(a.media_atual, 0) AS media_atual,
    COALESCE(b.media_anterior, 0) AS media_anterior
FROM 
    combinacoes c
LEFT JOIN 
    atual a ON c.fkEmpresa = a.fkEmpresa AND c.hora = a.hora
LEFT JOIN 
    anterior b ON c.fkEmpresa = b.fkEmpresa AND c.hora = b.hora
ORDER BY 
    c.fkEmpresa, c.hora;
    
CREATE OR REPLACE VIEW view_quantidade_cpu AS
SELECT
m.idMaquina,
m.nomeMaquina,
m.fkEmpresa,
m.situacao,
p.nivel AS prioridade,
-- Valores dos recursos agregados para cada servidor
MAX(CASE WHEN r.nomeRecurso = 'CPU' THEN d.registro END) AS CPU,
MAX(CASE WHEN r.nomeRecurso = 'RAM' THEN d.registro END) AS RAM,
MAX(CASE WHEN r.nomeRecurso = 'Disco Rígido' THEN d.registro END) AS Disco_Rigido,
-- Soma do total de CPU
SUM(CASE WHEN r.nomeRecurso = 'CPU' THEN d.registro END) AS total_cpu
FROM dado_capturado AS d
JOIN maquina AS m ON d.fkMaquina = m.idMaquina
JOIN recurso AS r ON d.fkRecurso = r.idRecurso
JOIN prioridade AS p ON m.fkPrioridade = p.idPrioridade
GROUP BY m.idMaquina, m.nomeMaquina, m.fkEmpresa, m.situacao, p.nivel
ORDER BY CPU DESC
LIMIT 3; 

CREATE OR REPLACE VIEW diferenca_horas AS
SELECT *
FROM (
SELECT
dc.fkMaquina,
dc.fkRecurso,
m.nomeMaquina,
SUM(TIMESTAMPDIFF(HOUR,
(SELECT MAX(dc2.dtHora)
FROM dado_capturado AS dc2
WHERE dc2.fkRecurso = dc.fkRecurso
AND dc2.dtHora < dc.dtHora),
dc.dtHora)) AS diferenca_horas  -- Somando as diferenças de horas
FROM
dado_capturado AS dc
JOIN
maquina AS m ON dc.fkMaquina = m.idMaquina
WHERE
dc.fkRecurso = 1
AND dc.dtHora >= CURDATE() - INTERVAL 7 DAY  -- Filtra para os últimos 7 dias
AND TIMESTAMPDIFF(HOUR,
(SELECT MAX(dc2.dtHora)
FROM dado_capturado AS dc2
WHERE dc2.fkRecurso = dc.fkRecurso
AND dc2.dtHora < dc.dtHora),
dc.dtHora) IS NOT NULL
GROUP BY
dc.fkMaquina, dc.fkRecurso, m.nomeMaquina  -- Agrupa pelas máquinas e recursos
ORDER BY
diferenca_horas DESC
LIMIT 3
) AS top_3_diferencas;

 

CREATE OR REPLACE VIEW view_media_max_cpu AS
SELECT
m.idMaquina,
m.nomeMaquina,
m.fkEmpresa,
m.situacao,
p.nivel AS prioridade,
-- Média do uso de CPU
AVG(CASE WHEN r.nomeRecurso = 'CPU' THEN d.registro END) AS media_cpu,
-- Valor máximo do uso de CPU
MAX(CASE WHEN r.nomeRecurso = 'CPU' THEN d.registro END) AS max_cpu
FROM dado_capturado AS d
JOIN maquina AS m ON d.fkMaquina = m.idMaquina
JOIN recurso AS r ON d.fkRecurso = r.idRecurso
JOIN prioridade AS p ON m.fkPrioridade = p.idPrioridade
GROUP BY m.idMaquina, m.nomeMaquina, m.fkEmpresa, m.situacao, p.nivel;

 

SELECT registro, dtHora, fkMaquina
FROM dado_capturado
WHERE fkRecurso = 1
AND dtHora >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
ORDER BY dtHora ASC;

-- =============================================================DELIMITER==============================================================================
DELIMITER //
CREATE TRIGGER alerta_dado
AFTER INSERT ON dado_capturado
FOR EACH ROW
BEGIN
    DECLARE limite FLOAT;
    DECLARE empresa_id INT;

    SELECT m.fkEmpresa INTO empresa_id
    FROM maquina AS m
    JOIN maquina_recurso AS mr ON m.idMaquina = mr.fkMaquina
    WHERE mr.idMaquinaRecurso = NEW.fkMaquina;

    SELECT valorMetrica INTO limite
    FROM metrica
    WHERE fkRecurso = NEW.fkRecurso AND fkEmpresa = empresa_id;

    IF limite IS NOT NULL AND NEW.registro >= limite THEN
        INSERT INTO alerta(fkDadoCapturado, valorMetrica)
        VALUES(NEW.idDadoCapturado, limite);
    END IF;
END
//
DELIMITER ;

-- ================================================================= SELECTS =========================================================================
-- Para pegar todos os dados de um servidor específico, como o idMaquina = 1
SELECT * FROM view_maquina_especifica WHERE idMaquina = 1;

SELECT * FROM alertas_detalhados;
SELECT * FROM metrica;
SELECT a.valorMetrica, cp.registro, cp.dtHora, m.fkEmpresa, m.idMaquina FROM alerta as a
join dado_capturado as cp
on a.fkDadoCapturado = cp.idDadoCapturado
join maquina as m
on cp.fkMaquina = m.idMaquina;

-- views DASH DE REDES
-- select de um servidor especifico e sua qualidade de rede
SELECT idMaquina, qualidadeRede FROM maquina
WHERE idMaquina = 1  limit 1;

-- select de todos os servidores e sua qualidade de rede
CREATE VIEW view_servidores_qualidade AS
SELECT DISTINCT 
	fkEmpresa,
    idMaquina,
    nomeMaquina, 
    qualidadeRede
FROM maquina AS m
LEFT JOIN dado_capturado dc 
    ON dc.fkMaquina = m.idMaquina
WHERE fkEmpresa = 1
ORDER BY 
    CASE 
        WHEN qualidadeRede = 'Baixa' THEN 1
        WHEN qualidadeRede = 'Média' THEN 2
        WHEN qualidadeRede = 'Estável' THEN 3
        ELSE 4 -- Qualidade desconhecida ou nula
    END;
        
-- view dos indicadores
CREATE VIEW view_indicador AS
SELECT 
    m.idMaquina,
    MAX(CASE WHEN r.nomeRecurso = 'Latência' THEN dc.registro END) AS ultimaLatencia,
    MAX(CASE WHEN r.nomeRecurso = 'Bytes Recebidos' THEN dc.registro END) AS ultimoUpload, 
    MAX(CASE WHEN r.nomeRecurso = 'Bytes Enviados' THEN dc.registro  END) AS ultimoDownload,
    MAX(CASE WHEN r.nomeRecurso = 'Perda de Pacotes' THEN dc.registro  END) AS perdaPacotes
FROM dado_capturado AS dc
JOIN recurso r ON dc.fkRecurso = r.idRecurso
JOIN maquina m ON dc.fkMaquina = m.idMaquina
WHERE dc.dtHora >= NOW() - INTERVAL 20 SECOND
GROUP BY m.idMaquina;

-- select grafico dinamico 	
 SELECT 
    idRecurso,
    registro,
    nomeRecurso,
    DATE_FORMAT(dtHora, '%H:%i:%s') AS dtHora
FROM (SELECT 
        registro, dtHora, nomeRecurso, idRecurso
    FROM dado_capturado
    JOIN recurso AS r ON fkRecurso = idRecurso
    WHERE fkMaquina = 1 AND fkRecurso IN (6 , 7)
    ORDER BY dtHora DESC
    LIMIT 10) AS subconsulta_rede
ORDER BY dtHora ASC;
