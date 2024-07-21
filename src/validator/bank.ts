import { VALIDATE_MODULE_NAMES } from "../config/validator-config";
import { joi } from "../utils/require-helpers";
const BANK = VALIDATE_MODULE_NAMES.bank.route


export default function bankSchema(name: string): any {
  switch(name) {
    case BANK.GET_TRANSACTION:
      return joi.object({
        accountID: joi.number().required()
      })
    case BANK.GET_CUSTOMER:
      return joi.object({})
    case BANK.GET_TRANSACTION_BELOW:
      return joi.object({
        amount: joi.number().required()
      })
    default:
      return joi.object({})
  }
}