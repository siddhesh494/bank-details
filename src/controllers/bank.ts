import { Request, Response } from 'express'
import { createLogger } from "../utils/create-logger";
import { MESSAGE_CODE } from '../config/message-code';
import { response } from '../utils/response-helpers';
import BankService from '../services/bank'
import { safePromise } from '../utils/require-helpers';

const log = createLogger("bank-controller")


class BankController {
  private bankService = new BankService()

  constructor() {
    this.getConsumer = this.getConsumer.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.getDistinctProducts = this.getDistinctProducts.bind(this);
    this.getTransactionBelow = this.getTransactionBelow.bind(this)
  }

  public async getConsumer(req: Request | any, res: Response): Promise<any> {

    const functionName = "getConsumer-controller"
    try {
      const [error, result] = await safePromise(this.bankService.getConsumer())
      if(error) {
        log.error(functionName, "Error while getting consumer", error)
        return res.status(error?.messageCode?.status || 500).json(response(error))
      }

      return res.status(200).json(response({
        success: true,
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))  
    } catch (error) {
      return res.status(500).json(response({
        success: false,
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  public async getTransaction(req: Request | any, res: Response): Promise<any> {

    const functionName = "getTransaction-controller"
    try {
      const [error, result] = await safePromise(this.bankService.getTransaction(req.body))
      if(error) {
        log.error(functionName, "Error while getting transaction", error)
        return res.status(error?.messageCode?.status || 500).json(response(error))
      }

      return res.status(200).json(response({
        success: true,
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))  
    } catch (error) {
      return res.status(500).json(response({
        success: false,
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  public async getDistinctProducts(req: Request | any, res: Response): Promise<any> {

    const functionName = "getDistinctProducts-controller"
    try {
      const [error, result] = await safePromise(this.bankService.getDistinctProducts())
      if(error) {
        log.error(functionName, "Error while getting Distinct product", error)
        return res.status(error?.messageCode?.status || 500).json(response(error))
      }

      return res.status(200).json(response({
        success: true,
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))  
    } catch (error) {
      return res.status(500).json(response({
        success: false,
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  public async getTransactionBelow(req: Request | any, res: Response): Promise<any> {

    const functionName = "getTransactionBelow-controller"
    try {
      const [error, result] = await safePromise(this.bankService.getTransactionBelow(req.body))
      if(error) {
        log.error(functionName, "Error while getting getTransactionBelow", error)
        return res.status(error?.messageCode?.status || 500).json(response(error))
      }

      return res.status(200).json(response({
        success: true,
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))  
    } catch (error) {
      return res.status(500).json(response({
        success: false,
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

export default BankController