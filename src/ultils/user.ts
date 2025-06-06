import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const genToken = (uid: string) => {
  return jwt.sign({ uid: uid }, process.env.JWT_SECRET || 'secret', {expiresIn: '30d'})
}