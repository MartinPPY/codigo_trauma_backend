import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import personalRoutes from './routes/personalRoutes'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:4200'],
    methods: 'GET,POST,PUT,PATCH.DELETE',
    credentials: true
}))

console.log('empezando servidor')

//RUTAS O ENDPOINTS
app.use('/personal', personalRoutes)

export default app
