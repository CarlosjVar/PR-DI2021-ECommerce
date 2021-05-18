USE CompuHardware;
CREATE TABLE Preorders(
	id INT NOT NULL AUTO_INCREMENT,
    orderId INT NOT NULL,
    isCancelled BIT NOT NULL,
    CONSTRAINT PK_Preorder PRIMARY KEY(id),
    CONSTRAINT UQ_Preorder_OrderId UNIQUE(orderId),
    CONSTRAINT FK_Orders_Preorders FOREIGN KEY(orderId) REFERENCES Orders(id)
    )
