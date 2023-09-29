import { Service } from 'typedi'
import User from '../models/user.model'

@Service()
export default class AuthRepository {
  findUserById = async (id: number): Promise<User | null> => {
    const user = await User.findByPk(id)
    return user
  }

  findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ where: { email } })
    return user
  }

  createUser = async (email: string, password: string): Promise<User> => {
    const newUser = await User.create({ email, password })
    return newUser
  }
}
