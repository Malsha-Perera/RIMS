var express=require('express');

var router= express.Router();
const Po=require('../models/purchaseOrder');

router.post('/po',function(req,res,next){

    let newPo=new Po({
        vendor:req.body.vendor,
        poNo:req.body.poNo,
        description:req.body.description,
        comments:req.body.comments,
        itemname:req.body.itemname,
        pQuantity:req.body.pQuantity,
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
router.get('/pos',function(req,res,next){
    Po.find(function (err,po) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(po);
        }

    });
});
router.delete('/po/:id',function(req,res,next) {
    Po.remove({_id:req.params.id},function (err,result) {
        if (err){
            res.json(err);
        }
        else{
            res.json(result);
        }

    })
});
module.exports=router;
