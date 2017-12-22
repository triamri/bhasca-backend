const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/bhasca', {useMongoClient: true})
mongoose.Promise = global.Promise;

var photoSchema = new Schema({
  photo : String,
  statusFile : String,
  createdAt : {
    type : Date,
    default : Date.now
  }
})

module.exports = mongoose.model('Photo', photoSchema)