//import { notificarCambioUbicacion } from './controllers/pedidoController.js'

export default function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado:', socket.id)

    socket.on('unirsePedido', (pedidoId) => {
      socket.join(pedidoId)
      console.log(`📦 Cliente ${socket.id} se unió al pedido ${pedidoId}`)
    })

    socket.on('salirPedido', (pedidoId) => {
      socket.leave(pedidoId)
      console.log(`🚪 Cliente ${socket.id} salió del pedido ${pedidoId}`)
    })

    socket.on('ubicacion-repartidor', (data) => {
      const { pedidoId, ubicacion } = data
      console.log('📍 Ubicación recibida:', data)

      io.to(pedidoId).emit('ubicacion-repartidor', {
        pedidoId,
        ubicacion
      })
    })

    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado:', socket.id)
    })
  })
}

