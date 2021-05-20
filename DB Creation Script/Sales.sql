USE CompuHardware;
CREATE TABLE Sales(
	id INT NOT NULL AUTO_INCREMENT,
    orderId INT NOT NULL,
    paypalOrderId CHAR(17) NOT NULL,
    paypalPayerId Char(13) NOT NULL,
    CONSTRAINT PK_Sales PRIMARY KEY(id),
    CONSTRAINT UQ_Sales_OrderId UNIQUE(orderId),
    CONSTRAINT FK_Orders_Sales FOREIGN KEY(orderId) REFERENCES Orders(id)
)

