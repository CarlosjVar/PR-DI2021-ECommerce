USE CompuHardware;
CREATE TABLE ProductsXSpecifications(
	id INT NOT NULL AUTO_INCREMENT,
    value NVARCHAR(50),
    productId INT NOT NULL,
    specificationId INT NOT NULL,
    CONSTRAINT PK_ProductsXSpecifications PRIMARY KEY(id),
    CONSTRAINT FK_Products_ProductId FOREIGN KEY(productId) REFERENCES Products(id),
    CONSTRAINT FK_Specifications_ProductsXSpecifications FOREIGN KEY(specificationId) REFERENCES Specifications(id)
    )
 