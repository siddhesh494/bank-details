import { forEach, isEmpty, map, orderBy } from "lodash"
import { MESSAGE_CODE } from "../config/message-code"
import { CustomersDA } from "../dal/mongo/customers"
import { createLogger } from "../utils/create-logger"
import { safePromise } from "../utils/require-helpers"
import { TransactionsDA } from "../dal/mongo/transactions"
import { AccountsDA } from "../dal/mongo/accounts"

const log = createLogger("bank-service")

class BankService {
  private customersDA = new CustomersDA()
  private transactionsDA = new TransactionsDA()
  private accountsDA = new AccountsDA()

  constructor() {
    this.getConsumer = this.getConsumer.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.getDistinctProducts = this.getDistinctProducts.bind(this)
  }

  public async getConsumer(): Promise<any> {
    const functionName = "getConsumer-service"
    const [customerErr, customerRes] = await safePromise(this.customersDA.findAllCustomer())
    if(customerErr) {
      log.error(functionName, "Error while getting customer")
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }

    const result:any = []
    forEach(customerRes, (c) => {
      forEach(c.accounts, (a) => {
        result.push({
          _id: c._id,
          username: c.username,
          name: c.name,
          address: c.address,
          account: a
        })
      })
    })
    return result
  }

  public async getTransaction(data: {accountID: number }): Promise<any> {

    const functionName = "getTransaction-service"
    const [customerErr, customerRes] = await safePromise(this.transactionsDA.findTransactionByAccountID(data.accountID))
    if(customerErr) {
      log.error(functionName, "Error while getting transaction")
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    if(!customerRes || !customerRes.transactions || isEmpty(customerRes.transactions)) {
      return {}
    }
    const result = {...customerRes, transactions: orderBy(customerRes.transactions, "date", "desc")}
    return result
  }

  public async getDistinctProducts(): Promise<any> {

    const functionName = "getDistinctProducts-service"
    const [productErr, productRes] = await safePromise(this.accountsDA.getDistinctProducts())
    if(productErr) {
      log.error(functionName, "Error while getting distinct products", productErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return productRes || []
  }

}

export default BankService