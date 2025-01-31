import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = 'your_secret_key' // Todo get from env
const JWT_EXPIRES_IN = '1h' // Todo get from env

export function generateJwtToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyJwtToken(token: string): object | string | boolean {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error(error) // Todo we can use Logger for this
    return false
  }
}

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex')

  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${salt}:${derivedKey.toString('hex')}`)
    })
  })
}

export const comparePassword = (password: string, storedHash: string) => {
  const [salt, key] = storedHash.split(':')

  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(timingSafeEqual(Buffer.from(key, 'hex'), derivedKey))
    })
  })
}
