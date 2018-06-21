const mongoose= require('mongoose');
const PoSchema= mongoose.Schema({

    vendor: {
        type: String,
        required: true,
    },
    poNo: {
        type: Number,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: false,
    },

});




const Po=module.exports=mongoose.model('Po',PoSchema);

