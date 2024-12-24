CREATE SCHEMA IF NOT EXISTS `task` DEFAULT CHARACTER SET utf8 ;
USE `task` ;


CREATE TABLE TAREFAS (
    id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
	importancia ENUM('normal', 'importante') DEFAULT 'normal',
    status ENUM('pendente', 'concluida') DEFAULT 'pendente',
    prazo DATETIME
);