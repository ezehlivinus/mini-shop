import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory'

export default class ProductSubCategoriesController {
  public async create({ request, response, auth, params }: HttpContextContract) {

    if (!auth.use('api').isAuthenticated) {
      return response.unauthorized('Unauthorized')
    }
    try {
      const newProductSubCategorySchema = schema.create({
        name: schema.string(),
        status: schema.number(),
      })

      const validData = await request.validate({ schema: newProductSubCategorySchema })

      const productCategory = await ProductCategory.find(params.categoryId)

      if (!productCategory) {
        return response.status(404).send({
          success: false,
          message: 'Product category not found',
        })
      }

      const newProductSubCategory = new ProductSubCategory()
      Object.assign(newProductSubCategory, validData)

      await productCategory.related('productSubCategories').save(newProductSubCategory)

      return response.status(201).send({
        success: true,
        message: 'Product sub category created successfully',
        data: newProductSubCategory,
      })
    } catch (error) {
      return response.status(500).send({
        success: false,
        message: error.messages ? error.messages : error.message,
      })
    }
  }
}
