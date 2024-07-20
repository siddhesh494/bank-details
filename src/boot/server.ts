import express, { Application } from 'express'
import type { Server } from "http"
import { createLogger } from './../utils/create-logger'
const log = createLogger("Server.js")

const app: Application = express()
const port = process.env.PORT

let server: Server
try {
  server = app.listen(port)
} catch (error: any) {
  log.error("main-server", `Error occureed: ${error.message}`)
}

export { app, server }