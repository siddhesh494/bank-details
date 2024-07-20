import { MongoClient } from "mongodb"
import { database } from "../config/database"

export class Database {
  private static instance: Database;
  public mongo!: MongoClient;

  private constructor () {};

  public static getInstance(): Database {
    if(!Database.instance) {
      Database.instance = new Database()
    } 
    return Database.instance
  }
  public static getMongoInstance() {
    return Database.instance.mongo.db(database.mongo.database)
  }
  public async initMongoDB() {
    this.mongo = new MongoClient(database.mongo.url)
    await this.mongo.connect()
  }
}