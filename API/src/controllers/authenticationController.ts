import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import prismaController from "../config/Database";
import generateToken from "../utils/generateToken";
import bcrypt from "bcrypt";

export const authUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //Check if the email is registered
    const userWithEmail = await prismaController.users.findUnique({
      where: {
        email: email,
      },
      include: {
        Clients: true,
        Admins: true,
      },
    });
    if (!userWithEmail) {
      return res.status(400).json({
        errors: [{ msg: "El email no se encuentra registrado en el sistema" }],
      });
    }

    const isPassword = await bcrypt.compare(
      password,
      userWithEmail.password as string
    );
    console.log(isPassword);

    if (!isPassword) {
      return res.status(400).json({ errors: [{ msg: "Contraseña errónea" }] });
    }
    if (!userWithEmail.Clients && !userWithEmail.Admins) {
      return res.status(400).json({
        errors: [
          {
            msg: "Error en la cuenta, no es administrador ni cliente, por favor contactese con el negocio.",
          },
        ],
      });
    }
    return res.json({
      token: generateToken({
        _id: userWithEmail.id,
        email: userWithEmail.email,
        name: userWithEmail.fullName,
        isAdmin: userWithEmail.Clients ? false : true,
      }),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
