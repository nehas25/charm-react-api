const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DressSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  imgUrls: [String]
});

const Dress = mongoose.model('Dress', DressSchema);

module.exports = Dress;
