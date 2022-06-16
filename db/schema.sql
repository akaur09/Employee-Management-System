DROP DATABASE IF EXISTS business;
CREATE DATABASE business;

USE business;

-- add tables
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VACHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
    FOREIGN KEY (department_id) REFERENCES departments(id)
);