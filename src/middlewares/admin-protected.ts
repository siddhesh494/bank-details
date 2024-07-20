import { Request, Response, NextFunction} from 'express'
import { bcryptPassword } from '../utils/auth'
import { safePromise } from '../utils/require-helpers'
import { createLogger } from '../utils/create-logger'
import { response } from '../utils/response-helpers'
import { MESSAGE_CODE } from '../config/message-code'
const log = createLogger("hash-password")

export default async (req: Request | any, res: Response, next: NextFunction) => {
  const functionName = "hashPassword"
  try {
    console.log(req.user)
    if(req.user.role === "ADMIN") {
      next()
    } else {
      return res.status(401).json(response({
        messageCode: MESSAGE_CODE.UNAUTHORIZED_ERROR,
        success: false
      }))
    }
  } catch (error) {
    return res.status(500).json({
      status:500,
      message: "Something went wrong"
    })
  }
}