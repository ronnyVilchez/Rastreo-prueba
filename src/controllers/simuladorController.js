import path from 'path';  // Usar la sintaxis ESM para importar 'path'
import { exec } from 'child_process';

let simuladorProceso = null;
let simuladorActivo = false; // <--- Nueva variable

export const iniciarSimulador = (req, res) => {
  if (simuladorActivo) {
    return res.status(400).json({ message: 'Simulador ya está en ejecución' });
  }

  const rutaSimulador = path.join(process.cwd(), 'simulador.js');
  simuladorProceso = exec(`node ${rutaSimulador}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      simuladorActivo = false;
      return;
    }
    if (stderr) console.error(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
  });

  simuladorActivo = true;
  res.json({ message: 'Simulador iniciado' });
};

export const detenerSimulador = (req, res) => {
  if (simuladorProceso) {
    simuladorProceso.kill();
    simuladorProceso = null;
    simuladorActivo = false;
    return res.json({ message: 'Simulador detenido' });
  } else {
    return res.status(400).json({ message: 'No hay simulador en ejecución' });
  }
};