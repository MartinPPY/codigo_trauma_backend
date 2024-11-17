import { Request, Response } from 'express';
import prisma from '../models/prisma/personal'
import { compararPassword, generarToken, hashPassword } from '../services/authServices';


//REGISTRO
export const registrar = async (req: Request, res: Response): Promise<void> => {

    const { nombre, apellido, cargo, fono, email, password } = req.body
    const datos: any = { nombre: nombre, apellido: apellido, cargo: cargo, fono: fono, email: email, password: password }
    const datosAProcesar = Object.keys(datos)

    try {

        for (let i = 0; i < datosAProcesar.length; i++) {

            const dato = datos[datosAProcesar[i]]

            if (!dato) {
                res.status(400).json({ message: `${datosAProcesar[i]} es requerido!` })
                return
            }
        }

        const hashedPassword = await hashPassword(password)

        await prisma.create({
            data: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                cargo: cargo,
                fono: fono,
                password: hashedPassword
            }
        })

        res.status(201).json({ message: 'registro exitoso!' })

    } catch (error: any) {

        res.status(500).json({ message: 'Error en el servidor', error: error })

    }

}

//LOGIN
export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {

        if (!email) {
            res.status(400).json({ message: 'email es requerido!' })
            return
        }

        if (!password) {
            res.status(400).json({ message: 'email es requerido!' })
            return
        }

        const user = await prisma.findUnique({ where: { email } })

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado!' })
            return
        }

        const passwordMatch = await compararPassword(password, user.password)

        if (!passwordMatch) {
            res.status(401).json({ message: 'las credenciales no coinciden!' })
            return
        }

        const token = generarToken(user)

        res.status(200).json({ token: token, user: user })

    } catch (error: any) {

        res.status(500).json({ message: 'error en el servidor!', error: error })

    }

}