const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/bhasca', {useMongoClient: true})
mongoose.Promise = global.Promise;

var translateSchema = new Schema({
  idPhoto : {
    type : Schema.Types.ObjectId,
    ref : 'Photo'
  },
  statusRequest : {
    type : Schema.Types.ObjectId,
    ref : 'Status'
  },
  data : String
})

module.exports = mongoose.model('Translate', translateSchema)