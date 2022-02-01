import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import _ from 'lodash'

export default class AuthController {
  public async create({ request, auth, response }: HttpContextContract) {
    try {
      const newUserSchema = schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        type: schema.enum(['admin', 'user'] as const),
        password: schema.string(),
        username: schema.string(),
      })

      const validData = await request.validate({ schema: newUserSchema })

      const userExist = await User.query().where('email', validData.email).first()
      if (!_.isEmpty(userExist)) {
        return response.status(409).send({
          success: false,
          message: 'User already exists',
        })
      }

      const newUser = await User.create(validData)

      let token = auth.use('api').attempt(newUser.email, validData.password)

      const JSONToken = (await token).toJSON()

      return response
        .header('token', JSONToken.token)
        .status(201)
        .send({
          success: true,
          message: 'User created successfully',
          data: { user: newUser, token: JSONToken },
        })
    } catch (error) {
      console.log(error)
      return response.status(500).send({
        success: false,
        message: error.messages ? error.messages : error.message,
      })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)

      return response.send({
        success: true,
        message: 'User logged in successfully',
        data: token,
      })
    } catch (error) {
      return response.status(500).send({
        success: false,
        message: error.messages,
      })
    }
  }
}
