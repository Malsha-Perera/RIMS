var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();

const route = require('./controllers/route');
const route_1 = require('./controllers/inventoryController');
const route_2 = require('./controllers/recipieController');
const route_3 = require('./controllers/productController');
const route_4 = require('./controllers/salesController');
const Po_list=require('./controllers/Po_list');
const Po_route=require('./controllers/Po_route');
const route_5 = require('./controllers/usersController');
//middleware
app.use(cors({ origin: 'http://localhost:4200'}));
app.use(bodyparser.json());
app.use('/api',route);
app.use('/recipie',route_2);
app.use('/items', route_1);
app.use('/product', route_3);
app.use('/sales',route_4);
app.use('/api/p',Po_route);
app.use('/api/pi',Po_list);
app.use('/register',route_5);

//connect mongodb
mongoose.connect('mongodb://localhost:27017/ims');

//on connection
mongoose.connection.on('connected',function (ref) {
    console.log('port is up on port 27017');
});
    mongoose.connection.on('error',function(err){
        console.log(err);

    });

app.get('/',function(req,res){
    res.send('Hello world');

});

app.listen(3000, function(){
    console.log('port is up on port 3000');
});



