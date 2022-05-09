require('dotenv').config(); //? for use enviroment variables
const morgan = require ('morgan');
const cookieParser = require('cookie-parser');
const routes = require ('./src/routes/index.js');
//connect con db
const express = require ('express');
const server = express();
const { dbConnection } = require('./src/databse/config'); 
var cors = require('cors')

//? lista blanca con cors solo permitidos
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }
dbConnection();

//settings
server.set('port', process.env.PORT || 4000);

//middlewares
server.use(morgan('dev'));
server.use(express.json());

server.use(cookieParser());
server.use(cors()) //? cors para que se pueda hacer peticiones desde otro dominio 
//? cors options 
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); 
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

server.use('/', routes);

//control de errores
server.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

//listener
server.listen(server.get('port'), () => {
    console.log('server on port', server.get('port'));
})