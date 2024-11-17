import express from 'express'
import { getAllCargos } from '../controllers/cargoController'

const router = express.Router()

router.get('/all_cargos', getAllCargos)

export default router