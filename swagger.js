const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Real estate API',
    description: 'An extensive API for real estate.',
  },
  host:
    process.env.NODE_ENV === 'production'
      ? 'real-estate-space.herokuapp.com'
      : 'localhost:5500',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json', 'multipart/form-data'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Users',
      description: 'Endpoints for users',
    },
  ],
  definitions: {
    Users: {
      firstname: '',
      lastname: '',
      email: '',
      avatar: '',
      password: '',
      phone: '',
      role: '',
      enable: '',
      rating: '',
      badge: '',
      bio: '',
      createdAt: '',
    },
    RegisterUser: {
      $firstname: 'John',
      $lastname: 'Doe',
      $email: 'Doe@john.com',
      $password: '123456',
      $confirmPassword: '123456',
      $phone: '+2348122572924',
    },
    LoginUser: {
      $email: 'Doe@john.com',
      $password: '123456',
    },
    BooleanResponse: true,
    StringArrayResponse: ['my example'],
    StringResponse: 'my example',
    NumberResponse: 123,
    ErrorObjectResponse: {
      message: { $ref: '#/definitions/StringResponse' },
      statusCode: { $ref: '#/definitions/NumberResponse' },
      path: { $ref: '#/definitions/StringResponse' },
    },
    BoolenArrayResponse: [true],
    NumberArrayResponse: [123],
    FieldErrorResponse: {
      message: { $ref: '#/definitions/StringArrayResponse' },
      statusCode: { $ref: '#/definitions/NumberResponse' },
      path: { $ref: '#/definitions/StringArrayResponse' },
    },
  },
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Bearer Token',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => require('./server'));
