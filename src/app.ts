import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()

app.use(express.json())


//rutas
app.use("/auth", authRoutes)

console.log("Inicializando servidor")

export default app