import express, { Request } from "express";
import prismaController from "../config/Database";
import { findCategories, findSpecs } from "../controllers/utilsController";

const utilsRouter = express.Router();

// @route   GET - /api/utils/specs
// @desc    Returns all the specifications saved in the database
// @access  Public
utilsRouter.route("/specs").get(findSpecs);

// @route   GET - /api/utils/categories
// @desc    Returns all the categories saved in the database
// @access  Public
utilsRouter.route("/categories").get(findCategories);

utilsRouter.route("/image/upload").post();
export default utilsRouter;
