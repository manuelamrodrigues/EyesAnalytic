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

-- Criando tabelas indepentes
-- ==============================================================

-- Criando tabela tipo de usuario
create table TipoUser(
idTipoUser int primary key auto_increment,
tipo varchar(45)
);

-- Crinado tabela empresa
create table Empresa(
idEmpresa int primary key auto_increment,
nome varchar(225),
codSeg char(9)
);

-- Criando tabela componente
create table Recurso(
idRecurso int primary key auto_increment,
tipo varchar(45)
);

-- Criando tabela atributo
create table Atributo(
idAtributo int primary key auto_increment,
atributo varchar(225)
);

-- Criando tabela urgencia
create table Urgencia(
idUrgencia int primary key auto_increment,
tipo varchar(45)
);

-- Criando tabela Prioridade
create table Prioridade(
idPrioridade int primary key auto_increment,
tipo varchar(45)
);

-- Criando tabelas dependentes
-- Criando tabela Maquina
create table Maquina(
idMaquina int primary key auto_increment,
modelo varchar(90),
status varchar(45),
fkEmpresa int,
foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPrioridade int,
foreign key(fkPrioridade) references Prioridade(idPrioridade)
);

-- Criando tabela Usuario
create table Usuario(
idUsuario int primary key auto_increment,
nome varchar(225),
email varchar(225),
senha char(8),
status varchar(45),
fkEmpresa int,
foreign key(fkEmpresa) references Empresa(idEmpresa),
fkTipoUser int,
foreign key(fkTipoUser) references TipoUser(idTipoUser)
);

-- Criando tabela MaquinaComponente
create table MaquinaRecurso(
idMaquinaRecurso int auto_increment,
fkMaquina int,
foreign key(fkMaquina) references Maquina(idMaquina),
fkRecurso int,
foreign key(fkRecurso) references Recurso(idRecurso),
primary key(idMaquinaRecurso, fkMaquina, fkRecurso)
);

-- Criando tabela Dado
create table DadoCapturado(
idDado int auto_increment,
registro int,
dtHora datetime,
fkMaquinaRecurso int,
constraint fkDadoCapturado foreign key (fkMaquinaRecurso)
references MaquinaRecurso(idMaquinaRecurso),
constraint pkDadoMaquinaRecurso PRIMARY KEY (idDado, fkMaquinaRecurso)
);

-- Criando tabela Chamado
create table Chamado(
idChamado int primary key auto_increment,
assunto varchar(225),
descricao varchar(1000),
status varchar(45),
dtHora datetime,
fkDiretor int,
constraint fkDiretor foreign key(fkDiretor) references Usuario(idUsuario),
fkEspecialista int,
constraint fkEspecialista foreign key(fkEspecialista) references Usuario(idUsuario),
fkUrgencia int,
foreign key(fkUrgencia) references Urgencia(idUrgencia)
);

-- Criando tabela AtributoMaquinaComponente
create table AtributoMaquinaRecurso(
atributo varchar(255),
fkAtributo int,
foreign key(fkAtributo) references Atributo(idAtributo),
fkMaquinaRecurso int,
foreign key(fkMaquinaRecurso) references MaquinaRecurso(idMaquinaRecurso),
primary key(fkAtributo, fkMaquinaRecurso)
);

-- Criando tabela AtributoMaquinaComponente
create table Contato (
    id int AUTO_INCREMENT PRIMARY KEY,  -- ID único para cada contato
    nome varchar(255) not null,                -- Nome do contato
    email varchar(255) not null,               -- E-mail do contato
    telefone varchar(20) not null,             -- Telefone do contato
    cnpj varchar(18) not null,                 -- CNPJ do contato (tamanho padrão para CNPJ)
);



-- Inserção de dados
-- ==============================================================

-- Inserindo dados na tabela TipoUser
insert into TipoUser (tipo) values
('administrador'),
('usuário comum'),
('especialista');

-- Inserindo dados na tabela Empresa
insert into Empresa (nome, codSeg) values
('empresa alpha', '123456789'),
('empresa beta', '987654321');

-- Inserindo dados na tabela Recurso
insert into Recurso (tipo) values
('cpu'),
('ram'),
('disco rígido');

-- Inserindo dados na tabela Atributo
insert into Atributo (atributo) values
('fabricante'),
('modelo'),
('velocidade'),
('nucleos'),
('threads'),
('capacidade');

-- Inserindo dados na tabela Urgencia
insert into Urgencia (tipo) values
('alta'),
('média'),
('baixa');

-- Inserindo dados na tabela Prioridade
insert into Prioridade (tipo) values
('alto'),
('médio'),
('baixo');

-- Inserindo dados na tabela Maquina
insert into Maquina (modelo, status, fkEmpresa) values
('dell xps 15', 'ativa', 1),
('hp elitebook', 'inativa', 2);

-- Inserindo dados na tabela Usuario
insert into Usuario (nome, email, senha, status, fkEmpresa, fkTipoUser) values
('joão da silva', 'joao.silva@email.com', 'senha123', 'ativo', 1, 1),
('maria oliveira', 'maria.oliveira@email.com', 'senha123', 'ativo', 2, 2),
('pedro souza', 'pedro.souza@email.com', 'senha123', 'ativo', 1, 3);

-- Inserindo dados na tabela MaquinaRecurso

-- Inserindo dados na tabela Dado
insert into DadoCapturado (registro, dtHora, fkMaquinaRecurso) values
(85, '2024-09-28 10:30:00', 1), -- dado para a máquina 1 e Recurso cpu
(70, '2024-09-28 10:45:00', 1), -- dado para a máquina 1 e Recurso ram
(65, '2024-09-28 11:00:00', 2), -- dado para a máquina 2 e Recurso cpu
(50, '2024-09-28 11:15:00', 2); -- dado para a máquina 2 e Recurso disco rígido

-- Inserindo dados na tabela Chamado
insert into Chamado (assunto, descricao, status, dtHora, fkDiretor, fkEspecialista, fkUrgencia) values
('Problema com CPU', 'A CPU está esquentando acima do esperado.', 'Atendido', '2024-09-28 12:00:00', 1, 3, 1),
('Baixa performance', 'A máquina está apresentando lentidão ao iniciar.', 'Não atendido', '2024-09-28 12:30:00', 2, 3, 2);