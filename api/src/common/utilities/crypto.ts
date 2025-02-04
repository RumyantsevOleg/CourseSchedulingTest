import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import * as jwt from 'jsonwebtoken'
import * as process from 'node:process'

// Todo we should have config service with data validation
// Todo we should have Access and Refresh tokens
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env
if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error('Invalid JWT_SECRET')
}

export function generateJwtToken(payload: object): string {
  // Todo we should not use any
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any })
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
