import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductSubCategories extends BaseSchema {
  protected tableName = 'product_sub_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 255).notNullable()
      table.tinyint('status').nullable()
      table
        .integer('product_category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('product_categories')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
