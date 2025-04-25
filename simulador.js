// simulador.js
import { io } from 'socket.io-client'

// Cambia esta URL por tu backend si es otra
const socket = io('https://rastreo-prueba.onrender.com', {
  transports: ['websocket'],
})

const ruta = [
  { lat: -12.056, lng: -77.085 },
  { lat: -12.055, lng: -77.084 },
  { lat: -12.054, lng: -77.083 },
  { lat: -12.053, lng: -77.082 },
  { lat: -12.052, lng: -77.081 },
]

let index = 0

socket.on('connect', () => {
  console.log('🟢 Conectado al servidor de WebSocket')

  setInterval(() => {
    const ubicacion = ruta[index]
    console.log('📍 Enviando ubicación:', ubicacion)

    socket.emit('ubicacion-repartidor', ubicacion)

    index = (index + 1) % ruta.length
  }, 3000) // cada 3 segundos
})

socket.on('disconnect', () => {
  console.log('🔴 Desconectado del servidor')
})
