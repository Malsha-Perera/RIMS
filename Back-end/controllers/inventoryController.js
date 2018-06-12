const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { ItemDetail } = require('../models/inventoryItemModel');

router.get('/', (req, res) => {
   ItemDetail.find((err, docs) => {
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2));
      }
   });
});

router.get('/:id', (req, res) => {
   if(!ObjectId.isValid(req.params.id)){
      return res.status(400).send('No record with given id : ${req.params.id} ');
   }
   ItemDetail.findById(req.params.id, (err, docs) =>{
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Retriving Employees By ID :' + JSON.stringify(err, undefined, 2));
      }
   });
});

router.post('/', (req, res) => {
   var itemdetail = new ItemDetail({
      
      name: req.body.name,
      category: req.body.category,
      unit: req.body.unit,
      price: req.body.price,
      minimumLevel: req.body.minimumLevel,
      reOrderLevel: req.body.reOrderLevel,
      maximumLevel: req.body.maximumLevel,
      quantity: req.body.quantity,
      date: req.body.date
   });
   itemdetail.save((err, docs) => {
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
   var itemdetail = {
      
      name: req.body.name,
      category: req.body.category,
      unit: req.body.unit,
      price: req.body.price,
      minimumLevel: req.body.minimumLevel,
      reOrderLevel: req.body.reOrderLevel,
      maximumLevel: req.body.maximumLevel,
      quantity: req.body.quantity,
      date: req.body.date
   }
   ItemDetail.findByIdAndUpdate(req.params.id, { $set: itemdetail }, { new: true }, ( err, docs ) => {
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
   ItemDetail.findByIdAndRemove(req.params.id, (err, docs) =>{
      if(!err){
         res.send(docs);
      }
      else{
         console.log('Error in Deleting ItemDetails :' + JSON.stringify(err, undefined, 2));
      }
   })
})
module.exports = router;