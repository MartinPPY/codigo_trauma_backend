import { Request, Response } from "express";
import emergencia from '../models/prisma/emergencia'
import atencion from '../models/prisma/atencion'

export const generarEmergencia = async (req: Request, res: Response): Promise<void> => {

    const { descripcion, victimas, fecha } = req.body
    const datos: any = { descripcion: descripcion, victimas: victimas, fecha: fecha }
    const datosAProcesar = Object.keys(datos)

    try {

        for (let i = 0; i < datosAProcesar.length; i++) {
            const dato = datos[datosAProcesar[i]]
            if (!dato) {
                res.status(400).json({ message: `${datosAProcesar[i]} es requerido!` })
                return
            }
        }

        await emergencia.create({
            data: {
                descripcion: descripcion,
                fecha: fecha,
                victimas: victimas
            }
        })

        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0')
        const dia = String(fechaActual.getDate()).padStart(2, '0')

        const fechaFormateada = `${anio}-${mes}-${dia}`;

        await atencion.create({
            data: {
                descripcion: descripcion,
                estado: 'No atendida',
                fecha: fechaFormateada,
                medico: 'N/A',
                victimas: parseInt(victimas)
            }
        })

        res.status(201).json({ message: 'Emergencia Registrada!' })

    } catch (error: any) {

        console.log(error)
        res.status(500).json({ message: 'Error en el servidor!', error: error })

    }
}

export const traerEmergencias = async (req: Request, res: Response): Promise<void> => {

    try {

        const emergencias = await emergencia.findMany()
        res.status(200).json({ emergencias })


    } catch (error: any) {

        console.log(error)
        res.status(500).json({ message: 'Error en el servidor!', error: error })

    }
}
