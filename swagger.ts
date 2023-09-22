import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from './src/open-api/books'

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'Library API',
    termsOfService: '',
    contact: {
      name: 'Alaa Alser',
      email: 'alaalsser@gmail.com',
      url: 'https://github.com/Alaalser',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  tags: [
    {
      name: 'Books',
    },
  ],
  paths: {
    '/books': {
      get: getBooks,
      post: createBook,
    },
    '/books/{id}': {
      get: getBookById,
      put: updateBook,
      delete: deleteBook,
    },
  },
  servers: [
    {
      url: 'http://localhost:4000/',
      description: 'Local server',
    },
    {
      url: 'https://production_url/',
      description: 'Production Env',
    },
  ],
}
