const express = require('express');
const app = express();

const swaggerui = require('swagger-ui-express');
swaggerJsonFile = require('./swagger.json');
app.use('/docui', swaggerui.serve, swaggerui.setup(swaggerJsonFile));

//Cors
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

//Import Routes
const requestRoutes = require('./routers/request');

//MiddleWare yani arakatmanımızı tanımlıyoruz.
app.use(express.json());

//Route Middleware
app.use('/api',requestRoutes);


//Api 5000 portunu kullanacak.
app.listen(5000, () => console.log('Server Up and runnig'));