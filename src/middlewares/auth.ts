// import { Request, Response, NextFunction} from 'express'
// import { createLogger } from '../utils/create-logger'
// import { OPEN_ROUTE } from '../config/constant'
// import { safePromise } from '../utils/require-helpers'
// import { validateJsonWebToken } from '../utils/auth'
// import UserDA from '../dal/mysql/user'
// import { isEmpty } from 'lodash'


// const userDA = new UserDA()
// const log = createLogger("auth-middleware")

// module.exports = async (req: Request | any, res: Response, next: NextFunction) => {
//   const functionName="authMiddleware"
//   log.info(functionName, "request:::body", req.body)
//   log.info(functionName, "request:::headers", req.headers)
//   log.info(functionName, "request:::cookies", req.cookies)
  
//   if(OPEN_ROUTE.indexOf(req.path) > -1) {
//     return next()
//   } else if(req.cookies.authtoken || req.headers.authtoken){
//     const token = req.cookies.authtoken || req.headers.authtoken
//     const [decodedTokenErr, decodedTokenRes] = await safePromise(validateJsonWebToken(token))
//     if(decodedTokenErr) {
//       return res.status(decodedTokenErr.status || 500).json(decodedTokenErr)
//     }
//     if(!decodedTokenRes.email) {
//       log.error(functionName, "email not found")
//       return res.status(401).json({
//         status:401,
//         message: "Unauthorized Access"
//       })
//     }

//     const [userErr, userRes] = await safePromise(userDA.findByEmail(
//       decodedTokenRes.email,
//       ['UserID as userID', 'Username as username', 'Email as email', 'Role as role', 'CollegeID as collegeID']
//     ))
//     if(userErr) {
//       log.error(functionName, "Error while geting user", userErr)
//       return res.status(500).json({
//         status:500,
//         message: "Failed"
//       })
//     }
//     if(isEmpty(userRes)) {
//       log.error(functionName, "User not found, Token Res:", decodedTokenRes)
//       return res.status(401).json({
//         status:401,
//         message: "Unauthorized Access"
//       })
//     }

//     log.info(functionName, "user details", userRes)
//     req.user = userRes[0]

//   } else {
//     return res.status(401).json({
//       message: "Unauthorized Access",
//       status:401
//     })
//   }
//   return next()
// }