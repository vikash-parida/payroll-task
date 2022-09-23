const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const app = express();

const swaggerDefinition = {
  info: {
    swagger: '2.0',
    title: 'job portal',
    description: 'job Portal APIs',
  },
  host: 'localhost:8080',
  basePath: '/api',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'jwt',
      in: 'header',
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};


app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


module.exports.swaggerSpec = swaggerJSDoc(options);


