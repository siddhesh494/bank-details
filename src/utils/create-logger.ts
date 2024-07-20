'use strict';

import bunyan from 'bunyan';
import { httpContext } from './require-helpers';

export const createLogger = (loggerName: any) => {
  const bunyanConfig: any = {
    name: loggerName,
    level: 'trace'
  }

  const logger: any = bunyan.createLogger(bunyanConfig)

  const constructLogObj = (level: any) => {
    return (functionName: string, action: string, ...args: any) => {
      try {
        let errorType = "NA"
        if(level === "error") {
          if(args[0] instanceof Error) {
            errorType = "TECH"
          } else {
            errorType = "BUSNISS"
          }
        }
        logger[level]({
          apiHash: httpContext.get("ApiHash"),
          apiName: httpContext.get("ApiName"),
          logType: level,
          functionName,
          action,
          errorType,
        }, ...args)

      } catch (error) {
        logger.error("Error in fetching Api Hash")
        logger.error(error)
        logger[level](...args)
      }
    }
  }

  const logObj = {
    info: constructLogObj("info"),
    error: constructLogObj("error")
  }

  return logObj
}