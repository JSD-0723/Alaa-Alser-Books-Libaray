import 'reflect-metadata'
import { Server } from '@overnightjs/core'
import { Container } from 'typedi'
import { Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'

import { initDB } from './models'
import { BookController } from './controllers/book.controller'
import ErrorHandler from './middlewares/ErrorHandler'
import { NotFoundError } from './utils/ApiError'
import { swaggerDocument } from '../swagger'

export class App extends Server {
  constructor() {
    super()
    this.applyMiddleWares()
    this.boostrap()
  }

  public start(): void {
    const port = process.env.PORT || 3000

    this.app.listen(port, () => {
      console.log('Server listening on port: ' + port)
    })
  }

  private applyMiddleWares() {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    const bookController = Container.get(BookController)
    super.addControllers([bookController])

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    this.app.use((req: Request, res: Response, next: NextFunction) =>
      next(new NotFoundError(req.path))
    )

    this.app.use(ErrorHandler.handle())
  }

  private async boostrap() {
    await initDB()
  }
}
