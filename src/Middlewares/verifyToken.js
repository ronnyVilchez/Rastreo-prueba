import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).json({ message: 'No se proporcionó token' })

    const decoded = jwt.verify(authorization, 'temporal') // Usa la misma clave secreta del login

    // Simulamos el "usuario" desde el token
    req.user = {
      nombre: 'Repartidor',
      rol: decoded.rol || 'repartidor',
    }

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' })
    }
    res.status(401).json({ message: 'Token inválido' })
  }
}

export const infoUser = (req, res) => {
  res.json(req.user)
}





/* import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'
import { UserModel } from '../models/userModel.js'
export const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, SECRET_KEY)
    const user = await UserModel.userId(decoded.userId)
    if (user.length === 0) return res.status(404).json({ message: 'El token es incorrecto' })
    delete user[0].password
    req.user = user[0]
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) { return res.status(400).json({ message: 'Token expirado' }) }
    res.status(500).json({ message: error.message })
  }
}

export const infoUser = async (req, res) => {
  res.json(req.user)
}
 */