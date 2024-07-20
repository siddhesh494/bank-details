import { Request, Response, NextFunction } from 'express'
import getSchema from '../validator'
import { map, replace } from 'lodash'

export default function validator(module: string, route: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const schema = getSchema(module, route)

    let validatorErr = validate(req.body, schema);
    if(!validatorErr) {
      next()
    } else {
      validatorErr = map(validatorErr, (err) => {
        err = replace(err, /"/g, '');
        return err
      })
      return res.status(422).json({
        status: 422,
        message: "Validation Error",
        data: validatorErr
      })
    }
  }
}

function validate(data: object, schema: any): any {
  try {
    const result = schema.validate(data, { abortEarly: false })
    if(result.error) {
      const errors = map(result.error.details, 'message')
      return errors
    } else {
      return
    }
  } catch (error) {
    return "Failed to validate";
  }
}