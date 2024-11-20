import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import personalRoutes from './routes/personalRoutes'
import cargoRoutes from './routes/cargoRoutes'
import emergenciaRoutes from './routes/emergenciaRoutes'
import atencionRoutes from './routes/atencionRoutes'
dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

console.log('empezando servidor')

//RUTAS O ENDPOINTS
app.use('/personal', personalRoutes)
app.use('/cargo', cargoRoutes)
app.use('/emergencia', emergenciaRoutes)
app.use('/atencion', atencionRoutes)

export default app
