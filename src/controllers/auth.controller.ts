import { Request, Response } from 'express'
import { Service } from 'typedi'
import AuthService from '../services/auth.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { SuccessResponse } from '../utils/SuccessResponse'
import { Controller, Middleware, Post } from '@overnightjs/core'
import { AuthRequest } from '../validations/auth.validatoins'
import RequestValidator from '../middlewares/RequestValidator'

@Service()
@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  @Middleware(RequestValidator.validate(AuthRequest))
  signIn = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const token = await this.authService.signin(email, password)

    res.cookie('jwt', token, {
      httpOnly: true,
    })

    return new SuccessResponse(token)
  })

  @Post('signUp')
  @Middleware(RequestValidator.validate(AuthRequest))
  signUp = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const { token, newUser } = await this.authService.signup(email, password)

    res.cookie('jwt', token, {
      httpOnly: true,
    })

    return new SuccessResponse({ token, newUser })
  })
}
