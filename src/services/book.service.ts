import { Service } from 'typedi'
import { StatusCodes } from 'http-status-codes'

import { Book } from '../models/book.model'
import { IBook } from '../types/books'
import BookRepository from '../repositories/book.repository'
import { ApiError } from '../utils/ApiError'

@Service()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  getAllBooks = async () => {
    return await this.bookRepository.getAllBooks()
  }

  createBook = async (book: IBook) => {
    const { name, author, isbn } = book

    return await this.bookRepository.createBook({ name, author, isbn })
  }

  getBookById = async (id: number) => {
    const book = await this.bookRepository.findById(id)

    if (!book) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found')
    }
    return book
  }

  updateBook = async (
    id: number,
    updatedBookData: IBook
  ): Promise<[number, Book[]]> => {
    const book = await this.bookRepository.findById(id)

    if (!book) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found')
    }
    const rowsUpdated = this.bookRepository.updateBook(id, updatedBookData)
    return rowsUpdated
  }

  deleteBook = async (id: number): Promise<number> => {
    const book = await this.bookRepository.findById(id)

    if (!book) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found')
    }

    const rowsDeleted = await this.bookRepository.deleteBook(id)
    return rowsDeleted
  }
}
