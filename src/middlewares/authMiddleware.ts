import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { ApiError } from '../utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import AuthRepository from '../repositories/auth.repository'

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED')
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    const userData: any = jwt.verify(token, config.jwtSecret as string)

    const email = userData && userData.email

    const authRepo = new AuthRepository()

    const user = await authRepo.findUserByEmail(email)

    if (user) {
      req.user = user
      return next()
    }
    return new ApiError(StatusCodes.UNAUTHORIZED, 'Not Authorize User!')
  } catch (error) {
    next(error)
  }
}

export default authMiddleware
