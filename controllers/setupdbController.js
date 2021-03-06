const db = require('../models');
const data = require('../dressDataImgPaths.json');
const bcrypt = require('bcryptjs');

function handleError(res, err, status = 400, message = 'Something went wrong. Please try again.') {
  console.log('Error in productController.js:', err);

  message = err;

  return res.status(status).json({ message });
}

async function resetdb(req, res) {
  try {
    // delete all existing data, if any
    const deleteRes = await db.Product.deleteMany({});
    console.log(deleteRes.deletedCount,'dresses deleted');

    const deletedAccounts = await db.Account.deleteMany({});
    console.log(deletedAccounts.deletedCount, 'accounts deleted');

    // insert dresses
    const createRes = await db.Product.create(data.dresses);
    console.log(createRes.length, 'dresses created successfully');

    // create a test user account
    const userObj = {
        username: "test",
        password: "test"
    }
     // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userObj.password, salt);
  
    userObj.password = hashedPassword;
    // Create a new user
    const userRes = await db.Account.create(userObj);
    console.log('Created user: ', userRes);

    output = {
      deletedProductsCount: deleteRes.deletedCount + 'dresses deleted',
      deletedAccountsCount: deletedAccounts.deletedCount + 'accounts deleted',
      insertedProductsCount: createRes.length + 'dresses created successfully',
      insertedAccount: userRes
    }

    res.status(200).json(output);

  } catch(err) {
    handleError(res, err);
  }
}


module.exports = {
  resetdb,
};
