USE CompuHardware;
CREATE TABLE Orders(
	id INT NOT NULL AUTO_INCREMENT,
    clientId INT NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL,
    createdAt DATETIME NOT NULL,
    delivered BIT NOT NULL,
    CONSTRAINT PK_Orders PRIMARY KEY(id),
    CONSTRAINT FK_Clients_Orders FOREIGN KEY(clientId) REFERENCES Clients(id)
    )
