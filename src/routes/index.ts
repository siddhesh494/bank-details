import { Application, Request, Response } from "express";
import path from "path"
import { promises as fsp } from 'fs'

export async function bindRoutes(app: Application): Promise<void> {
  await linkRoutes(app, "v1")
  app.get("healtCheck", (_req: Request, res: Response): Response => {
    return res.status(200).send("Service running");
  })
  return Promise.resolve()
}

async function linkRoutes(app: Application, version: string): Promise<void> {
  const routeFiles = await fsp.readdir(path.join(__dirname, version));

  routeFiles.forEach(async (r: string): Promise<string> => {
    const routeName = r.split('.')[0];

    app.use(`/api/${version}/${routeName}`, require(path.join(__dirname, version, routeName)))
    return r
  })
}