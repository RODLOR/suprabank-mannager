CREATE DATABASE `bank_mannager`;

USE `bank_mannager`;

CREATE TABLE
    users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL DEFAULT TRUE,
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        tel VARCHAR(20),
        profile_photo VARCHAR(255)
    );

CREATE TABLE
    clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_number VARCHAR(20) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(100) NOT NULL,
        tel VARCHAR(20) NOT NULL,
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    loans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        requirement_date DATE NOT NULL,
        client_id INT NOT NULL,
        required_amount DECIMAL(20, 2) NOT NULL,
        cuotes_quantity INT NOT NULL,
        cuotes_amount DECIMAL(10, 2) NOT NULL,
        monthly_interest DECIMAL(5, 2) NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id)
    );

CREATE TABLE
    credit_cards (
        id INT PRIMARY KEY AUTO_INCREMENT,
        client_id INT NOT NULL,
        card_number VARCHAR(16) NOT NULL,
        expiration_date DATE NOT NULL,
        cvv VARCHAR(4) NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id)
    );

CREATE TABLE
    transactions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        client_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        description VARCHAR(255) NOT NULL,
        type ENUM('payment', 'cash_advance') NOT NULL,
        transaction_date DATETIME NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id)
    );

CREATE TABLE
    balances (
        id INT PRIMARY KEY AUTO_INCREMENT,
        client_id INT NOT NULL,
        balance DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id)
    );