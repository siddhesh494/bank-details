import { Application } from "express";
import { bindRoutes } from './../routes'

export class Route {
  public init(app: Application) {
    return new Promise<void>(async (resolve, reject) => {
      await bindRoutes(app)
      return resolve()
    })
  }
}