import { NextFunction, Response, Request } from "express";
// import { createLogger } from "../utils/create-logger";
import { httpContext, uuid } from "../utils/require-helpers";

// const log = createLogger("request-Interceptor")

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  const functionName = "request-Interceptor"
  const apiID = uuid()
  const apiUrl = req.originalUrl.replace("/api/v1", '')
  req.headers.apiHash = apiID
  httpContext.set("ApiHash",apiID)
  httpContext.set("ApiName", apiUrl)

  next()
}