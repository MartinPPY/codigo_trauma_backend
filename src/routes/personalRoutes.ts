import express from 'express'
import { getAllMedicos, login, personalByEmail, registrar, resetPassword } from '../controllers/personalController'
import { verificarToken } from '../middlewares/authMiddlewares'

const router = express.Router()

router.post('/registro', registrar)
router.post('/login', login)
router.get('/medicos', verificarToken, getAllMedicos)
router.get('/:email', personalByEmail)
router.put('/reset_password/:email', resetPassword)

export default router