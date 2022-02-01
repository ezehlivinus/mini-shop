import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('product_category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('product_categories')
        .onDelete('CASCADE')
      table
        .integer('product_sub_category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('product_sub_categories')
        .onDelete('CASCADE')
      table.string('title', 250).notNullable()
      table.text('description').notNullable()
      table.string('address', 250).notNullable()

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
