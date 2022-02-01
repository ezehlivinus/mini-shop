import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

class UserSchema {
  public async create({ request }) {
    const newUserSchema = schema.create({
      email: schema.string({ trim: true }),
      password: schema.string(),
      username: schema.string(),
    })
    // return newUserSchema
    return await request.validate({ schema: newUserSchema })
  }
}

export default new UserSchema()
