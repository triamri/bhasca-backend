const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/bhasca', {useMongoClient: true})
mongoose.Promise = global.Promise;

var statusSchema = new Schema({
  nameRequest : String
})

module.exports = mongoose.model('Status', statusSchema)