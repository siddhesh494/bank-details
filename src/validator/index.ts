import { VALIDATE_MODULE_NAMES } from "../config/validator-config";
import bankSchema from "./bank";

export default function getSchema(moduleName: string, routeName: string) {

  switch(moduleName) {
    case VALIDATE_MODULE_NAMES.bank.module:
      return bankSchema(routeName)
  }
}