const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BagItem = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
});

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // required: true
  },
  bag: [BagItem]
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
