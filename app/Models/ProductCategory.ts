import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import ProductSubCategory from './ProductSubCategory'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasMany(() => ProductSubCategory)
  public productSubCategories: HasMany<typeof ProductSubCategory>
}
