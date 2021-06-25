const db = require('../models');

function handleError(res, err, status = 400, message = 'Something went wrong. Please try again.') {
  console.log('Error in bagItemController.js:', err);

  return res.status(status).json({ message });
}

async function addBagItems(req, res) {
  console.log('userId: ', req.params.userid);
  console.log('body: ', req.body);

  try {
    const updatedAcc = await db.Account.findByIdAndUpdate(
      req.params.userid,
      { "$push": { "bag": req.body } },
      { new: true }
    );

    console.log('updatedAcc ==> ', updatedAcc);

    res.status(200).json(updatedAcc);
  } catch(err) {
    handleError(res, err);
  }

}

async function removeBagItems(req, res) {
  console.log('userId: ', req.params.userid);
  console.log('body: ', req.body);

  try {
    const updatedAcc = await db.Account.findByIdAndUpdate(
      req.params.userid,
      { "$pull": { "bag": { "productId": req.body.productId } } },
      { new: true }
    );

    console.log('updatedAcc ==> ', updatedAcc);

    res.status(200).json(updatedAcc);
  } catch(err) {
    handleError(res, err);
  }

}

// async function addOneItem(req, res) {
//   try {
//     console.log(req.body);
//     const bagObj = await db.Bag.findOne({userId: req.body.userId});
//     console.log('bagObj ===> ', bagObj);

//     const updatedBagItem = await db.BagItem.create(
//       {
//         bag: bagObj._id,
//         productId: req.body.productId,
//         size: req.body.size,
//         quantity: req.body.quantity
//       }
//     );
//     console.log('updated BagItems ==> ', updatedBagItem);

//     const updatedBag = await db.Bag.findByIdAndUpdate(
//       bagObj._id,
//       { "$push": { "bagItems": updatedBagItem._id } },
//       { new: true }
//     );
     
//     console.log('updatedBag ==> ', updatedBagItem);

//     res.status(200).json(updatedBagItem);

//   } catch(err) {
//     handleError(res, err);
//   }
// }

// async function addMultipleItems(req, res) {
//   try {
//     console.log(req.body);
//     const bagObj = await db.Bag.findOne({userId: req.body.userId});
//     console.log('bagObj ===> ', bagObj);

//     req.body.items.forEach((item) => item.bag=bagObj._id.toString())
//     console.log(req.body.items);

//     const updatedBagItems = await db.BagItem.create(req.body.items);
//     console.log('updated BagItems ==> ', updatedBagItems);

//     const bagItemsIds = updatedBagItems.map((item) => item._id);
//     console.log('bagItemsIds ==> ', bagItemsIds);

//     const updatedBag = await db.Bag.findByIdAndUpdate(
//       bagObj._id,
//       { "$push": { "bagItems": {"$each": bagItemsIds}} },
//       { new: true }
//     );
     
//     console.log('updatedBag ==> ', updatedBag);

//     res.status(200).json(updatedBagItems);

//   } catch(err) {
//     handleError(res, err);
//   }
// }

// async function index(req, res) {
//     try {
//         const allDresses = await db.Product.find({type: 'Dress'});
//         res.status(200).json(allDresses);
//     } catch(err) {
//         handleError(res, err);
//     }
// }

// async function show(req, res) {
//     try {
//         const foundDress = await db.Product.findById(req.params.id);
//         res.status(200).json(foundDress);
//     } catch(err) {
//         handleError(res, err);
//     }
// }

module.exports = {
  // index,
  // show,
  // addOneItem, 
  // addMultipleItems,
  addBagItems,
  removeBagItems,
};
