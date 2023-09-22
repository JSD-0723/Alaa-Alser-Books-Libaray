import { Service } from 'typedi'

import { Book } from '../models/book.model'
import { IBook } from '../types/books'
import BookRepository from '../repositories/book.repository'

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

  getBookById = async (id: number): Promise<Book | null> => {
    try {
      const book = await this.bookRepository.findById(id)
      return book || null
    } catch (error) {
      throw error
    }
  }

  updateBook = async (
    id: number,
    updatedBookData: IBook
  ): Promise<[number, Book[]]> => {
    try {
      const rowsUpdated = this.bookRepository.updateBook(id, updatedBookData)
      return rowsUpdated
    } catch (error) {
      throw error
    }
  }

  deleteBook = async (id: number): Promise<number> => {
    try {
      const rowsDeleted = await this.bookRepository.deleteBook(id)
      return rowsDeleted
    } catch (error) {
      throw error
    }
  }
}
