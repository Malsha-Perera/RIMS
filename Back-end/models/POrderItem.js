
const mongoose= require('mongoose');
const PoImSchema= mongoose.Schema({
    itemname:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,

    },
    unitPr:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
    poNo:{
        type:Number,
        required:true,
    }

});

const poItem=module.exports=mongoose.model('poItem',PoImSchema);