import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core'
import { Request, Response } from 'express'
import { Service } from 'typedi'

import { BookService } from '../services/book.service'
import { BookDTO } from '../DTO/bookDto'
import { asyncWrapper } from '../utils/asyncWrapper'
import { SuccessResponse } from '../utils/SuccessResponse'
import { BookValidation } from '../validations/book.validations'
import RequestValidator from '../middlewares/RequestValidator'

@Service()
@Controller('books')
export class BookController {
  constructor(public bookService: BookService) {}

  @Get('/')
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
  getBookById = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params
    const book = await this.bookService.getBookById(Number(id))
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    return new SuccessResponse(book)
  })

  @Put(':id')
  updateBook = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, author, isbn } = req.body
    const updatedBookData = new BookDTO(name, author, isbn)
    const updateBook = await this.bookService.updateBook(
      Number(id),
      updatedBookData
    )
    if (updateBook[0] === 0) {
      return res.status(404).json({ error: 'Book not found' })
    }
    return new SuccessResponse(updatedBookData)
  })

  @Delete(':id')
  deleteBook = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params
    const rowsDeleted = await this.bookService.deleteBook(Number(id))
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Book not found' })
    }
    return new SuccessResponse(rowsDeleted)
  })
}
