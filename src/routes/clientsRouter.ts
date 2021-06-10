import express from "express";
import expressValidator, { body, validationResult } from "express-validator";
import { createClient } from "../controllers/clientController";

const clientsRouter = express.Router();

// @route   POST - /api/clients/create
// @desc    Creates a client in the system
// @access  Public
clientsRouter
  .route("/create")
  .post(
    [
      body("email").isEmail().withMessage("Por favor ingrese un email"),
      body("fullname")
        .isLength({ min: 8 })
        .withMessage("Por favor ingrese un nombre de al menos 8 caracteres"),
      body("password")
        .isStrongPassword()
        .withMessage("Por favor ingrese una contraseña más segura"),
    ],
    createClient
  );
export default clientsRouter;
