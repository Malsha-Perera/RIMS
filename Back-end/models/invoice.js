const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
   
    tax:{
        type:String,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    com_name:{
        type:String,
        required:true
    },
    com_address:{
        type:String,
        required:true
    },
    com_phone:{
        type:String,
        required:true
    },
    fax_no:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    },
    invoice_no:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }



});
const SalesInvoice = module.exports = mongoose.model('SalesInvoice',InvoiceSchema);