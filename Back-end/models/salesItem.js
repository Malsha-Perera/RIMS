const mongoose = require('mongoose');

const salesItemSchema = mongoose.Schema({
    product_id:{
        type:String,
        required:true
    },
    product_name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    unit_scale:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    total_price:{
        type:String,
        required:true
    }

});
const SalesItem = module.exports = mongoose.model('SalesItem',salesItemSchema);