import express from 'express'
import { verificarToken } from '../middlewares/authMiddlewares'
import { traerAtenciones } from '../controllers/atencionController'

const router = express.Router()

router.get('/atenciones', verificarToken, traerAtenciones)

export default router