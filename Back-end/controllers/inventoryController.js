const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Item = require('../models/productItem');
var IssueItem = require('../models/issueItem')

function capitalizeFirstLetter(string) {
   return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

router.get('/', (req, res) => {
   Item.find((err, docs) => {
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Retriving items :' + JSON.stringify(err, undefined, 2));
      }
   });
});

router.get('/:id', (req, res) => {
   if(!ObjectId.isValid(req.params.id)){
      return res.status(400).send('No record with given id : ${req.params.id} ');
   }
   Item.findById(req.params.id, (err, docs) =>{
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Retriving Employees By ID :' + JSON.stringify(err, undefined, 2));
      }
   });
});

router.post('/', (req, res) => {
   var item = new Item ({
      itemname: capitalizeFirstLetter(req.body.itemname.trim()),
      itemCode: req.body.itemCode,
      category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description,
      unitCost: req.body.unitCost,
      latestUpdate: req.body.latestUpdate,
      unitScale: req.body.unitScale,
      minimumLevel: req.body.minimumLevel,
      reOrderLevel: req.body.reOrderLevel,
      maximumLevel: req.body.maximumLevel,
      date: req.body.date
   });
   item.save((err, docs) => {
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Saving Items :' + JSON.stringify(err, undefined, 2));
      }
   })
});

router.put('/:id', (req, res) => {
   if(!ObjectId.isValid(req.params.id)){
      return res.status(400).send('No record with given id : ${req.params.id} ');
   }
   var item = {
      itemname: req.body.itemname,
      itemCode: req.body.itemCode,
      category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description,
      unitCost: req.body.unitCost,
      latestUpdate: req.body.latestUpdate,
      unitScale: req.body.unitScale,
      minimumLevel: req.body.minimumLevel,
      reOrderLevel: req.body.reOrderLevel,
      maximumLevel: req.body.maximumLevel,
      date: req.body.date
   }
   Item.findByIdAndUpdate(req.params.id, { $set: item }, { new: true }, ( err, docs ) => {
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Updating ItemDetails :' + JSON.stringify(err, undefined, 2));
      }
   });
});

router.delete('/:id', (req, res) => {
   if(!ObjectId.isValid(req.params.id)){
      return res.status(400).send('No record with given id : ${req.params.id} ');
   }
   Item.findByIdAndRemove(req.params.id, (err, docs) =>{
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Deleting Items :' + JSON.stringify(err, undefined, 2));
      }
   })
});

//-----------------------------Edit Re Order Level within new Re Order Level---------------------------------//
router.put('/editRol/:itemCode', (req, res) => {
   console.log(req.params.itemCode);
   console.log(req.params.newRol);
   if(req.params.itemCode !== '') {
      Item.findOneAndUpdate({itemCode:req.params.itemCode},{$set: {reOrderLevel:req.body.newRol}}, (err,docs) => {
         if(err) {
            return res.status(200).send({m: 'error'});
         }
         else {
            return res.status(200).send({m: 'success'});
         }
      });
   }
   else {
      res.send('invalid Item Code');
   }
})

router.put('/issuing/:itemCode', (req , res) => {
   if(req.params.itemCode == '') {
      res.send('invalid Item Code');
   }
   else{
      Item.findOneAndUpdate({itemCode:req.params.itemCode},{$set: {quantity:req.body.itemQuantity}},(err,docs) => {
         if(err) {
            return res.status(200).send({m: 'error'});
         }
         return res.status(200).send({m: 'success'});
      })
   }
})

router.post('/issuing/', (req,res) => {
   var issue_Item = new IssueItem({
      issueItemCode: req.body.itemCode,
      issueItemName: req.body.itemName,
      issueItemQuantity: req.body.itemQuantity,
      issueDate: req.body.date
   });
   issue_Item.save((err, result) => {
      if(!err) {
         res.send({m: 'success'});
      }
      else{
         // console.log(err);
         res.send({m: 'error'});
      }
   });
});

router.get('/issuing/issuing', (req, res) => {
   IssueItem.find((err, docs) => {
      if(!err) {
         res.send(docs);
      }
      else {
         res.send({m: 'Error Retriving Issued Items'})
      }

   })
})
module.exports = router;