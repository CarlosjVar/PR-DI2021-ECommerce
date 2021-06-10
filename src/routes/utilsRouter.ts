import express, { Request } from "express";
import isAuthenticatedAdmin from "../middleware/isAuthenticatedAdmin";
import prismaController from "../config/Database";
import {
  findCategories,
  findSpecs,
  getImage,
  uploadImage,
} from "../controllers/utilsController";

import { upload } from "../middleware/multer";

const utilsRouter = express.Router();

// @route   GET - /api/utils/specs
// @desc    Returns all the specifications saved in the database
// @access  Public
utilsRouter.route("/specs").get(findSpecs);

// @route   GET - /api/utils/categories
// @desc    Returns all the categories saved in the database
// @access  Public
utilsRouter.route("/categories").get(findCategories);

// @route   POST - /api/utils/image/upload
// @desc    Returns all the categories saved in the database
// @access  Public
utilsRouter
  .route("/image/upload")
  .post([upload.single("imageFile"), isAuthenticatedAdmin], uploadImage);
export default utilsRouter;

utilsRouter.route("/image/:image").get(getImage);
