import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
//import { UserModel } from '../models/userModel.js'
//import { SECRET_KEY } from '../config/config.js'

/* export const authUser = async (req, res) => {
  const { usuario, password } = req.body

  const user = await UserModel.userLogin(usuario)
  if (user.length === 0) return res.status(400).json({ message: 'Usuario no existe' })

  const validacion = await compare(password, user[0].password)
  if (!validacion) return res.status(400).json({ message: 'Usuario o contraseña incorrecta' })

  const token = jwt.sign({ userId: user[0].userId }, SECRET_KEY, { expiresIn: '1h' })

  delete user[0].password
  res.json({
    token,
    user: user[0]
  })
} */

  export const authUser = async (req, res) => {
    const { usuario, password } = req.body;
  
    // Usuario y contraseña fijos
    const USUARIO_FIJO = 'repartidor';
    const PASSWORD_FIJO = '1234';
  
    if (usuario !== USUARIO_FIJO || password !== PASSWORD_FIJO) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrecta' });
    }
  
    // Puedes generar un token simple si lo deseas (opcional)
    const token = jwt.sign({ rol: 'repartidor' }, 'temporal', { expiresIn: '1h' });
  
    res.json({
      token,
      user: {
        nombre: 'Repartidor',
        rol: 'repartidor'
      }
    });
  };
  
