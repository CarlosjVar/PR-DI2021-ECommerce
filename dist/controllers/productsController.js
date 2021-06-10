"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pcBuilderProdSearch = exports.getTopProducts = exports.findProduct = exports.updateProduct = exports.deleteProducts = exports.createProduct = exports.findProducts = void 0;
const Database_1 = __importDefault(require("../config/Database"));
const express_validator_1 = require("express-validator");
const findProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category;
        const productName = req.query.productName;
        //No category but has name
        if (category == "All" && productName != null) {
            const products = yield Database_1.default.products.findMany({
                where: {
                    name: {
                        contains: productName,
                    },
                },
                include: {
                    Categories: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            res.json({ products: products });
        }
        //Has Category and has name
        else if (category != "All" && productName != null) {
            const products = yield Database_1.default.products.findMany({
                where: {
                    name: {
                        contains: productName,
                    },
                    Categories: {
                        name: {
                            equals: category,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    Categories: true,
                },
            });
            res.json({ products: products });
        }
        // Has cateogry but does not has name
        else if (category != "All" && productName == null) {
            const products = yield Database_1.default.products.findMany({
                where: {
                    Categories: {
                        name: {
                            equals: category,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    Categories: true,
                },
            });
            res.json({ products: products });
        }
        //No category and no name
        else {
            const products = yield Database_1.default.products.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            res.json({ products: products });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.findProducts = findProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, quantity, price, category, specifications, imageName } = req.body;
        const product = yield Database_1.default.products.create({
            data: {
                name: name,
                quantity: quantity,
                price: price,
                createdAt: new Date(),
                categoryId: category,
                imageFileName: imageName,
            },
        });
        yield specifications.forEach((specification) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(specification);
            yield Database_1.default.productsXSpecifications.create({
                data: {
                    productId: product.id,
                    specificationId: specification.id,
                    value: specification.value,
                },
            });
        }));
        product.price = price;
        return res.json({
            msg: "Producto añadido correctamente",
            productInfo: product,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: [{ errors: "Internal server error" }] });
    }
});
exports.createProduct = createProduct;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodId = parseInt(req.query.prodId);
        if (prodId == null) {
            return res
                .status(400)
                .json({ msg: [{ errors: "No se encontró el producto" }] });
        }
        yield Database_1.default.productsXSpecifications.deleteMany({
            where: {
                productId: prodId,
            },
        });
        const product = yield Database_1.default.products.delete({
            where: {
                id: prodId,
            },
        });
        res.json({
            msg: "El producto se ha eliminado correctamente",
            productInfo: product,
        });
    }
    catch (err) {
        res.status(500).json({ msg: [{ errors: "Internal server error" }] });
    }
});
exports.deleteProducts = deleteProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const prodId = parseInt(req.query.productId);
        if (!prodId) {
            return res
                .status(400)
                .json({ msg: [{ errors: "Error en el id del producto" }] });
        }
        const { name, quantity, price, category, specifications, imageName } = req.body;
        //Find new category id
        const product = yield Database_1.default.products.update({
            where: {
                id: prodId,
            },
            data: {
                name: name,
                quantity: quantity,
                price: price,
                createdAt: new Date(),
                imageFileName: imageName,
                categoryId: category,
            },
        });
        //Delete all current relationships with specifications
        yield Database_1.default.productsXSpecifications.deleteMany({
            where: {
                productId: prodId,
            },
        });
        //Insert the new specifications
        yield specifications.forEach((specification) => __awaiter(void 0, void 0, void 0, function* () {
            yield Database_1.default.productsXSpecifications.create({
                data: {
                    productId: product.id,
                    specificationId: specification.id,
                    value: specification.value,
                },
            });
        }));
        return res.json({
            msg: "Se ha actualizado el producto correctamente",
            productInfo: product,
        });
    }
    catch (err) {
        console.log(err);
        res.json({ msg: [{ errors: "Internal server error" }] });
    }
});
exports.updateProduct = updateProduct;
const findProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        if (!productId) {
            return res
                .status(400)
                .json({ msg: [{ errors: "Error en el id del producto" }] });
        }
        const product = yield Database_1.default.products.findFirst({
            where: {
                id: productId,
            },
            include: {
                ProductsXSpecifications: true,
            },
        });
        const categoria = yield Database_1.default.categories.findMany({
            where: {
                id: product.categoryId,
            },
        });
        return res.json({ product: product, categoria: categoria });
    }
    catch (err) {
        console.log(err);
        res.json({ msg: [{ errors: "Internal server error" }] });
    }
});
exports.findProduct = findProduct;
const getTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const prodLimit = 8;
        const prods = yield Database_1.default.$queryRaw(" SELECT t.* from (Select count(*) as count , Products.name, Products.id FROM Orders" +
            " INNER JOIN OrderDetails on (Orders.id = OrderDetails.orderId) " +
            "INNER JOIN Products on (OrderDetails.productId = Products.id) group by name) t order by (t.count ) desc limit " +
            prodLimit);
        res.json({ prods: prods });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getTopProducts = getTopProducts;
const pcBuilderProdSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idcategoria = parseInt(req.params.idcategoria);
        const idSpecification = parseInt(req.params.idSpecification);
        const products = yield Database_1.default.productsXSpecifications.findMany({
            where: {
                specificationId: idSpecification,
                Products: { categoryId: idcategoria },
            },
            include: { Products: true },
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.pcBuilderProdSearch = pcBuilderProdSearch;
