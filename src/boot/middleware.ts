import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { httpContext } from './../utils/require-helpers'
import { list } from './../middlewares'

export class Middleware {

  public init(app: Application) {
    return new Promise<void>((resolve, _reject) => {
      app.use(cors({
        origin: (_origin: any, callback: any) => {
          return callback(null, true)
        },
        credentials: true
      }));
      app.use(cookieParser());
      app.use(express.json({ limit: '1mb'}));
      app.use(httpContext.middleware)
      list.forEach((m) => {
        app.use(require(m))
        return m
      });
      app.use(express.urlencoded({
        extended: true,
        limit: '1mb'
      }))
      return resolve()
    })
  }
}