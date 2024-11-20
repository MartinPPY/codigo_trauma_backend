import { Request, Response } from "express";
import atencion from '../models/prisma/atencion'

//GET ALL
export const traerAtenciones = async (req: Request, res: Response): Promise<void> => {

    try {

        const atenciones = await atencion.findMany()
        res.status(200).json({ atenciones })

    } catch (error: any) {

        res.status(500).json({ message: 'Error en el servidor', error: error })

    }

}