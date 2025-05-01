import express from 'express'
import { actualizarEstado } from '../controllers/pedidoController.js'
import { detenerSimulador, iniciarSimulador } from '../controllers/simuladorController.js'

const router = express.Router()

router.post('/actualizar-tramo', actualizarEstado)
router.post('/simulador', iniciarSimulador)
router.post('/detener-simulador', detenerSimulador)

export default router
