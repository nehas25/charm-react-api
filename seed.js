const db = require('./models');
const data = require('./dressData.json');

async function populateData() {
    try {
        // delete all existing data, if any
        const deleteRes = await db.Dress.deleteMany({});
        console.log(deleteRes.deletedCount,'dresses deleted');

        // insert dresses
        const createRes = await db.Dress.create(data.dresses);
        console.log(createRes.length, 'dresses created successfully');

        // create a test user
        const userObj = {
            username: "test",
            password: "test"
        }
        const userRes = await db.User.create(userObj);
        console.log('Created user: ', userRes);
    } catch(error) {
        console.log(error);
    }
    process.exit();
}

populateData();
