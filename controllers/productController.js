const db = require('../models');

function handleError(res, err, status = 400, message = 'Something went wrong. Please try again.') {
  console.log('Error in productController.js:', err);

  return res.status(status).json({ message });
}

async function index(req, res) {
    try {
        const allDresses = await db.Product.find();
        res.status(200).json(allDresses);
    } catch(err) {
        handleError(res, err);
    }
}

async function show(req, res) {
    try {
        const foundProduct = await db.Product.findById(req.params.id);
        res.status(200).json(foundProduct);
    } catch(err) {
        handleError(res, err);
    }
}

async function getProductsByIds(req, res) {
    try {
        const foundProducts = await db.Product.find({ '_id': { '$in': req.query.prodids } })
        console.log('foundProducts ===>', foundProducts);
        res.status(200).json(foundProducts);
    } catch(err) {
        handleError(res, err);
    }
}

module.exports = {
  index,
  show,
  getProductsByIds,
};
