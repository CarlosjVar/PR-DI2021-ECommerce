-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: 35.196.1.33    Database: CompuHardware
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Admins_UserId` (`userId`),
  CONSTRAINT `FK_Users_Admins` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Clients_UserId` (`userId`),
  CONSTRAINT `FK_Users_Clients` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OrderDetails`
--

DROP TABLE IF EXISTS `OrderDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`,`orderId`),
  KEY `FK_Orders_OrderDetails` (`orderId`),
  KEY `FK_Products_OrderDetails` (`productId`),
  CONSTRAINT `FK_Orders_OrderDetails` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`),
  CONSTRAINT `FK_Products_OrderDetails` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `delivered` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Clients_Orders` (`clientId`),
  CONSTRAINT `FK_Clients_Orders` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Preorders`
--

DROP TABLE IF EXISTS `Preorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preorders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `isCancelled` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Preorder_OrderId` (`orderId`),
  CONSTRAINT `FK_Orders_Preorders` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `imageFileName` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Categories_Products` (`categoryId`),
  CONSTRAINT `FK_Categories_Products` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ProductsXSpecifications`
--

DROP TABLE IF EXISTS `ProductsXSpecifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductsXSpecifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(50) DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `specificationId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Products_ProductId` (`productId`),
  KEY `FK_Specifications_ProductsXSpecifications` (`specificationId`),
  CONSTRAINT `FK_Products_ProductId` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`),
  CONSTRAINT `FK_Specifications_ProductsXSpecifications` FOREIGN KEY (`specificationId`) REFERENCES `Specifications` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Sales`
--

DROP TABLE IF EXISTS `Sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `paypalOrderId` char(17) NOT NULL,
  `paypalPayerId` char(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Sales_OrderId` (`orderId`),
  CONSTRAINT `FK_Orders_Sales` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Specifications`
--

DROP TABLE IF EXISTS `Specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Specifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `isNumeric` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `fullName` varchar(60) NOT NULL,
  `password` char(60) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Users_Email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-17 23:59:25
