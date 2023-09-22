export const getBooks = {
  tags: ['Books'],
  descripti0on: 'Returns all books from the system',
  operationId: 'getBooks',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'A list of books.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              id: {
                type: 'number',
                description: 'Book ID',
              },
              name: {
                type: 'string',
                description: 'Book Name',
              },
              author: {
                type: 'string',
                description: 'Book Email',
              },
              isbn: {
                type: 'string',
                description: 'Book isbn',
              },
            },
          },
        },
      },
    },
  },
}

export const getBookById = {
    tags: ['Books'],
    description: 'Get a single book by ID',
    operationId: 'getBookById',
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of the book to retrieve',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'A single book.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'Book ID',
                },
                name: {
                  type: 'string',
                  description: 'Book Name',
                },
                author: {
                  type: 'string',
                  description: 'Book Author',
                },
                isbn: {
                  type: 'string',
                  description: 'Book ISBN',
                },
              },
            },
          },
        },
      },
    },
  };
  
  export const createBook = {
    tags: ['Books'],
    description: 'Create a new book',
    operationId: 'createBook',
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Book Name',
              },
              author: {
                type: 'string',
                description: 'Book Author',
              },
              isbn: {
                type: 'string',
                description: 'Book ISBN',
              },
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'The created book.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'Book ID',
                },
                name: {
                  type: 'string',
                  description: 'Book Name',
                },
                author: {
                  type: 'string',
                  description: 'Book Author',
                },
                isbn: {
                  type: 'string',
                  description: 'Book ISBN',
                },
              },
            },
          },
        },
      },
    },
  };
  
  export const updateBook = {
    tags: ['Books'],
    description: 'Update an existing book',
    operationId: 'updateBook',
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of the book to update',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Updated Book Name',
              },
              author: {
                type: 'string',
                description: 'Updated Book Author',
              },
              isbn: {
                type: 'string',
                description: 'Updated Book ISBN',
              },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'The updated book.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'Book ID',
                },
                name: {
                  type: 'string',
                  description: 'Book Name',
                },
                author: {
                  type: 'string',
                  description: 'Book Author',
                },
                isbn: {
                  type: 'string',
                  description: 'Book ISBN',
                },
              },
            },
          },
        },
      },
    },
  };
  
  export const deleteBook = {
    tags: ['Books'],
    description: 'Delete a book by ID',
    operationId: 'deleteBook',
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of the book to delete',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '204': {
        description: 'Book deleted successfully.',
      },
    },
  };
  