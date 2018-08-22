/**
 * Created by acer on 8/21/2018.
 */
var express=require('express');

var router= express.Router();

const GRNsam=require('../models/grn');
//const Po=require('../models/purchaseOrder');

//retrieving data from database
router.get('/grn',function(req,res,next){
    GRNsam.find(function (err,items) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(items);
        }

    });
});
/*
 router.get('/items/:id',function(req,res,next){
 Item.find({poNo:req.params.id},function (err,items) {
 if (err) {
 res.json(err);
 }
 else {
 res.json(items);
 }

 });
 });

 */  //inserting data
router.post('/grn',function(req,res,next){
    let newproduct=new GRNsam({
        poNo:req.body.poNo,
        date:req.body.date,
        grnNo:req.body.grnNo,



    });
    newproduct.save(function (err,item) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({msg:'item added succesfully'});
        }

    });

});



//deleting data
router.delete('/grn/:id',function(req,res,next) {
    GRNsam.remove({_id:req.params.id},function (err,result) {
        if (err){
            res.json(err);
        }
        else{
            res.json(result);
        }

    })
});




module.exports=router;