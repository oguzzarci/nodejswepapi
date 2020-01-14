const express = require('express');
const app = express();

//Import Routes
const requestRoutes = require('./routers/request');

//MiddleWare yani arakatmanımızı tanımlıyoruz.
app.use(express.json());

//Route Middleware
app.use('/api',requestRoutes);


//Api 5000 portunu kullanacak.
app.listen(5000, () => console.log('Server Up and runnig'));