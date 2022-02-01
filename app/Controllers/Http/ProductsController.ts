import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product'
import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory'
import _ from 'lodash'

export default class ProductsController {
  public async create({ request, response, auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    // console.log(user)
    if (!auth.use('api').isAuthenticated) {
      return response.unauthorized('Unauthorized')
    }
    try {
      const newProductSchema = schema.create({
        title: schema.string(),
        description: schema.string(),
        productCategoryId: schema.number(),
        productSubCategoryId: schema.number(),
        address: schema.string(),
      })

      const validData = await request.validate({ schema: newProductSchema })

      const newProduct = new Product()
      Object.assign(newProduct, validData)

      const productSubCategories = await ProductSubCategory.find(validData.productSubCategoryId)
      if (!productSubCategories) {
        return response.status(404).send({
          success: false,
          message: 'Product sub category not found',
        })
      }

      const productCategory = await ProductCategory.find(validData.productCategoryId)
      if (!productCategory) {
        return response.status(404).send({
          success: false,
          message: 'Product category not found',
        })
      }

      await user.related('products').save(newProduct)
      // const product = await Product.create(newProduct)

      return response.status(201).send({
        success: true,
        message: 'Product created successfully',
        data: newProduct,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).send({
        success: false,
        message: error.messages ? error.messages : error.message,
      })
    }
  }

  public async list({ request, response, auth }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()

      if (!auth.use('api').isAuthenticated) {
        return response.unauthorized('Unauthorized')
      }

      // belonging to this user
      // const products = await Product.query().where('user_id', user.id).preload('user')
      const products = await Product.query().preload('user')

      if (_.isEmpty(products)) {
        return response.status(404).send({
          success: false,
          message: 'No products found',
        })
      }

      return response.status(200).send({
        success: true,
        message: 'Products fetched successfully',
        data: products,
      })
    } catch (error) {
      return response.status(500).send({
        success: false,
        message: error.messages ? error.messages : error.message,
      })
    }
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()

      if (!auth.use('api').isAuthenticated) {
        return response.unauthorized('Unauthorized')
      }

      const product = await Product.find(params.id)

      if (!product) {
        return response.status(404).send({
          success: false,
          message: 'Product not found',
        })
      }

      const updateProductSchema = schema.create({
        title: schema.string.optional(),
        description: schema.string.optional(),
        productCategoryId: schema.number.optional(),
        productSubCategoryId: schema.number.optional(),
        address: schema.string.optional(),
      })

      const validData = await request.validate({ schema: updateProductSchema })

      Object.assign(product, validData)

      await product.save()

      return response.status(200).send({
        success: true,
        message: 'Product updated successfully',
        data: product,
      })
    } catch (error) {
      return response.status(500).send({
        success: false,
        message: error.messages ? error.messages : error.message,
      })
    }
  }

  public async retrieve({ request, response, auth, params }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()

      if (!auth.use('api').isAuthenticated) {
        return response.unauthorized('Unauthorized')
      }

      const product = await Product.find(params.id)

      if (!product) {
        return response.status(404).send({
          success: false,
          message: 'Product not found',
        })
      }

      return response.status(200).send({
        success: true,
        message: 'Product fetched successfully',
        data: product,
      })
    } catch (error) {
      return response.status(500).send({
        success: false,
        message: error.messages ? error.messages : error.message,
      })
    }
  }

  public async delete({ request, response, auth, params }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()

      if (!auth.use('api').isAuthenticated) {
        return response.unauthorized('Unauthorized')
      }

      const product = await Product.find(params.id)

      if (!product) {
        return response.status(404).send({
          success: false,
          message: 'Product not found',
        })
      }

      await product.delete()

      return response.status(200).send({
        success: true,
        message: 'Product deleted successfully',
      })
    } catch (error) {
      return response.status(500).send({
        success: false,
        message: error.message,
      })
    }
  }
}
