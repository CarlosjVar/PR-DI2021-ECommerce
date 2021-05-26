import express from "express";
import expressValidator, { body, validationResult } from "express-validator";
import { authUser } from "../controllers/authenticationController";
const authRouter = express.Router();

// @route   POST - /api/auth/authUser
// @desc    Authenticates an user
// @access  Public
authRouter
  .route("/authUser")
  .post(
    [
      body("email").isEmail().withMessage("Por favor ingrese un email"),
      body("password")
        .notEmpty()
        .withMessage("Por favor ingrese una contraseña"),
    ],
    authUser
  );
authRouter.route;
export default authRouter;
