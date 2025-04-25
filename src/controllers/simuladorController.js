let simuladorProceso = null

export const iniciarSimulador = (req, res) => {
  const rutaSimulador = path.join(process.cwd(), 'simulador.js')

  simuladorProceso = exec(`node ${rutaSimulador}`, (error, stdout, stderr) => {
    if (error) console.error(`Error: ${error}`)
    if (stderr) console.error(`stderr: ${stderr}`)
    console.log(`stdout: ${stdout}`)
  })

  res.json({ message: 'Simulador iniciado' })
}

export const detenerSimulador = (req, res) => {
  if (simuladorProceso) {
    simuladorProceso.kill()
    simuladorProceso = null
    return res.json({ message: 'Simulador detenido' })
  }

  res.status(400).json({ message: 'No hay simulador en ejecución' })
}
