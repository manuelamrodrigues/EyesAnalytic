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

select * from dadoHw;
select * from diskP;