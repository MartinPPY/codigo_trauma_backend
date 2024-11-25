import express from 'express'
import { verificarToken } from '../middlewares/authMiddlewares'
import { traerAtenciones, traerAtencionesById } from '../controllers/atencionController'

const router = express.Router()

router.get('/atenciones', verificarToken, traerAtenciones)
router.get('/atenciones/:id', verificarToken, traerAtencionesById)

export default router