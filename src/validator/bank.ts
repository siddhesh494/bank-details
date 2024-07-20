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
    default:
      return joi.object({})
  }
}