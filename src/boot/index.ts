import { Middleware } from "./middleware";
import { Route } from "./route";
import { constants } from "./../config";
import { createLogger } from "./../utils/create-logger";
// import { env } from "../utils/require-helpers";
import type { Server } from "http"
import type { Application } from 'express'
import figlet from 'figlet';
import chalk from 'chalk';
import { Database } from "./databases";

const log = createLogger("BOOT_INDEX");

(async (): Promise<any> => {

  let app: Application
  let server: Server

  const functionName = "server-boot";
  try {
    const db = Database.getInstance()
    const middleware = new Middleware()
    const route = new Route()

    if(process.env.NODE_ENV === 'production') {
      // require('./../')
    }

    console.log(chalk.bold.blueBright(functionName, `     initiating server boot....`));

    ({ app, server } = await require('./server'));
    require("./../config")
    console.log(chalk.bold.blueBright(functionName, `     application config loaded.`))

    await db.initMongoDB();
    console.log(chalk.bold.blueBright(functionName, `     mongoDB database connection establish.`))

    // await mySqlHelper.initMySQLConnection(database.mysql)
    // console.log(chalk.bold.blueBright(functionName, `     Mysql Database connection established.`))

    await middleware.init(app);
    console.log(chalk.bold.blueBright(functionName, `     Middlewares linking complete.`))
    
    await route.init(app);
    console.log(chalk.bold.blueBright(functionName, `     routes registration complete.`))

    console.log(figlet.textSync(`** APNA BANK **`))

    process
      .on('unhandledRejection', (err: Error) => {
        log.error("unhandledRejection", "reason for exiting the server", err)
        log.error("unhandledRejection", "server closed", "(Http server closed)")
        server.close();
        setTimeout(() => {
          log.error("unhandledRejection", "process exiting", "(existing process)")
          process.exit(1)
        }, constants.PROCESS_EXIST_TIME)
      })
      .on('uncaughtException', (err: Error) => {
        log.error("uncaughtException", "uncaught exception", err)
      })
      .on('beforeExit', code => {
        setTimeout(() => {
          log.error("uncaughtException", `process will exit with code: ${code}`)
          process.exit(code)
        }, 1000)
      })

  } catch (error) {
    log.error(functionName, "catch", error)
    setTimeout(() => {
      process.exit(1)
    }, constants.PROCESS_EXIST_TIME)
  }

})();