/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/ApiError'

export default class ErrorHandler {
  static handle = () => {
    return async (
      err: ApiError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const statusCode = err.statusCode || 500
      console.log('error occurred: ', err.toString(), statusCode)
      res.status(statusCode).send({
        success: false,
        message: err.message,
        rawErrors: err.rawErrors ?? [],
      })
    }
  }

  static initializeUnhandledException = () => {
    process.on('unhandledRejection', (reason: Error): Promise<any> => {
      console.log(reason.name, reason.message)
      console.log('UNHANDLED REJECTION! 💥 Shutting down...')
      throw reason
    })

    process.on('uncaughtException', (err: Error) => {
      console.log(err.name, err.message)
      console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
      process.exit(1)
    })
  }
}
