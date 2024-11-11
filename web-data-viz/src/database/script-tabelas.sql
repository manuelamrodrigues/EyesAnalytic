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

-- Criando tabela contato
create table contato(
idContato int primary key auto_increment,
razaoSocial varchar(225),
email varchar(225),
cnpj char(14),
telefone varchar(20)
);

-- Criando tabela componente
create table recurso(
idRecurso int primary key auto_increment,
tipo varchar(45)
);

-- Criando tabela atributo
create table atributo(
idAtributo int primary key auto_increment,
tipo varchar(225)
);

-- Criando tabela urgencia
create table urgencia(
idUrgencia int primary key auto_increment,
tipo varchar(45)
);

-- Criando tabela Prioridade
create table prioridade(
idPrioridade int primary key auto_increment,
tipo varchar(45)
);

-- Criando tabela empresa
create table empresa(
idEmpresa int primary key auto_increment,
codSeg char(9),
fkContato int,
foreign key (fkContato) references contato(idContato)
);

-- Criando tabela Maquina
create table maquina(
idMaquina int primary key auto_increment,
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
situacao varchar(45),
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
registro int,
dtHora datetime default CURRENT_TIMESTAMP(),
fkMaquina int,
foreign key(fkMaquina) references maquina_recurso(fkMaquina),
fkRecurso int,
foreign key(fkRecurso) references maquina_recurso(fkRecurso),
primary key( idDadoCapturado, fkMaquina, fkRecurso)
);

-- Criando tabela Chamado
create table chamado(
idChamado int primary key auto_increment,
assunto varchar(225),
descricao varchar(1000),
situacao varchar(45) default 'Não Atendido',
dtHora datetime default CURRENT_TIMESTAMP(),
fkDiretor int,
constraint fkDiretor foreign key(fkDiretor) references usuario(idUsuario),
fkEspecialista int,
constraint fkEspecialista foreign key(fkEspecialista) references usuario(idUsuario),
fkUrgencia int,
foreign key(fkUrgencia) references urgencia(idUrgencia)
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


-- Inserção de dados
-- ==============================================================

-- Inserindo dados na tabela TipoUsuario
insert into tipo_usuario (tipo) values
('administrador'),
('especialista');

-- Inserindo dados na tabela Contato
insert into contato (razaoSocial, email, cnpj, telefone) values
('Empresa Alpha', 'empresaalpha@empresaalpha.com', '12543167897654','40987865'),
('Empresa Beta', 'empresabeta@empresabeta.com', '12564327865419', '23433212');

-- Inserindo dados na tabela Empresa
insert into empresa (codSeg, fkContato) values
('123456789',1),
('987654321',2);

-- Inserindo dados na tabela Recurso
insert into recurso (tipo) values
('cpu'),
('ram'),
('disco rígido');

-- Inserindo dados na tabela Atributo
insert into atributo (tipo) values
('fabricante'),
('modelo'),
('velocidade'),
('nucleos'),
('threads'),
('capacidade');

-- Inserindo dados na tabela Urgencia
insert into urgencia (tipo) values
('alta'),
('média'),
('baixa');

-- Inserindo dados na tabela Prioridade
insert into prioridade (tipo) values
('alto'),
('médio'),
('baixo');

-- Inserindo dados na tabela Maquina
insert into maquina (situacao, fkEmpresa, fkPrioridade) values
('ativa', 1, 1),
('inativa', 2, 3);

-- Inserindo dados na tabela Usuario
insert into usuario (idUsuario, nome, email, senha, situacao, fkEmpresa, fkTipoUsuario) values
(default, 'joão da silva', 'joao.silva@email.com', 'senha123', 'ativo', 1, 1),
(default, 'maria oliveira', 'maria.oliveira@email.com', 'senha123', 'ativo', 2, 2),
(default, 'pedro souza', 'pedro.souza@email.com', 'senha123', 'ativo', 1, 2);

-- Inserindo dados na tabela MaquinaRecurso
insert into maquina_recurso (idMaquinaRecurso,fkMaquina,fkRecurso) values
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 2, 3);

select * from maquina_recurso;

-- Inserindo dados na tabela Dado
insert into dado_capturado (registro, dtHora, fkMaquina, fkRecurso) values
(85, '2024-09-28 10:30:00', 1, 1), -- dado para a máquina 1 e Recurso cpu
(70, '2024-09-28 10:45:00', 1, 2), -- dado para a máquina 1 e Recurso ram
(65, '2024-09-28 11:00:00', 2, 1), -- dado para a máquina 2 e Recurso cpu
(50, '2024-09-28 11:15:00',2, 3); -- dado para a máquina 2 e Recurso disco rígido

-- Inserindo dados na tabela Chamado
insert into chamado (assunto, descricao, fkDiretor, fkEspecialista, fkUrgencia) values
('Problema com CPU', 'A CPU está esquentando acima do esperado.', 2, 2, 1),
('Baixa performance', 'A máquina está apresentando lentidão ao iniciar.', 2, 1, 2);

-- Inserindo dados na tabela Atributo Máquina Recurso
INSERT INTO atributo_maquina_recurso (valor, fkAtributo, fkMaquinaRecurso) VALUES
('3.5 GHz', 1, 1),
('16 GB', 2, 2),
('45 °C', 3, 3);

select * from chamado;

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