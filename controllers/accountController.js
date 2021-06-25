const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('jsonwebtoken');

// Handle user signups
const create = async (req, res) => {
  // username
  // password
  // email
  const { username, password, email } = req.body;

  // Check if all credentials are present
  if(!username || !password || !email) {
    return res.status(400).json({ status: 400, message: 'All fields are required'})
  }

  // Check to see if user with that username already exists
  try {
    const foundUser = await db.Account.findOne({ username }); 

    if(foundUser){
      return res.status(400).json({status: 400, message: 'Username already exists'})
    }

  // Hash the user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  req.body.password = hashedPassword;
  // Create a new user
  const newUser = await db.Account.create(req.body);
  return res.status(200).json({status: 200, newUser})

  } catch(err) {
    console.error(err);
    return res.status(500).json({status: 500, message: 'Something went wrong. Please try again.'})
  }
  
}

const login = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    return res.status(400).json({status: 400, message: 'All fields are required'});
  }

  try {
    // Find user by username
    const foundUser = await db.User.findOne({username});

    // Check if username exists
    if(!foundUser) {
      return res.status(400).json({status: 400, message: 'Invalid credentials.'})
    }

    // Check that the provided password matches password in db

    //compare takes in provided password and hashed password and compares them
    // and returns a boolean indicating if password is a match
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if(!isMatch) {
      return res.status(400).json({status: 400, message: 'Invalid credentials'})
    }

    // Create a json web token 
    const payload = { userId: foundUser._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '30d' }; //30 days

    const token = await jwt.sign(payload, secret, options);

    // Send JWT to the client
    return res.status(200).json({status: 200, token});

  } catch(err) {
    console.error(err);
    return res.status(500).json({status:500, message: 'Something went wrong. Please try again.'})
  }

}

const verify = async (req, res) => {
  const token = req.header('Authorization');
  console.log('token in verify ===> ', token);
  // Check to see if request includes a token
  if(!token) {
    return res.status(400).json({status: 400, message: 'Unauthorized'});
  }

  // And if so, decrypt the token and pull out the userId
  try{
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // Creating a new property on request object called currentUserId
    // and setting it to userId from decoded token
    req.currentUserId = decodedToken.userId;

    // Send a response with the decrypted token
    return res.status(200).json({status: 200, message: 'You made a verified request'});

  } catch(err){
    console.error(err);
    return res.status(400).json({status: 400, message: 'Unauthorized'});
  }
}

async function index(req, res) {
    try {
        await db.Account.find({})
          .populate('bag')
          .exec((err, allUsers) => {
            res.status(200).json(allUsers);
        });
        
    } catch(err) {
        handleError(res, err);
    }
}

module.exports = {
  create,
  login,
  verify,
  index,
};
