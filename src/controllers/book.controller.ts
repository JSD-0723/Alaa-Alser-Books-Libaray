import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core'
import { Request } from 'express'
import { Service } from 'typedi'

import { BookService } from '../services/book.service'
import { BookDTO } from '../DTO/book'
import { asyncWrapper } from '../utils/asyncWrapper'
import { SuccessResponse } from '../utils/SuccessResponse'
import { BookValidation } from '../validations/book.validations'
import RequestValidator from '../middlewares/RequestValidator'
import authMiddleware from '../middlewares/authMiddleware'

@Service()
@Controller('books')
export class BookController {
  constructor(public bookService: BookService) {}

  @Get('/')
  @Middleware(authMiddleware)
  getAllBooks = asyncWrapper(async () => {
    const books = await this.bookService.getAllBooks()
    return new SuccessResponse(books)
  })

  @Post('/')
  @Middleware(RequestValidator.validate(BookValidation))
  createBook = asyncWrapper(async (req: Request) => {
    const { name, author, isbn } = req.body
    const book = new BookDTO(name, author, isbn)
    const createdBook = await this.bookService.createBook(book)
    return new SuccessResponse(createdBook)
  })

  @Get(':id')
  getBookById = asyncWrapper(async (req: Request) => {
    const { id } = req.params
    const book = await this.bookService.getBookById(Number(id))

    return new SuccessResponse(book)
  })

  @Put(':id')
  updateBook = asyncWrapper(async (req: Request) => {
    const { id } = req.params
    const { name, author, isbn } = req.body
    const updatedBookData = new BookDTO(name, author, isbn)
    await this.bookService.updateBook(Number(id), updatedBookData)

    return new SuccessResponse(updatedBookData)
  })

  @Delete(':id')
  deleteBook = asyncWrapper(async (req: Request) => {
    const { id } = req.params
    const rowsDeleted = await this.bookService.deleteBook(Number(id))

    return new SuccessResponse(rowsDeleted)
  })
}
