

import { Collection } from "mongodb";
import { Database } from "../../boot/databases"

const mongo = Database.getMongoInstance();

export class TransactionsDA {
  private TransactionsCollention: Collection
  constructor() {
    this.TransactionsCollention = mongo.collection("transactions")
  }

  public async findTransactionByAccountID(accountID: number) {
    return this.TransactionsCollention.findOne({account_id: accountID})
  }
  
}