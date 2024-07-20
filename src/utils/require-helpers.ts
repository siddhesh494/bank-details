import httpContext from 'express-http-context'
import joi from 'joi'
import mung from 'express-mung'
import { v4 as uuid } from 'uuid'

const JWT_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "dEFAULT ACCESS tOKEn"

const env = process.env.NODE_ENV || 'Local'
const safePromise = (promise: Promise<unknown>): Promise<any[]> => promise.then(data => ([null, data])).catch(err => ([err,  null]))

export {
  httpContext,
  safePromise,
  joi,
  env,
  JWT_SECRET_KEY,
  mung,
  uuid
}