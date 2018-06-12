const mongoose= require('mongoose');

const ImSchema= mongoose.Schema({
    itemname:{
        type:String,
        required:true,
    },
    itemCode:{
        type:String,
        required:true,      
    },
    category: {
        type: String
    },
    quantity:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    unitCost:{

        type:Number,         
    },
    
    latestUpdate:{
        type:Date,
        
    },
    unitScale:{
        type:String,          
    },
    minimumLevel: { 
        type: Number 
    },
    reOrderLevel:{ 
        type: Number 
    },
    maximumLevel: {
         type: Number 
    },
    date: {
        type: Date

    }


});
const Item=module.exports=mongoose.model('Item',ImSchema);