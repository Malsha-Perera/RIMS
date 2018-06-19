const mongoose= require('mongoose');
const ImSchema= mongoose.Schema({
    itemname:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true,
    }



});
const Item=module.exports=mongoose.model('Item',ImSchema);