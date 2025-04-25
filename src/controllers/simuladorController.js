// simuladorController.js
import { exec } from 'child_process'
import path from 'path'

export const iniciarSimulador = (req, res) => {
  const rutaSimulador = path.join(process.cwd(), 'simulador.js')

  exec(`node ${rutaSimulador}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar simulador: ${error}`)
      return res.status(500).json({ message: 'Error al iniciar simulador' })
    }

    console.log(`Simulador iniciado:\n${stdout}`)
    res.json({ message: 'Simulador en ejecución' })
  })
}
