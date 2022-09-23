require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const routerIndex= require('./routes');
const swaggerUi = require('swagger-ui-express');
 

app.use(express.json({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const swagger = require('./swagger');
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swagger.swaggerSpec))

// // test app

// app.get('/api/rolling', (req, res) => {
//     let userdata = req.userData;
//     // console.log(userdata);
//    res.status(200).send(userdata);
// });


app.use('/api', routerIndex);

app.use((req, res) => {
    res.status(404).json({
        message: "URL not found"
    });
});



module.exports = app;