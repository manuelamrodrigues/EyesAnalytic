CREATE DATABASE Switch;
use Switch;

CREATE TABLE dadoHw(
    id INT PRIMARY KEY auto_increment,
    data_hora DATETIME,
    cpuPercent int,
    ramPercent int,
    packetLoss int
);

create table diskP(
	id int primary key auto_increment,
    data_hora datetime,
    diskPercent int
);

create table Usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255),
	email VARCHAR(255),
	senha VARCHAR(255)
);

select * from dadoHw;
select * from diskP;