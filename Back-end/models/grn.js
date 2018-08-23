
const mongoose= require('mongoose');
const GRNImSchema= mongoose.Schema({
    grnNo:{
        type:Number,
        required:false,
    },
    poNo:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        required:true
    },

});

const GRNsam=module.exports=mongoose.model('GRNsam',GRNImSchema);/**
 * Created by acer on 8/21/2018.
 */
