const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const route = require('./route');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerUi = require('swagger-ui-express');

let port = 3000;
let host = 'localhost';


//Initializing Swagger 
const options = {
    info: {
      version: '1.0.0',
      title: 'Translate API'
    },
    baseDir: __dirname,
    filesPattern: './route.js',
    swaggerUIPath: '/docs'
  };

//Create application
const app = express();

//Intializing swagger
expressJSDocSwagger(app)(options);

//Mount middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

//Mounting routes
app.use('/', route);

//Error handling
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.listen(port, () => {
    console.log(`Transalte app is listening on http://${host}:${port}`);
});