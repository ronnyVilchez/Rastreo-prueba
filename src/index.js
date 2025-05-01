import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import pedidoRoutes from './Routes/pedidos.routes.js'
import authRoutes from './Routes/auth.routes.js'
import setupSocket from './socket.js'
import { validCors } from './Middlewares/validCors.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: '*' }
})

app.use(validCors)
app.use(express.json())
app.use('/api/pedidos', pedidoRoutes)
app.use('/api/auth',authRoutes)

setupSocket(io) // delegamos el manejo de sockets

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
