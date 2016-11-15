var mongoose  = require("mongoose");
  var Invoice = mongoose.Schema({
    Invoice : String,
    date    : String
  });
module.exports = Invoice;


//added date
//in users.js also changed the scheama
