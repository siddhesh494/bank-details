

import { Collection } from "mongodb";
import { Database } from "../../boot/databases"

const mongo = Database.getMongoInstance();

export class CustomersDA {
  private CustomersCollention: Collection
  constructor() {
    this.CustomersCollention = mongo.collection("customers")
  }

  public async findAllCustomer() {
    return this.CustomersCollention.find({active: true}).toArray()
  }
  
}