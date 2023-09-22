import { Service } from 'typedi'
import { Book } from '../models/book.model'
import { IBook } from '../types/books'

@Service()
export default class BookRepository {
  getAllBooks = async (): Promise<Book[]> => {
    return await Book.findAll()
  }

  createBook = async (book: IBook): Promise<Book> => {
    const { name, author, isbn } = book
    const newBook = await Book.create({ name, author, isbn })

    return newBook
  }

  findById = async (id: number): Promise<Book | null> => {
    return await Book.findByPk(id)
  }

  updateBook = async (
    id: number,
    updatedBookData: IBook
  ): Promise<[number, Book[]]> => {
    return await Book.update(updatedBookData, {
      where: { id },
      returning: true,
    })
  }

  deleteBook = async (id: number): Promise<number> => {
    return await Book.destroy({
      where: { id },
    })
  }
}
