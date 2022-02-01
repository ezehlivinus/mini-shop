import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import ProductSubCategory from './ProductSubCategory'
import User from './User'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public address: string

  @column()
  public productCategoryId: number

  @column()
  public productSubCategoryId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @belongsTo(() => ProductCategory)
  public productCategory: BelongsTo<typeof ProductCategory>

  @belongsTo(() => ProductSubCategory)
  public productSubCategory: BelongsTo<typeof ProductSubCategory>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // to add has many through relationship
}
