const mongoose= require('mongoose');
const ImSchema= mongoose.Schema({
//product table eke fk - check how to apply for this.
    productName:{
        type:String,
        required:true,
    },
    recipieNo:{
        type:String,
        required:true,      
    },
    ingredient:{
        type:Array,
        required:true,
    },
    cost:{
        type:String,
        required:true,
    },
    


});
const Recipie=module.exports=mongoose.model('Recipie',ImSchema);