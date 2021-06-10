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
exports.getImage = exports.uploadImage = exports.findCategories = exports.findSpecs = void 0;
const Database_1 = __importDefault(require("../config/Database"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const encode64 = (path) => {
    // read binary data
    var bitmap = fs_1.default.readFileSync(path);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString("base64");
};
const findSpecs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const specs = yield Database_1.default.specifications.findMany({});
    return res.json({ specs: specs });
});
exports.findSpecs = findSpecs;
const findCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catgs = yield Database_1.default.categories.findMany({});
    return res.json({ categories: catgs });
});
exports.findCategories = findCategories;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ msg: "Please upload a file" });
        }
        let tempPath = file.path;
        const extname = path_1.default.extname(file.originalname).toLowerCase();
        tempPath = path_1.default.join(__dirname, "/../../" + tempPath);
        if (extname === ".png" || extname === ".jpg") {
            let filename = file.originalname;
            filename = filename.replace(/\.[^/.]+$/, "");
            const image64 = encode64(tempPath);
            const url = process.env.IMAGE_HOSTING_URL + "upload";
            axios_1.default
                .post(url, { filename: filename, extname: extname, imageData: image64 }, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                console.log(response.data);
                return res.json({
                    msg: "Imagen añadida correctamente",
                    imageName: response.data.filename,
                });
            })
                .catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: "Internal server error" });
            });
        }
        else {
            return res.status(400).json({});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.uploadImage = uploadImage;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default
            .get(process.env.IMAGE_HOSTING_URL + req.params.image)
            .then((response) => {
            let img = Buffer.from(response.data.imageData, "base64");
            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": img.length,
            });
            res.end(img);
        })
            .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Internal server error" });
        });
    }
    catch (err) {
        return res.json({ msg: "Internal server error" });
    }
});
exports.getImage = getImage;
