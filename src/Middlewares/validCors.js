export const validCors = (req, res, next) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
   
    const { origin } = req.headers
  
    if (allowedOrigins.includes(origin) || !origin) {
      res.setHeader('Access-Control-Allow-Origin', origin ?? '*')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
      }
  
      return next()
    }
  
    res.status(403).json({ message: 'Error de CORS. Origen no permitido' })
  }
  