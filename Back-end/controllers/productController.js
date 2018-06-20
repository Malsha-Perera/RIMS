var express=require('express');

var router= express.Router();

const Product =require('../models/product');



//retrieving data from database
router.get('/',function(req,res,next){
    Product.find(function (err,product) {
        if (err) {
            res.json(err);
        }
        else {
                res.json(product);
        }

    });
});

//retieving data using itemCode

router.get('/:productCode', (req, res, next) => {
    Product.find({ productCode: req.params.productCode }, function (err, result) {
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
       let newProduct=new Product({
           productName:req.body.productName,
           productCode:req.body.productCode,
           unitCost:req.body.unitCost,
           foodCategory:req.body.foodCategory,
           
       });
        newProduct.save(function (err,Product) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({msg:'Product added successfully'});
            }

        });

        });


    //updating data

router.put('/:id',(req,res,next) =>{
    Item.findOneAndUpdate({_id:req.params.id},{
        $set:{
            productName:req.body.productName,
           ProductCode:req.body.ProductCode,
           unitCost:req.body.unitCost,
           foodCategory:req.body.foodCategory,
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