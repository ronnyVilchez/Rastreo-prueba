import { notificarCambioUbicacion } from './controllers/pedidoController.js'

export default function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado:', socket.id)

    socket.on('ubicacion-repartidor', (data) => {
      console.log('📍 Ubicación recibida:', data)
      io.emit('ubicacion-actualizada', data)
      notificarCambioUbicacion(data)
    })

    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado:', socket.id)
    })
  })
}
