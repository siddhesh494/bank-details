import { VALIDATE_MODULE_NAMES } from "../config/validator-config";
import { joi } from "../utils/require-helpers";
const RESTAURANT = VALIDATE_MODULE_NAMES.restaurant.route


export default function restaurantSchema(name: string): any {
  switch(name) {
    case RESTAURANT.CREATE:
      return joi.object({
        restaurantName: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        priceFor2: joi.string().required(),
        menu: joi.array().items(joi.object({
          categoryName: joi.string().required(),
          foodList: joi.array().items(joi.object({
            foodName: joi.string().required(),
            isVeg: joi.boolean().required(),
            price: joi.number().required()
          })).required()
        })).optional()
      })
    case RESTAURANT.GET:
      return joi.object({})
    case RESTAURANT.UPDATE:
      return joi.object({
        id: joi.string().required(),
        updateData: joi.object({
          restaurantName: joi.string().optional(),
          description: joi.string().optional(),
          location: joi.string().optional(),
          priceFor2: joi.string().optional(),
          menu: joi.array().items(joi.object({
            categoryName: joi.string().required(),
            foodList: joi.array().items(joi.object({
              foodName: joi.string().required(),
              isVeg: joi.boolean().required(),
              price: joi.number().required()
            })).required()
          })).optional()
        })
      })
    case RESTAURANT.DELETE:
      return joi.object({
        id: joi.string().required()
      })
    default:
      return joi.object({})
  }
}