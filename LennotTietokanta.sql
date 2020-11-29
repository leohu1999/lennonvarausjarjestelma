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
  `date` DATE NOT NULL,
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

insert into schedule(date, time, destination_destination_id)
values('2020-11-29','08:00','1'),('2020-11-29','08:20','2'),('2020-11-29','08:40','3'),('2020-11-29','09:00','4'),('2020-11-29','09:20','5'),('2020-11-29','09:00','6'),('2020-11-29','09:40','7'),('2020-11-29','10:00','8'),('2020-11-29','10:20','9'),('2020-11-29','10:40','1'),('2020-11-29','11:00','2'),('2020-11-29','11:20','3'),('2020-11-29','11:40','4'),('2020-11-29','12:00','5'),('2020-11-29','12:20','6'),('2020-11-29','12:40','7'),('2020-11-29','22:20','8'),('2020-11-29','22:40','9');

insert into schedule(date, time, destination_destination_id)
values('2020-11-30','08:00','1'),('2020-11-30','08:20','2'),('2020-11-30','08:40','3'),('2020-11-30','09:00','4'),('2020-11-30','09:20','5'),('2020-11-30','09:00','6'),('2020-11-29','09:40','7'),('2020-11-30','10:00','8'),('2020-11-30','10:20','9'),('2020-11-30','10:40','1'),('2020-11-30','11:00','2'),('2020-11-30','11:20','3'),('2020-11-30','11:40','4'),('2020-11-30','12:00','5'),('2020-11-30','12:20','6'),('2020-11-30','12:40','7'),('2020-11-30','22:20','8'),('2020-11-30','22:40','9');

insert into schedule(date, time, destination_destination_id)
values('2020-12-01','08:00','1'),('2020-12-01','08:20','2'),('2020-12-01','08:40','3'),('2020-12-01','09:00','4'),('2020-12-01','09:20','5'),('2020-12-01','09:00','6'),('2020-12-01','09:40','7'),('2020-12-01','10:00','8'),('2020-12-01','10:20','9'),('2020-12-01','10:40','1'),('2020-12-01','11:00','2'),('2020-12-01','11:20','3'),('2020-12-01','11:40','4'),('2020-12-01','12:00','5'),('2020-12-01','12:20','6'),('2020-12-01','12:40','7'),('2020-12-01','22:20','8'),('2020-12-01','22:40','9');

insert into schedule(date, time, destination_destination_id)
values('2020-12-02','08:00','1'),('2020-12-02','08:20','2'),('2020-12-02','08:40','3'),('2020-12-02','09:00','4'),('2020-12-02','09:20','5'),('2020-12-02','09:00','6'),('2020-12-02','09:40','7'),('2020-12-02','10:00','8'),('2020-12-02','10:20','9'),('2020-12-02','10:40','1'),('2020-12-02','11:00','2'),('2020-12-02','11:20','3'),('2020-12-02','11:40','4'),('2020-12-02','12:00','5'),('2020-12-02','12:20','6'),('2020-12-02','12:40','7'),('2020-12-02','22:20','8'),('2020-12-02','22:40','9');