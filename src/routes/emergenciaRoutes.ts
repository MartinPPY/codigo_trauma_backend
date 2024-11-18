import express from "express";
import { verificarToken } from "../middlewares/authMiddlewares";
import { generarEmergencia, traerEmergencias } from "../controllers/emergenciaController";

const router = express.Router()

router.post('/generar_emergencia', verificarToken, generarEmergencia)
router.get('/traer_emergencias', verificarToken, traerEmergencias)

export default router