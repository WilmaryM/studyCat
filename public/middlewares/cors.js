import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  'http://localhost:52330', // 👈 Agregado
  'https://', // <-- este es muy general, mejor eliminarlo o poner dominios reales
  'http://127.0.0.1:5500' // 👈 nuevo
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      console.log('Solicitud desde:', origin)
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true // 👈 añade esto si usarás JWT o sesione
  })
