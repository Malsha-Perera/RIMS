var express=require('express');

var router= express.Router();

const Item=require('../models/productItem');


//retrieving data from database
router.get('/items',function(req,res,next){
    Item.find(function (err,items) {
        if (err) {
            res.json(err);
        }
        else {
                res.json(items);
        }

    });
});
    //inserting data
    router.post('/item',function(req,res,next){
       let newproduct=new Item({
           itemname:req.body.itemname,
           quantity:req.body.quantity,
           description:req.body.description,



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
    Item.findOneAndUpdate({_id:req.params.id},{
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