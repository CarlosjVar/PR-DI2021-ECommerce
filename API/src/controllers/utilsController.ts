import prismaController from "../config/Database";
import { Request, Response } from "express";
import { FILE_HOSTING_URL } from "../config/constants";
import fs, { PathLike } from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

const encode64 = (path: PathLike) => {
  // read binary data
  var bitmap = fs.readFileSync(path);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString("base64");
};

export const findSpecs = async (req: Request, res: Response) => {
  const specs = await prismaController.specifications.findMany({});
  return res.json({ specs: specs });
};

export const findCategories = async (req: Request, res: Response) => {
  const catgs = await prismaController.categories.findMany({});
  return res.json({ categories: catgs });
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ msg: "Please upload a file" });
    }
    let tempPath = file.path;
    const extname = path.extname(file.originalname).toLowerCase();

    tempPath = path.join(__dirname, "/../../" + tempPath);
    if (extname === ".png" || extname === ".jpg") {
      let filename = file.originalname;
      filename = filename.replace(/\.[^/.]+$/, "");
      const image64 = encode64(tempPath);
      const url = process.env.IMAGE_HOSTING_URL + "upload";

      axios
        .post(
          url,
          { filename: filename, extname: extname, imageData: image64 },
          { headers: { "Content-Type": "application/json" } }
        )
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
    } else {
      return res.status(400).json({});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    axios
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
  } catch (err) {
    return res.json({ msg: "Internal server error" });
  }
};
