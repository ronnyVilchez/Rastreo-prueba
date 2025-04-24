import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Muestra las credenciales cargadas
console.log('Correo:', process.env.EMAIL_USER)
console.log('Contraseña:', process.env.EMAIL_PASSWORD)

// Crea el transportador de nodemailer con las credenciales de Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Usa STARTTLS
  auth: {
    user: process.env.EMAIL_USER,  // El correo de Gmail
    pass: process.env.EMAIL_PASSWORD,  // La contraseña de aplicación de Google
  },
  tls: {
    rejectUnauthorized: false // Esto ayuda a evitar errores en entornos de desarrollo
  }
})

// Función para enviar el correo de prueba
const enviarCorreoDePrueba = () => {
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'ronnyd.1994@gmail.com',  // Reemplaza con un correo de prueba
    subject: 'Prueba de conexión SMTP',
    text: 'Este es un correo de prueba para verificar la conexión SMTP de Gmail.'
  }, (err, info) => {
    if (err) {
      console.error('❌ Error al enviar correo:', err)
    } else {
      console.log('📧 Correo enviado:', info.response)
    }
  })
}

enviarCorreoDePrueba()
