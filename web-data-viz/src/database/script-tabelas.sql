-- -- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- -- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- -- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

-- /*
-- comandos para mysql server
-- */

-- =============================================    TABLE AQUATECH   =====================================================

-- CREATE DATABASE aquatech;

-- USE aquatech;

-- CREATE TABLE empresa (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
-- 	razao_social VARCHAR(50),
-- 	cnpj CHAR(14)
-- );

-- CREATE TABLE usuario (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
-- 	nome VARCHAR(50),
-- 	email VARCHAR(50),
-- 	senha VARCHAR(50),
-- 	fk_empresa INT,
-- 	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
-- );

-- CREATE TABLE aviso (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
-- 	titulo VARCHAR(100),
-- 	descricao VARCHAR(150),
-- 	fk_usuario INT,
-- 	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
-- );

-- create table aquario (
-- /* em nossa regra de negócio, um aquario tem apenas um sensor */
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
-- 	descricao VARCHAR(300),
-- 	fk_empresa INT,
-- 	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
-- );

-- /* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

-- create table medida (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
-- 	dht11_umidade DECIMAL,
-- 	dht11_temperatura DECIMAL,
-- 	luminosidade DECIMAL,
-- 	lm35_temperatura DECIMAL,
-- 	chave TINYINT,
-- 	momento DATETIME,
-- 	fk_aquario INT,
-- 	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
-- );

-- insert into empresa (razao_social, cnpj) values ('Empresa 1', '00000000000000');
-- insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);

-- =======================================================================================================================
-- =============================================    TABLE EYES ANALYTIC   ================================================

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
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa),
fkPrioridade int,
foreign key(fkPrioridade) references prioridade(idPrioridade)
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
insert into recurso (nomeRecurso) values
('CPU'),
('RAM'),
('Disco Rígido'),
('Bytes Recebidos'),
('Bytes Enviados'),
('Pacotes Enviados'),
('Pacotes Eecebidos');

 
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

-- Inserindo dados na tabela MaquinaRecurso
insert into maquina_recurso (fkMaquina, fkRecurso) values
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(3, 1),
(4, 1);

insert into metrica (valorMetrica, fkRecurso, fkEmpresa) VALUES
(90, 2, 2);

-- Inserindo dados na tabela Dado
-- Inserindo dados na tabela `dado_capturado` para máquina 1
INSERT INTO dado_capturado (registro, dtHora, fkMaquina, fkRecurso) VALUES
(85, '2024-09-28 10:30:00', 1, 1), -- CPU para máquina 1
(70, '2024-09-28 10:45:00', 1, 2), -- RAM para máquina 1
(60, '2024-09-28 11:00:00', 1, 3), -- Disco para máquina 1

(65, '2024-10-28 09:15:00', 2, 1), -- CPU da máquina 2
(45, '2024-10-28 09:30:00', 2, 2), -- RAM da máquina 2
(70, '2024-10-28 09:45:00', 2, 3); -- Disco da máquina 2


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
CREATE VIEW view_select_listar_chamados AS
SELECT
    c.idChamado,
    c.assunto,
    c.descricao,
    c.situacao,
    c.dtHora,
    d.idUsuario AS idDiretor,
    d.nome AS NomeDiretor,
    d.email AS EmailDiretor,
    e.idUsuario AS idEspecialista,
    e.nome AS NomeEspecialista,
    e.email AS EmailEspecialista,
    u.idUrgencia
FROM chamado AS c INNER JOIN usuario AS d
    ON c.fkDiretor = d.idUsuario
INNER JOIN usuario AS e
    ON c.fkEspecialista = e.idUsuario
INNER JOIN urgencia AS u
    ON c.fkUrgencia = u.idUrgencia;

-- VIEW LISTAGEM DE METRICAS DE ACORDO COM OS RECURSOS
CREATE VIEW metrica_view AS
SELECT
    m.idMetrica,
    m.valorMetrica,
    r.idRecurso,
    r.nomeRecurso,      -- Nome ou descrição do recurso
    e.idEmpresa       -- Nome ou descrição da empresa
FROM
    metrica m
JOIN
    recurso r ON m.fkRecurso = r.idRecurso
JOIN
    empresa e ON m.fkEmpresa = e.idEmpresa;

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
FROM 
    alerta AS a
JOIN 
    dado_capturado AS d ON a.fkDadoCapturado = d.idDadoCapturado
JOIN 
    maquina AS m ON d.fkMaquina = m.idMaquina
JOIN 
    recurso AS r ON d.fkRecurso = r.idRecurso
JOIN 
    empresa AS e ON m.fkEmpresa = e.idEmpresa;

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


SELECT * FROM metrica_view;