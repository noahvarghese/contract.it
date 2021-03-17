DROP DATABASE IF EXISTS contract_it;
CREATE DATABASE contract_it;
USE contract_it; 

CREATE TABLE statuses (
    id INT NOT NULL AUTO_INCREMENT,
    file VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    created_on DATETIME NOT NULL DEFAULT NOW(),
    updated_on DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE jobs (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(2) NOT NULL,
    country VARCHAR(50) NOT NULL,
    created_on DATETIME NOT NULL DEFAULT NOW(),
    updated_on DATETIME NOT NULL DEFAULT NOW(),
    status_id INT NOT NULL,
    FOREIGN KEY (status_id) REFERENCES statuses(id),
    PRIMARY KEY(id)
);

CREATE TABLE images (
    id INT NOT NULL AUTO_INCREMENT,
    file VARCHAR(255) NOT NULL,
    text VARCHAR(50) NOT NULL,
    job_id INT NOT NULL,
    created_on DATETIME NOT NULL DEFAULT NOW(),
    updated_on DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    PRIMARY KEY(id)
);