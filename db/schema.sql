DROP DATABASE IF EXISTS business;
CREATE DATABASE business;

USE business;

-- add tables
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VACHAR(30),
    PRIMARY KEY(id)
);