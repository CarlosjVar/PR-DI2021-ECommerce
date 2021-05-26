import express from "express";
import expressValidator, { body, validationResult } from "express-validator";
import isAuthenticatedAdmin from "../middleware/isAuthenticatedAdmin";
import { createAdmin, getAdmins } from "../controllers/adminController";
const adminRouter = express.Router();

// @route   POST - /api/admins/create
// @desc    Creates a user in the system
// @access  Only Admin
adminRouter
  .route("/create")
  .post(
    [
      body("email").isEmail().withMessage("Por favr ingrese un email válido"),
      body("fullname")
        .isLength({ min: 8 })
        .withMessage("Por favor ingrese un nombre de al menos 8 caracteres"),
      body("password")
        .isStrongPassword()
        .withMessage("Por favor ingrese una contraseña más segura"),
      isAuthenticatedAdmin,
    ],
    createAdmin
  );

// @route   GET - /api/admins/get
// @desc    Creates a user in the system
// @access  Only Admin
adminRouter.route("/get").get([isAuthenticatedAdmin], getAdmins);

export default adminRouter;
