import { Request, Response } from "express";
import prisma from '../models/user.prisma.interface'
import { generarToken, cifrarPassword, compararCifrado } from "../services/authService";


export const registrar = async (req: Request, res: Response): Promise<void> => {

    const { email, password, nombre, apellido, cargo } = req.body

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
                    nombre: nombre,
                    apellido: apellido,
                    cargo: cargo,
                    email: email,
                    password: contraCifrada,

                }
            }
        )

        const token = generarToken(user)

        res.status(201).json({ token })


    } catch (error: any) {

        if (error?.code === 'P2002' && error.meta?.target?.includes('email')) {

            res.status(400).json({ message: 'el usuario ya existe!' })
            return

        }

        console.log(error)

    }

}


export const login = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    try {

        if (!email || !password) {
            res.status(400).json({ message: "faltan credenciales" })
            return
        }

        const user = await prisma.findUnique({ where: { email } })

        if (!user) {
            res.status(404).json({ message: "usuario no encontrado" })
            return
        }

        const passwrodMatch = compararCifrado(password, user.password)

        if (!passwrodMatch) {
            res.status(401).json({ message: "las credenciales no coinciden" })
            return
        }

        const token = generarToken(user)

        res.status(200).json({ user })


    } catch (error) {

        console.log(error)

    }



}