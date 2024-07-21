

import * as express from "express"
import BankController from "../../controllers/bank"
import validator from "../../middlewares/request-body-validation"
import { VALIDATE_MODULE_NAMES } from "../../config/validator-config" 
const BANK = VALIDATE_MODULE_NAMES.bank

const router = express.Router()
const bankController = new BankController()

router.post("/getConsumer", validator(BANK.module, BANK.route.GET_CUSTOMER), bankController.getConsumer)
router.post("/getTransactions", validator(BANK.module, BANK.route.GET_TRANSACTION), bankController.getTransaction)
router.post("/getProducts", validator(BANK.module, BANK.route.GET_PRODUCTS), bankController.getDistinctProducts)
router.post("/getTransactionBelow", validator(BANK.module, BANK.route.GET_TRANSACTION_BELOW), bankController.getTransactionBelow)

export = router