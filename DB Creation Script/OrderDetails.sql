USE CompuHardware;
CREATE TABLE OrderDetails(
	id INT NOT NULL AUTO_INCREMENT,
    orderId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    productId INT NOT NULL,
    CONSTRAINT PK_OrderDetails PRIMARY KEY(id,orderId),
    CONSTRAINT FK_Orders_OrderDetails FOREIGN KEY(orderId) REFERENCES Orders(id),
    CONSTRAINT FK_Products_OrderDetails FOREIGN KEY(productId) REFERENCES Products(id)
)