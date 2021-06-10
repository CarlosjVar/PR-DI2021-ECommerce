import { NextFunction, Request, Response } from "express";
var jwt = require("jsonwebtoken");
import dotenv from "dotenv";

import prismaController from "../config/Database";

const isAuthenticated = async (
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
          Clients: true,
        },
      });

      req.user = user;
      if (user.Admins != null) {
        req.isAdmin = true;
        delete user.Clients;
      } else {
        req.isAdmin = false;
        delete user.Admins;
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "No autorizado" });
    }
  }
};
export default isAuthenticated;
