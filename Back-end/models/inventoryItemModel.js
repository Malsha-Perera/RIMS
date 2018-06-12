const mongoose = require('mongoose');

var ItemDetail = mongoose.model('ItemDetail', {
   
   name: { type:String },
   category: { type:String },
   unit: { type:String },
   price: { type:Number },
   minimumLevel: { type: Number },
   reOrderLevel:{ type: Number },
   maximumLevel: { type: Number },
   quantity:{type:Number},
   date: { type: Date}

});

module.exports = { ItemDetail };
