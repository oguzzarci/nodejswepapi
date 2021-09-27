const express = require('express');
const app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync('ssl/server.key', 'utf8');
var certificate = fs.readFileSync('ssl/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const swaggerui = require('swagger-ui-express');
swaggerJsonFile = require('./swagger.json');
app.use('/docui', swaggerui.serve, swaggerui.setup(swaggerJsonFile));

//Cors
const cors = require('cors');

app.use(cors({
    origin: '*',
    credentials: true
  }));

//Import Routes
const requestRoutes = require('./routers/request');

//MiddleWare yani arakatmanımızı tanımlıyoruz.
app.use(express.json());

//Route Middleware
app.use('/api',requestRoutes);


var httpsServer = https.createServer(credentials, app);

//Api 5000 portunu kullanacak.
app.listen(5000, () => console.log('Server Up and runnig'));
httpsServer.listen(8443);