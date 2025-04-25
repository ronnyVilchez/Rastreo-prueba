import express from 'express'
import { actualizarEstado } from '../controllers/pedidoController.js'
import { iniciarSimulador } from '../controllers/simuladorController.js'

const router = express.Router()

router.post('/actualizar-tramo', actualizarEstado)
router.post('/simulador', iniciarSimulador)

export default router
