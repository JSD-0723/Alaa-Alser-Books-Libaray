import { Service } from 'typedi'
import AuthRepository from '../repositories/auth.repository'
import { ApiError } from '../utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { compareUserPassword } from '../models/user.model'

import { generateAccessToken } from '../utils/genrateToken'

@Service()
export default class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signin(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findUserByEmail(email)

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong email')
    }

    const isPasswordValid = await compareUserPassword(user, password)

    if (!isPasswordValid) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong password')
    }

    const token = generateAccessToken(user)

    return token
  }

  signup = async (email: string, password: string): Promise<any> => {
    const existingUser = await this.authRepository.findUserByEmail(email)

    if (existingUser) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'User with this email already exists'
      )
    }

    const newUser = await this.authRepository.createUser(email, password)

    newUser.password = ''

    if (!newUser) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create user'
      )
    }

    const token = generateAccessToken(newUser)

    return { token, newUser }
  }
}
