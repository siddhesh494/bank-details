import bcrypt from 'bcrypt'
import jwt, { verify } from 'jsonwebtoken'
import { UserRequiredBody } from '../interface/user'
import { createLogger } from './create-logger'
import { JWT_SECRET_KEY } from './require-helpers'
import crypto from 'crypto'

const log = createLogger("auth-utilities")

export async function bcryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export async function checkPassword(planTextPassword: string, hashedPassword: string) {
  const result = await bcrypt.compare(planTextPassword, hashedPassword)
  return result
}

export function signAccessToken(data: UserRequiredBody) {
  return new Promise((resolve, reject) => {
    const payload = {
      ...data
    }

    const secret = JWT_SECRET_KEY
    const options = {
      expiresIn: "24h",
      issuer: 'ratemycollege.com',
      audience: data.email
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if(err) 
        return reject(err)

      return resolve(token)
    })

  })
}

export function validateJsonWebToken(token: string) {
  const functionName = "validateJsonWebToken"
  return new Promise((resolve, reject) => {
    log.info(functionName, "validate json token", token)
    verify(token, JWT_SECRET_KEY, async (error: any, decoded: any) => {
      if(error) {
        log.error(functionName, "Toen error", error)
        return reject({
          status:401,
          message: "Unauthorized Access"
        })
      }

      delete decoded.iat
      delete decoded.exp

      if(!decoded && !decoded.token) {
        log.error(functionName, "no data found, token is not present")
        return reject({
          status:401,
          message: "Unauthorized Access"
        })
      }
      if(!decoded && !decoded.email) {
        log.error(functionName, "email not present")
        return reject({
          status:401,
          message: "Unauthorized Access"
        })
      }

      return resolve(decoded)

    })
  })
}

export function createResetPasswordToken() {
  const resetToken = crypto.randomBytes(32).toString('hex')

  const hashResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  return {resetToken, hashResetToken}
}

export function enCryptCryptoToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}