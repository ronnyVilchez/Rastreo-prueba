import express from 'express'
import { actualizarEstado } from '../controllers/pedidoController.js'

const router = express.Router()

router.post('/actualizar-tramo', actualizarEstado)

export default router
