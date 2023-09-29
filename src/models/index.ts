import { Sequelize } from 'sequelize-typescript'
import { Book } from './book.model'
import User from './user.model'
import config from '../config/config'

const sequelize = new Sequelize({
  host: config.dbHost,
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPassword,
  dialect: 'mysql',
  logging: false,
})

sequelize.addModels([User, Book])

export const initDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync({ force: true })
    console.log('Database synchronized.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
