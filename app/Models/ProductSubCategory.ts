import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import ProductCategory from './ProductCategory'

export default class ProductSubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public status: number

  @column()
  public productCategoryId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @belongsTo(() => ProductCategory)
  public productCategories: BelongsTo<typeof ProductCategory>
}
