import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ProductCategory from 'App/Models/ProductCategory'

export default class ProductCategoriesController {
  public async create({ request, response, auth }: HttpContextContract) {
    try {

      const newProductCategorySchema = schema.create({
        name: schema.string(),
        status: schema.number(),
      })

      const validData = await request.validate({ schema: newProductCategorySchema })

      const newProductCategory = new ProductCategory()
      Object.assign(newProductCategory, validData)

      await newProductCategory.save()

      return response.status(201).send({
        success: true,
        message: 'Product category created successfully',
        data: newProductCategory,
      })
    } catch (error) {
      console.log(error)
      return response.status(500).send({
        success: false,
        message: error.messages ? error.messages : error.message,
      })
    }
  }
}
