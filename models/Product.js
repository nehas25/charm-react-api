const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  description: String,
  price: {
    type: Number,
  },
  imgUrls: [String],
  size: {
    type: [String],
    enum: [ 'XS', 'S', 'M', 'L', 'XL', 'XXL' ]
  },
  type: {
    type: String,
    enum: ['Dress', 'Jewelry']
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
