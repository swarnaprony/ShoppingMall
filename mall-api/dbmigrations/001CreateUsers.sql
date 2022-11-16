-- Create Users table

CREATE TABLE users(
	username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    passsword VARCHAR(50) NOT NULL
);