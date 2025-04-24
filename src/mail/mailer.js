import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.EMAIL_USER)
console.log(process.env.EMAIL_PASSWORD)

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // ← importante
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  

/* const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
}) */

export const enviarCorreo = (to, estado) => {
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Tu pedido cambió de estado',
        text: `Tu pedido ahora está: ${estado}`
    }, (err, info) => {
        if (err) {
            console.error('❌ Error al enviar correo:', err)
        } else {
            console.log('📧 Correo enviado:', info.response)
        }
    })
}
