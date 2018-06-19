var express = require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path= require('path');
var app = express();
const route=require('./routes/route');
const Po_list=require('./routes/Po_list');
const Po_route=require('./routes/Po_route');

//middleware
app.use(cors());
app.use(bodyparser.json());
app.use('/api',route);
app.use('/api/p',Po_route);
app.use('/api/pi',Po_list);

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



