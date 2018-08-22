const mongoose= require('mongoose');

const IssueSchema = mongoose.Schema({

   issueItemCode: {
      type: String
   },
   issueItemName: {
      type: String
   },
   issueItemQuantity: {
      type: Number
   },
   issueDate: {
      type: String
   }
})

const issueItem = module.exports = mongoose.model('issueItem',IssueSchema);