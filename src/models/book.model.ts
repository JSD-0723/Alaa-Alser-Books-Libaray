import { Model, Table, Column, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'books',
  timestamps: true,
})
export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  isbn!: string
}
