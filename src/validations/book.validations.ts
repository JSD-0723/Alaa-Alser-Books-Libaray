import { IsNotEmpty } from 'class-validator'

export class BookValidation {
  @IsNotEmpty()
  name: string = ''

  @IsNotEmpty()
  author: string = ''

  @IsNotEmpty()
  isbn: string = ''
}
