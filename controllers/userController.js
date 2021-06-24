const db = require('../models');

function handleError(res, err, status = 400, message = 'Something went wrong. Please try again.') {
  console.log('Error in userController.js:', err);

  return res.status(status).json({ message });
}

async function index(req, res) {
    try {
        const allUsers = await db.User.find({});
        res.json(allUsers);
    } catch(err) {
        handleError(res, err);
    }
}

async function show(req, res) {
  try {
      const userInfo = await db.User.findById(req.params.userid)
        .populate('cartItems')
        .exec((err, foundUser) => {
          res.json(foundUser);
        });
      
  } catch(err) {
      handleError(res, err);
  }
}

async function addToCart(req, res) {
    try {
        const updatedUser = await db.User.findByIdAndUpdate(
            req.params.userid,
            { "$push": { "cartItems": req.params.id } },
            {  new: true }
        );
        res.status(200).json(updatedUser);
    } catch(err) {
        handleError(res, err);
    }
}

async function removeFromCart(req, res) {
    try {
        const updatedUser = await db.User.findByIdAndUpdate(
            req.params.userid,
            { "$pull": { "cartItems": req.params.id } },
            {  new: true }
        );
        res.status(200).json(updatedUser);
    } catch(err) {
        handleError(res, err);
    }
}

module.exports = {
  addToCart,
  removeFromCart,
  index,
  show,
};
