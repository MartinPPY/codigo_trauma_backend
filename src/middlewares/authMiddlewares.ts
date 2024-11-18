import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || 'autorizado!'

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'No tienes permisos para acceder!' })
        return
    }

    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) {
            console.log(err)
            res.status(403).json({ message: 'Prohibido acceder a este recurso!' })
            return
        }

        next()
    })



}