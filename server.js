const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

// Initialize Express
const app = express();

// Set up static file serving for images
app.use('/Images', express.static(path.join(__dirname, 'Images')));

// Initialize json-server router
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use default json-server middlewares
app.use(middlewares);

// Set up the API at /api endpoint
app.use('/api', router);

// Start server
app.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
