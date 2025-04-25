import path from 'path';  // Usar la sintaxis ESM para importar 'path'
import { exec } from 'child_process';

let simuladorProceso = null;

export const iniciarSimulador = (req, res) => {
  try {
    const rutaSimulador = path.join(process.cwd(), 'simulador.js'); // Usando 'path' correctamente

    simuladorProceso = exec(`node ${rutaSimulador}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return res.status(500).json({ message: 'Error al iniciar simulador' });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
    });

    res.json({ message: 'Simulador iniciado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar simulador' });
  }
};

export const detenerSimulador = (req, res) => {
  if (simuladorProceso) {
    simuladorProceso.kill();
    simuladorProceso = null;
    return res.json({ message: 'Simulador detenido' });
  } else {
    return res.status(400).json({ message: 'No hay simulador en ejecución' });
  }
};
