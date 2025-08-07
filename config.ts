import 'dotenv/config';

export const jwtSecret = process.env.JWT_SECRET_KEY

if (!jwtSecret) {
  // Lanza un error y detiene la aplicación si la clave no está definida
  throw new Error('JWT_SECRET_KEY no está definida en las variables de entorno.');
}