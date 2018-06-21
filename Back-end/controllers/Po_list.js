var express=require('express');

var router= express.Router();

const poItem=require('../models/POrderItem');
const Po=require('../models/purchaseOrder');

//retrieving data from database
router.get('/items',function(req,res,next){
    poItem.find(function (err,items) {
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
router.post('/item',function(req,res,next){
    let newproduct=new poItem({
        itemname:req.body.itemname,
        quantity:req.body.quantity,
        unitPr:req.body.unitPr,
        total:req.body.total,
        poNo:req.body.poNo,



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


//updating data

router.put('/item/:id',(req,res,next) =>{
    poItem.findOneAndUpdate({_id:req.params.id},{
        $set:{
            itemname:req.body.itemname,
            quantity:req.body.quantity,
            description:req.body.description,


        }



    },function (err,result) {
        if (err){
            res.json(err);
        }
        else{
            res.json(result);
        }

    })
});
//deleting data
router.delete('/item/:id',function(req,res,next) {
    poItem.remove({_id:req.params.id},function (err,result) {
        if (err){
            res.json(err);
        }
        else{
            res.json(result);
        }

    })
});


router.post('/po',function(req,res,next){
    let newPo=new Po({
        vendor:req.body.vendor,
        poNo:req.body.poNo,
        description:req.body.description,
        comments:req.body.comments,
        itemname:req.body.itemname,
        quantity:req.body.quantity,
        unitPr:req.body.unitPr,
        total:req.body.total,




    });
    newPo.save(function (err,po) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({msg:'PO created succesfully'});
        }

    });
});


module.exports=router;