import { Request, Response } from "express";
import cargo from "../models/prisma/cargo"

//GET ALL
export const getAllCargos = async (req: Request, res: Response): Promise<void> => {

    try {

        const cargos = await cargo.findMany()
        res.status(200).json({ cargos })

    } catch (error: any) {

        res.status(500).json({ message: "cargos no cargados!", error: error })

    }

}