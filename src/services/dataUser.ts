import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../../config'

export const dataUser = (key: string) => {
  if (!key) {
    return false
  } else {
    return jwt.verify(key, JWT_SECRET_KEY)
  }
}