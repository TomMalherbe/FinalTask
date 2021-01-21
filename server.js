require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 4000;
var index;

//  user details
var userData =[ {
  userId: "1",
  password: "Tom",
  name: "Tom Malhrbe",
  username: "Tom",
  isAdmin: true  
}
];

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// we are going to checks if the JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});


// request handlers
app.get('/', (req, res) => {
  res.send('Welcome to the Server');
});

app.post('/users/signin', function (req, res) {
  var newId       = userData.length
  var newUsername = req.body.username;
  var newName     = req.body.name;
  var newPassword = req.body.password;
  var NewUser={
    userId: newId,
    password: newPassword,
    name: newName,
    username: newUsername,
    isAdmin: false
  };
  // Check for no missing data
  if (!newUsername || !newPassword || !newName) {
    return res.status(401).json({
      error: true,
      message: "Missing something."
    });
  }
  // Check for new username
  for( index=0;index<userData.length;index++){
    if (NewUser.username == userData[index].username) {
      return res.status(401).json({
        error: true,
        message: "Username Already Use."
      });
    }

  }
  // add the the new user
  userData.push(NewUser)
});


// validate the user credentials
app.post('/users/login', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
  // Check for no missing data
  if (!user || !pwd) {
    return res.status(401).json({
      error: true,
      message: "Username or Password required."
    });
  }
  for( index=0;index<userData.length;index++){
   if (user == userData[index].username && pwd == userData[index].password) {
     // generate token
  const token = utils.generateToken(userData[index]);
  // get basic user details
  const userObj = utils.getCleanUser(userData[index]);
  // return the token along with user details
  return res.json({ user: userObj, token });
  }else{}
  }
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong."
    });
});









// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    // return 401 status if the userId does not match.
    if (user.userId !== userData[index].userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData[index]);
    return res.json({ user: userObj, token });
  });
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});
