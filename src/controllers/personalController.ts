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
                cargo: parseInt(cargo),
                fono: fono,
                password: hashedPassword,
                disponibilidad: 'Disponible'
            }
        })

        res.status(201).json({ message: 'registro exitoso!' })

    } catch (error: any) {

        if (error.meta.target == 'personal_email_key') {
            res.status(400).json({ message: 'Correo electronico ya esta vigente!' })
            return
        }

        if (error.meta.target == 'personal_fono_key') {
            res.status(400).json({ message: 'Numero de telefono ya esta vigente!' })
            return
        }

        res.status(500).json({ message: 'Error en el servidor', error: error })
        console.log(error)

    }

}

//LOGIN
export const login = async (req: Request, res: Response): Promise<void> => {

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
            res.status(404).json({ message: 'Usuario no existe!' })
            return
        }

        const passwordMatch = await compararPassword(password, user.password)

        if (!passwordMatch) {
            res.status(401).json({ message: 'las credenciales no coinciden!' })
            return
        }

        const token = generarToken(user)

        res.status(200).json({ token: token, email: user.email, cargo: user.cargo })

    } catch (error: any) {

        res.status(500).json({ message: 'error en el servidor!', error: error })
        console.log(error)

    }

}

//TRAER MEDICOS
export const getAllMedicos = async (req: Request, res: Response): Promise<void> => {

    try {

        const medicos = await prisma.findMany({
            where: {
                cargo: 3
            }
        })

        res.status(200).json({ medicos })

    } catch (error: any) {

        res.status(500).json({ message: 'error en el servidor!', error: error })
        console.log(error)

    }

}

//TRAER PERSONAL POR EMAIL
export const personalByEmail = async (req: Request, res: Response): Promise<void> => {
    const userEmail = req.params.email
    try {
        const user = await prisma.findUnique({ where: { email: userEmail } })
        if (!user) {
            res.status(404).json({ message: 'Usuario no existe!' })
            return
        }
        res.status(200).json(user)
    } catch (error: any) {
        res.status(500).json({ message: 'Error en el servidor!' })
    }

}

//RESET_PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
    const userEmail = req.params.email
    const { password } = req.body
    let dataToUpdate: any = { ...req.body }
    try {

        if (password) {
            const hashedPassword = await hashPassword(password)
            dataToUpdate.password = hashedPassword
        }

        await prisma.update({
            where: { email: userEmail },
            data: dataToUpdate
        })

        res.status(200).json({ message: 'Registro actualizado!' })

    } catch (error: any) {

        res.status(500).json({ message: 'Error en el servidor!' })
        console.log(error)

    }

}