import { Request, Response, NextFunction} from 'express'
import { bcryptPassword } from '../utils/auth'
import { safePromise } from '../utils/require-helpers'
import { createLogger } from '../utils/create-logger'
const log = createLogger("hash-password")

export default async (req: Request, res: Response, next: NextFunction) => {
  const functionName = "hashPassword"
  try {
    if(!req.body.password) {
      return res.status(422).json({
        status:422,
        message: "Validation Error"
      })
    }

    const [error, result] = await safePromise(bcryptPassword(req.body.password))
    if(error) {
      log.error(functionName, "Error while hashing password", error)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong"
      })
    }
    req.body.password = result
    next()
  } catch (error) {
    return res.status(500).json({
      status:500,
      message: "Something went wrong"
    })
  }
}