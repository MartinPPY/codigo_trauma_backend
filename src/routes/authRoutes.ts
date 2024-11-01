import express from 'express'
import { registrar } from '../controllers/authController'

const router = express.Router()

router.use("/registro",registrar)

export default router