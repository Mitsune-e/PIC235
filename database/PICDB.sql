-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema PIC
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `PIC` ;

-- -----------------------------------------------------
-- Schema PIC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PIC` DEFAULT CHARACTER SET utf8 ;
USE `PIC` ;

-- -----------------------------------------------------
-- Table `PIC`.`TD_TPO_CLIENTE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TD_TPO_CLIENTE` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TD_TPO_CLIENTE` (
  `PK_TPO_CLIENTE` INT NOT NULL AUTO_INCREMENT,
  `COD_TPO_CLIENTE` INT NOT NULL,
  `DES_TPO_CLIENTE` VARCHAR(45) NOT NULL,
  `TEXTO_TPO_CLIENTE` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`PK_TPO_CLIENTE`),
  UNIQUE INDEX `PK_TPO_CLIENTE_UNIQUE` (`PK_TPO_CLIENTE` ASC),
  UNIQUE INDEX `COD_TPO_CLIENTE_UNIQUE` (`COD_TPO_CLIENTE` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIC`.`TD_TPO_SERVICO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TD_TPO_SERVICO` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TD_TPO_SERVICO` (
  `PK_TPO_SERVICO` INT NOT NULL AUTO_INCREMENT,
  `COD_TPO_SERVICO` INT NOT NULL,
  `DESC_TPO_SERVICO` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_TPO_SERVICO`),
  UNIQUE INDEX `PK_TPO_SERVICO_UNIQUE` (`PK_TPO_SERVICO` ASC),
  UNIQUE INDEX `COD_TPO_SERVICO_UNIQUE` (`COD_TPO_SERVICO` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIC`.`TB_EMPRESA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TB_EMPRESA` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TB_EMPRESA` (
  `PK_EMPRESA` INT NOT NULL AUTO_INCREMENT,
  `COD_EMPRESA` INT NOT NULL,
  `NOME_FAN_EMPRESA` VARCHAR(100) NOT NULL,
  `RAZAO_EMPRESA` VARCHAR(100) NOT NULL COMMENT 'RAZAO SOCIAL',
  `CNPJ_EMPRESA` VARCHAR(14) NOT NULL,
  `EMAIL_EMPRESA` VARCHAR(50) NOT NULL,
  `TEL_EMPRESA` VARCHAR(15) NOT NULL,
  `ENDER_EMPRESA` VARCHAR(100) NOT NULL COMMENT 'Endereco',
  `INSCR_EMPRESA` VARCHAR(45) NOT NULL COMMENT 'INCRICAO empresa\n',
  `TD_TPO_CLIENTE_PK_TPO_CLIENTE` INT NOT NULL,
  `TD_TPO_SERVICO_PK_TPO_SERVICO` INT NOT NULL,
  PRIMARY KEY (`PK_EMPRESA`),
  UNIQUE INDEX `COD_EMPRESA_UNIQUE` (`COD_EMPRESA` ASC),
  UNIQUE INDEX `CNPJ_EMPRESA_UNIQUE` (`CNPJ_EMPRESA` ASC),
  UNIQUE INDEX `PK_EMPRESA_UNIQUE` (`PK_EMPRESA` ASC),
  INDEX `fk_TB_EMPRESA_TD_TPO_CLIENTE1_idx` (`TD_TPO_CLIENTE_PK_TPO_CLIENTE` ASC),
  INDEX `fk_TB_EMPRESA_TD_TPO_SERVICO1_idx` (`TD_TPO_SERVICO_PK_TPO_SERVICO` ASC),
  CONSTRAINT `fk_TB_EMPRESA_TD_TPO_CLIENTE1`
    FOREIGN KEY (`TD_TPO_CLIENTE_PK_TPO_CLIENTE`)
    REFERENCES `PIC`.`TD_TPO_CLIENTE` (`PK_TPO_CLIENTE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TB_EMPRESA_TD_TPO_SERVICO1`
    FOREIGN KEY (`TD_TPO_SERVICO_PK_TPO_SERVICO`)
    REFERENCES `PIC`.`TD_TPO_SERVICO` (`PK_TPO_SERVICO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIC`.`TD_TPO_USUARIO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TD_TPO_USUARIO` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TD_TPO_USUARIO` (
  `PK_TPO_USUARIO` INT NOT NULL AUTO_INCREMENT,
  `COD_TPO_USUARIO` INT NOT NULL,
  `DESC_TPO_USUARIO` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_TPO_USUARIO`),
  UNIQUE INDEX `COD_TPO_USUARIO_UNIQUE` (`COD_TPO_USUARIO` ASC),
  UNIQUE INDEX `PK_TPO_USUARIO_UNIQUE` (`PK_TPO_USUARIO` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIC`.`TB_USUARIO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TB_USUARIO` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TB_USUARIO` (
  `PK_USUARIO` INT NOT NULL AUTO_INCREMENT,
  `FK_TPO_USUARIO` INT NOT NULL,
  `COD_USUARIO` INT NOT NULL,
  `EMAIL_USUARIO` VARCHAR(50) NOT NULL,
  `TEL_USUARIO` VARCHAR(15) NOT NULL,
  `SNA_USUARIO` VARCHAR(60) NOT NULL COMMENT 'SENHA',
  PRIMARY KEY (`PK_USUARIO`),
  UNIQUE INDEX `PK_USUARIO_UNIQUE` (`PK_USUARIO` ASC),
  UNIQUE INDEX `COD_USUARIO_UNIQUE` (`COD_USUARIO` ASC),
  INDEX `fk_TB_USUARIO_TD_TPO_USUARIO1_idx` (`FK_TPO_USUARIO` ASC),
  CONSTRAINT `fk_TB_USUARIO_TD_TPO_USUARIO1`
    FOREIGN KEY (`FK_TPO_USUARIO`)
    REFERENCES `PIC`.`TD_TPO_USUARIO` (`PK_TPO_USUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIC`.`TB_FUNCOES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TB_FUNCOES` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TB_FUNCOES` (
  `PK_FUNCOES` INT NOT NULL AUTO_INCREMENT,
  `COD_FUNCOES` INT NOT NULL,
  `DESC_FUNCOES` VARCHAR(45) NOT NULL,
  `FK_EMPRESA` INT NOT NULL,
  PRIMARY KEY (`PK_FUNCOES`),
  UNIQUE INDEX `PK_FUNCOES_UNIQUE` (`PK_FUNCOES` ASC),
  UNIQUE INDEX `COD_FUNCOES_UNIQUE` (`COD_FUNCOES` ASC),
  INDEX `fk_TB_FUNCOES_TB_EMPRESA1_idx` (`FK_EMPRESA` ASC),
  CONSTRAINT `fk_TB_FUNCOES_TB_EMPRESA1`
    FOREIGN KEY (`FK_EMPRESA`)
    REFERENCES `PIC`.`TB_EMPRESA` (`PK_EMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIC`.`TA_USUARIO_EMP`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TA_USUARIO_EMP` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TA_USUARIO_EMP` (
  `PK_USUARIO_EMP` INT NOT NULL AUTO_INCREMENT,
  `FK_USUARIO` INT NOT NULL,
  `FK_EMPRESA` INT NOT NULL,
  `FK_FUNCOES` INT NOT NULL,
  PRIMARY KEY (`PK_USUARIO_EMP`),
  UNIQUE INDEX `PK_USUARIO_EMP_UNIQUE` (`PK_USUARIO_EMP` ASC),
  INDEX `fk_TA_USUARIO_EMP_TB_USUARIO1_idx` (`FK_USUARIO` ASC),
  INDEX `fk_TA_USUARIO_EMP_TB_EMPRESA1_idx` (`FK_EMPRESA` ASC),
  INDEX `fk_TA_USUARIO_EMP_TB_FUNCOES1_idx` (`FK_FUNCOES` ASC),
  CONSTRAINT `fk_TA_USUARIO_EMP_TB_USUARIO1`
    FOREIGN KEY (`FK_USUARIO`)
    REFERENCES `PIC`.`TB_USUARIO` (`PK_USUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TA_USUARIO_EMP_TB_EMPRESA1`
    FOREIGN KEY (`FK_EMPRESA`)
    REFERENCES `PIC`.`TB_EMPRESA` (`PK_EMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TA_USUARIO_EMP_TB_FUNCOES1`
    FOREIGN KEY (`FK_FUNCOES`)
    REFERENCES `PIC`.`TB_FUNCOES` (`PK_FUNCOES`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIC`.`TB_PROJETO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PIC`.`TB_PROJETO` ;

CREATE TABLE IF NOT EXISTS `PIC`.`TB_PROJETO` (
  `PK_PROJETO` INT NOT NULL AUTO_INCREMENT,
  `COD_PROJETO` INT NOT NULL,
  `DESC_PROJETO` VARCHAR(45) NOT NULL,
  `FK_EMPRESA` INT NOT NULL,
  PRIMARY KEY (`PK_PROJETO`),
  UNIQUE INDEX `PK_PROJETO_UNIQUE` (`PK_PROJETO` ASC),
  UNIQUE INDEX `COD_PROJETO_UNIQUE` (`COD_PROJETO` ASC),
  INDEX `fk_TB_PROJETO_TB_EMPRESA1_idx` (`FK_EMPRESA` ASC),
  CONSTRAINT `fk_TB_PROJETO_TB_EMPRESA1`
    FOREIGN KEY (`FK_EMPRESA`)
    REFERENCES `PIC`.`TB_EMPRESA` (`PK_EMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `PIC`.`TD_TPO_CLIENTE`
-- -----------------------------------------------------
START TRANSACTION;
USE `PIC`;
INSERT INTO `PIC`.`TD_TPO_CLIENTE` (`PK_TPO_CLIENTE`, `COD_TPO_CLIENTE`, `DES_TPO_CLIENTE`, `TEXTO_TPO_CLIENTE`) VALUES (1, 1, 'JuridicaGrande', 'Pessoas Jurídicas (em grande quantidade; acima de 200 clientes)');
INSERT INTO `PIC`.`TD_TPO_CLIENTE` (`PK_TPO_CLIENTE`, `COD_TPO_CLIENTE`, `DES_TPO_CLIENTE`, `TEXTO_TPO_CLIENTE`) VALUES (2, 2, 'JuridicaPequena', 'Pessoas Jurídicas (em pequena quantidade; até 200 clientes)');
INSERT INTO `PIC`.`TD_TPO_CLIENTE` (`PK_TPO_CLIENTE`, `COD_TPO_CLIENTE`, `DES_TPO_CLIENTE`, `TEXTO_TPO_CLIENTE`) VALUES (3, 3, 'FisicaGrande', 'Pessoas Físicas (em grande quantidade; acima de 200 clientes)');
INSERT INTO `PIC`.`TD_TPO_CLIENTE` (`PK_TPO_CLIENTE`, `COD_TPO_CLIENTE`, `DES_TPO_CLIENTE`, `TEXTO_TPO_CLIENTE`) VALUES (4, 4, 'FisicaPequena', 'Pessoas Físicas (em pequena quantidade; até de 200 clientes)');

COMMIT;


-- -----------------------------------------------------
-- Data for table `PIC`.`TD_TPO_SERVICO`
-- -----------------------------------------------------
START TRANSACTION;
USE `PIC`;
INSERT INTO `PIC`.`TD_TPO_SERVICO` (`PK_TPO_SERVICO`, `COD_TPO_SERVICO`, `DESC_TPO_SERVICO`) VALUES (1, 1, 'Produto');
INSERT INTO `PIC`.`TD_TPO_SERVICO` (`PK_TPO_SERVICO`, `COD_TPO_SERVICO`, `DESC_TPO_SERVICO`) VALUES (2, 2, 'Servico');
INSERT INTO `PIC`.`TD_TPO_SERVICO` (`PK_TPO_SERVICO`, `COD_TPO_SERVICO`, `DESC_TPO_SERVICO`) VALUES (3, 3, 'Ambos');

COMMIT;


-- -----------------------------------------------------
-- Data for table `PIC`.`TB_EMPRESA`
-- -----------------------------------------------------
START TRANSACTION;
USE `PIC`;
INSERT INTO `PIC`.`TB_EMPRESA` (`PK_EMPRESA`, `COD_EMPRESA`, `NOME_FAN_EMPRESA`, `RAZAO_EMPRESA`, `CNPJ_EMPRESA`, `EMAIL_EMPRESA`, `TEL_EMPRESA`, `ENDER_EMPRESA`, `INSCR_EMPRESA`, `TD_TPO_CLIENTE_PK_TPO_CLIENTE`, `TD_TPO_SERVICO_PK_TPO_SERVICO`) VALUES (1, 1, 'Dev2Bee', 'TechSolucoes', '26254594000150', 'dev2bee@gmail.com', '923234242', 'Rua 23', '222222', 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `PIC`.`TD_TPO_USUARIO`
-- -----------------------------------------------------
START TRANSACTION;
USE `PIC`;
INSERT INTO `PIC`.`TD_TPO_USUARIO` (`PK_TPO_USUARIO`, `COD_TPO_USUARIO`, `DESC_TPO_USUARIO`) VALUES (1, 1, 'Lider');
INSERT INTO `PIC`.`TD_TPO_USUARIO` (`PK_TPO_USUARIO`, `COD_TPO_USUARIO`, `DESC_TPO_USUARIO`) VALUES (2, 2, 'Comum');
INSERT INTO `PIC`.`TD_TPO_USUARIO` (`PK_TPO_USUARIO`, `COD_TPO_USUARIO`, `DESC_TPO_USUARIO`) VALUES (3, 3, 'Admin');

COMMIT;

