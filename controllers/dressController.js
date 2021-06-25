const db = require('../models');

function handleError(res, err, status = 400, message = 'Something went wrong. Please try again.') {
  console.log('Error in dressController.js:', err);

  return res.status(status).json({ message });
}

async function index(req, res) {
    try {
        const allDresses = await db.Product.find({type: 'Dress'});
        res.status(200).json(allDresses);
    } catch(err) {
        handleError(res, err);
    }
}

// async function show(req, res) {
//     try {
//         const foundDress = await db.Product.findById(req.params.id);
//         res.status(200).json(foundDress);
//     } catch(err) {
//         handleError(res, err);
//     }
// }

module.exports = {
  index,
  // show,
};
