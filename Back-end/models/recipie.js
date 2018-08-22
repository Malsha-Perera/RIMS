const mongoose= require('mongoose');
const ImSchema= mongoose.Schema({
//product table eke fk - check how to apply for this.
    productName:{
        type:String,
        required:true,
    },
    recipieCode:{
        type:String,
        required:true,      
    },
    ingredient:{
        type:Array,
        required:true,
    },
    quantity:{
        type:Array,
        required:true,
    },
    unitCost:{
        type:Array,
        required:true,
    },
    unitScale:{
        type:Array,
        required:true,
    },
    cost:{
        type:Number,
        required:true,
    },
    


});
const Recipie=module.exports=mongoose.model('Recipie',ImSchema);