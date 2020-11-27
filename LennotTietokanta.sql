-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema flights
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema flights
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `flights` DEFAULT CHARACTER SET utf8 ;
USE `flights` ;

-- -----------------------------------------------------
-- Table `flights`.`destination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flights`.`destination` (
  `destination_id` INT NOT NULL AUTO_INCREMENT,
  `destination_name` VARCHAR(45) NULL,
  `country` VARCHAR(30) NULL,
  PRIMARY KEY (`destination_id`),
  INDEX `nameIndex` (`destination_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flights`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flights`.`schedule` (
  `schedule_id` INT NOT NULL AUTO_INCREMENT,
  `time` TIME NOT NULL,
  `destination_destination_id` INT NOT NULL,
  PRIMARY KEY (`schedule_id`),
  INDEX `fk_schedule_destionation1_idx` (`destination_destination_id` ASC),
  CONSTRAINT `fk_schedulet_destination1`
    FOREIGN KEY (`destination_destination_id`)
    REFERENCES `flights`.`destination` (`destination_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- INSERTING DATA
-- -----------------------------------------------------
insert into destination(destination_name, country)
values('Pariisi','Ranska'),('Berliini','Saksa'),('Tukholma','Ruotsi'),('Oslo','Norja'),('Madrid','Espanja'),('Tokio','Japani'),('New York','Yhdysvallat'),('Lontoo','Iso-Britannia'),('Amsterdam','Alankomaat');

insert into schedule(time, destination_destination_id)
values('08:00','1'),('08:20','2'),('08:40','3'),('09:00','4'),('09:20','5'),('09:00','6'),('09:40','7'),('10:00','8'),('10:20','9'),('10:40','1'),('11:00','2'),('11:20','3'),('11:40','4'),('12:00','5'),('12:20','6'),('12:40','7'),('22:20','8'),('22:40','9');