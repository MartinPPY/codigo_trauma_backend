import express from 'express'
import { registrar } from '../controllers/personalController'

const router = express.Router()

router.post('/registro', registrar)

export default router