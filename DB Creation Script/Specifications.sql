USE CompuHardware;
CREATE TABLE Specifications(
	id INT NOT NULL AUTO_INCREMENT,
    name NVARCHAR(40) NOT NULL,
    isNumeric BIT NOT NULL,
    CONSTRAINT PK_Specifications PRIMARY KEY(id)
    )