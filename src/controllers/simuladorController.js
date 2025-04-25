// simuladorController.js
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

const pidPath = path.join(process.cwd(), 'simulador.pid')

export const iniciarSimulador = (req, res) => {
  if (fs.existsSync(pidPath)) {
    return res.status(400).json({ message: 'Simulador ya está en ejecución' })
  }

  const rutaSimulador = path.join(process.cwd(), 'simulador.js')
  const proceso = spawn('node', [rutaSimulador], {
    detached: true,
    stdio: 'ignore',
  })

  proceso.unref()

  // Guardamos el PID en un archivo
  fs.writeFileSync(pidPath, proceso.pid.toString())
  res.json({ message: 'Simulador iniciado' })
}

export const detenerSimulador = (req, res) => {
  if (!fs.existsSync(pidPath)) {
    return res.status(400).json({ message: 'No hay simulador en ejecución' })
  }

  const pid = parseInt(fs.readFileSync(pidPath, 'utf-8'))
  try {
    process.kill(pid)
    fs.unlinkSync(pidPath) // Eliminar el archivo para la próxima ejecución
    res.json({ message: 'Simulador detenido' })
  } catch (error) {
    console.error('Error al detener proceso:', error)
    res.status(500).json({ message: 'Error al detener el simulador' })
  }
}
