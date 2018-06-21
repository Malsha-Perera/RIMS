const mongoose= require('mongoose');
const ImSchema= mongoose.Schema({
//product table eke fk - check how to apply for this.
    productName:{
        type:String,
    },
    productCode:{
        type:String,      
    },
    unitCost:{
        type:Number,
    },
    foodCategory:{
        type:String,
        required: true
    },
    


});
const Product=module.exports=mongoose.model('Product',ImSchema);