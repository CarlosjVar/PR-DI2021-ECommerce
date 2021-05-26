import { NextFunction, Request, Response } from "express";
var jwt = require("jsonwebtoken");
import dotenv from "dotenv";

import prismaController from "../config/Database";

const isAuthenticatedAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "No autorizado" });
  } else {
    try {
      // Get token and decode
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
      //Find the user found in the jwt
      const user = await prismaController.users.findUnique({
        where: {
          id: decodedToken._id,
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          createdAt: true,
          Admins: true,
        },
      });
      //Check if both token and users informations sees the user as an administrator
      if (!decodedToken.isAdmin || !user?.Admins) {
        return res.status(401).json({
          message: "No autorizado como administrador, error en el token",
        });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
export default isAuthenticatedAdmin;
