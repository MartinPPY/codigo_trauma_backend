import { Request, Response } from 'express';
import prisma from '../models/prisma/personal'
import { hashPassword } from '../services/authServices';

export const registrar = async (req: Request, res: Response): Promise<void> => {

    const { nombre, apellido, cargo, fono, email, password } = req.body
    const datos = { nombre: nombre, apellido: apellido, cargo: cargo, fono: fono, email: email, password: password }
    const datosAProcesar = Object.keys(datos)

    try {

        const hashedPassword = await hashPassword(password)

        const user = await prisma.create({
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

        res.status(500).json({ message: 'Error en el servidor' })
        console.log(error)

    }

}