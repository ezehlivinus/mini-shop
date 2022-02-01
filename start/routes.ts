/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Route.get('posts', async ({ auth }) => {
//   await auth.use('basic').authenticate()

//   return `You are logged in as ${auth.user!.email}`
// })

Route.group(() => {
  // users
  Route.group(() => {
    Route.post('/', 'AuthController.create')
    Route.post('/login', 'AuthController.login')
  }).prefix('users')

  // products
  Route.group(() => {
    Route.post('/', 'ProductsController.create')
    Route.get('/', 'ProductsController.list')
    Route.get('/:id', 'ProductsController.retrieve')
    Route.put('/:id', 'ProductsController.update')
    Route.delete('/:id', 'ProductsController.delete')
  })
    .prefix('products')
    .middleware('auth:api')

  // categories
  Route.group(() => {
    Route.post('/', 'ProductCategoriesController.create')

    // Not implemented yet
    // Route.get('/', 'CategoriesController.list')
    // Route.get('/:id', 'CategoriesController.retrieve')
    // Route.put('/:id', 'CategoriesController.update')
    // Route.delete('/:id', 'CategoriesController.delete')
  })
    .prefix('categories')
    .middleware('auth:api')

  // product subcategories
  Route.group(() => {
    Route.post('/', 'ProductSubCategoriesController.create')

    // Not implemented yet
    // Route.get('/', 'ProductSubCategoriesController.list')
    // Route.get('/:id', 'ProductSubCategoriesController.retrieve')
    // Route.put('/:id', 'ProductSubCategoriesController.update')
    // Route.delete('/:id', 'ProductSubCategoriesController.delete')
  })
    .prefix('categories/:categoryId/subcategories')
    .middleware('auth:api')
}).prefix('api/v1')
