import { enviarCorreo } from '../mail/mailer.js'

export const actualizarEstado = (req, res) => {
    const { pedidoId, nuevoEstado, correoCliente } = req.body
  
    if (!nuevoEstado || !correoCliente) {
      return res.status(400).json({ message: 'Faltan datos requeridos' })
    }
  
    enviarCorreo(correoCliente, nuevoEstado)
    res.json({ message: 'Estado actualizado y correo enviado' })
  }
  
export const notificarCambioUbicacion = (ubicacion) => {
  // Aquí podrías guardar la ubicación o simplemente loguearla
  console.log('Ubicación en backend:', ubicacion)
}
