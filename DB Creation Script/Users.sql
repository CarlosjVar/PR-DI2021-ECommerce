USE CompuHardware;
CREATE TABLE Users(
id INT NOT NULL auto_increment,
email NVARCHAR(50) NOT NULL,
fullName NVARCHAR(60) NOT NULL,
password CHAR(60),
createdAt DATETIME NOT NULL,
CONSTRAINT PQ_Users PRIMARY KEY(id),
CONSTRAINT UQ_Users_Email UNIQUE(email)
);
