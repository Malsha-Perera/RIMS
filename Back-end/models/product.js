const mongoose= require('mongoose');
const ImSchema= mongoose.Schema({
//product table eke fk - check how to apply for this.
    productName:{
        type:String,
        required:true,
    },
    productCode:{
        type:String,
        required:true,      
    },
    unitCost:{
        type:Number,
        required:true,
    },
    foodCategory:{
        type:String,
        required:true,
    },
    


});
const Product=module.exports=mongoose.model('Product',ImSchema);