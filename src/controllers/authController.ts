import { Request, Response } from "express";
import prisma from '../models/user.prisma.interface'
import { generarToken, cifrarPassword, compararCifrado } from "../services/authService";


export const registrar = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    try {

        if (!email) {

            res.status(400).json({ message: "email requerido!" })
            return

        }

        if (!password) {

            res.status(400).json({ message: "email requerido!" })
            return

        }

        const contraCifrada = await cifrarPassword(password)

        const user = await prisma.create(
            {
                data: {
                    email: email,
                    password: contraCifrada
                }
            }
        )

        const token = generarToken(user)

        res.status(201).json({ token })


    } catch (error) {

        console.log(error)

    }

}


export const login = async (req: Request, res: Response): Promise<void> => {

    

}