import express from 'express'
import { getAllMedicos, login, registrar } from '../controllers/personalController'
import { verificarToken } from '../middlewares/authMiddlewares'

const router = express.Router()

router.post('/registro', registrar)
router.post('/login', login)
router.get('/medicos', verificarToken, getAllMedicos)

export default router