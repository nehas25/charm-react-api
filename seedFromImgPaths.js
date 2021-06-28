const db = require('./models');
const data = require('./dressDataImgPaths.json');

async function populateData() {
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
        const userRes = await db.Account.create(userObj);
        console.log('Created user: ', userRes);


    } catch(error) {
        console.log(error);
    }
    process.exit();
}

populateData();
