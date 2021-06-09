USE CompuHardware;
CREATE TABLE Products(
	id INT NOT NULL AUTO_INCREMENT,
    name NVARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    categoryId INT NOT NULL,
    imageFileName NVARCHAR(40) DEFAULT 'default_img',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_Products PRIMARY KEY(id),
    CONSTRAINT FK_Categories_Products FOREIGN KEY(categoryId) REFERENCES Categories(id)
);
ALTER TABLE Products DROP COLUMN imageFileName;
ALTER TABLE Products ADD COLUMN imageFileName NVARCHAR(120) default 'default_img';