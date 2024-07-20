

import { Collection } from "mongodb";
import { Database } from "../../boot/databases"

const mongo = Database.getMongoInstance();

export class AccountsDA {
  private AccountsCollention: Collection
  constructor() {
    this.AccountsCollention = mongo.collection("accounts")
  }

  public async getDistinctProducts() {
    return this.AccountsCollention.distinct('products')
  }
  
}