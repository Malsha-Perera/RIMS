var express=require('express');

var router= express.Router();

const Item=require('../models/productItem');
const Recipie = require('../models/recipie');


//retrieving data from database
router.get('/',function(req,res,next){
    Recipie.find(function (err,recipie) {
        if (err) {
            res.json(err);
        }
        else {
                res.json(recipie);
        }

    });
});

//retieving data using itemCode

router.get('/:recipieCode', (req, res, next) => {
    Recipie.find({ recipieCode: req.params.recipieCode }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//inserting data
router.post('/',function(req,res,next){
    let newRecipie=new Recipie({
        productName:req.body.productName,
        recipieCode:req.body.recipieCode,
        ingredient:req.body.ingredient,
        quantity:req.body.quantity,
        unitCost:req.body.unitCost,
        unitScale:req.body.unitScale,
        cost:req.body.cost,
        
    });
    newRecipie.save(function (err,recipie) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({msg:'recipie added succesfully'});
        }

    });

    });


//updating data

router.put('/:recipieCode',(req,res,next) =>{
    Recipie.update({recipieCode:req.params.recipieCode},{
        $set:{
            
            
            ingredient:req.body.ingredient,
            quantity:req.body.quantity,
            unitCost:req.body.unitCost,
            unitScale:req.body.unitScale,
            cost:req.body.cost,
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
router.delete('/:id',function(req,res,next) {
    Item.remove({_id:req.params.id},function (err,result) {
        if (err){
            res.json(err);
        }
        else{
            res.json(result);
        }

    })
});

module.exports=router;