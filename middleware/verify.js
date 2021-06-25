const jwt = require('jsonwebtoken');

const verify = async (req, res, next) => {
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

    next();

  } catch(err){
    console.error(err);
    return res.status(400).json({status: 400, message: 'Unauthorized'});
  }

}

module.exports = verify;