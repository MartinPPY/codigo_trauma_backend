import jwt from 'jsonwebtoken'
import { user } from '../models/user.interface'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'autorizado'
const SALT_ROUNDS: number = 10

export const generarToken = (user: user): string => {

    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })

}

export const cifrarPassword = async (password: string): Promise<string> => {

    return await bcrypt.hash(password, SALT_ROUNDS)

}

export const compararCifrado = async (password: string, hash: string): Promise<boolean> => {

    return await bcrypt.compare(password, hash)

}