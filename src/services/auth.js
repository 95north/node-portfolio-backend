
var jwt = require('jwt-simple');
var moment = require('moment');
// var config = require('../../config');
var config = { "TOKEN_SECRET" : "terribleSecurity"}

var User= require('../../services/user');

// def retrieve
//     token = request.headers["Authorization"]
//     user_id = JWT.decode(token, "secret")[0]["user_id"]
//     user = User.find(user_id)
//     # debugger
//     render json: {user: user.username}
// end


// I don't know what code checks JWT in JS. 
module.exports = {
    generateToken, 
    verifyJwtToken(req, res, next) {
        // see code pasted below. 
          if (!req.headers.authorization) {
            return res.status(401).send({ error: 'TokenMissing' });
          }
          var token = req.headers.authorization.split(' ')[1];

          var payload = null;
          try {
            payload = jwt.decode(token, config.TOKEN_SECRET);
          }
          catch (err) {
            return res.status(401).send({ error: "TokenInvalid" });
          }

          if (payload.exp <= moment().unix()) {
            return res.status(401).send({ error: 'TokenExpired' });
          }

          
          // check if the user exists
          // Is it possible to decouple the person finding? 
          // what is payload.sub
        // The second part of the token is the payload, 
        // which contains the claims. 
        // Claims are statements about an entity 
        // (typically, the user) and additional data. 
        // Payload eg: 
        // {
        //     "sub": "1234567890",
        //     "name": "John Doe",
        //     "admin": true
        //  }
        // The payload is then Base64Url encoded to 
        // form the second part of the JSON Web Token.
        //  What is Base64Url encoding?
        // Originally some protocols only allowed 7 bit, 
        // and sometimes only 6 bit, data.
        // Base64 allows one to encode 8 bit data into 6 bits 
        // for transmission on those types of links.
        // The primary use case of base64 encoding is when you want to 
        // store or transfer data with a restricted set of chars.

        // ***This would need to a helper function imported from user
          // check password is called elsewhere.. 
          // need to refactor flow? 
          // Currently, /api/login



        // findById() is prob a func elswhere that returns "person"
        // or does it return 2 things?? an err and a person? NO
        //  might be
        // Error handling middleware!!:  app.use(err,req,res,next)
        //   Person.findById(payload.sub, function(err, person){
        //     if (!person){
        //       return res.status(401).send({error: 'PersonNotFound'});
        //     } else {
        //       req.user = payload.sub;
        //       console.log("req.user is : ", req.user)
        //       next(); // for if pass in a param: callback next function to
        //       // wouldn't I want to pass user data in to next? 
               


        //     }
        //   });
        // return null
    }
};


function generateToken(claims){
    // const claims = { iss: 'fun-with-jwts', sub: 'AzureDiamond' }
    const token = jwt.create(claims, config.TOKEN_SECRET)
    token.setExpiration(new Date().getTime() + 60*1000)
    return token.compact();
    res.send(token.compact())
}




//     /routes.js
//     https://medium.com/@obrientimothya/make-an-api-with-node-js-mongodb-and-jwt-authentication-9da443a1f59b
// var config = require('./config');
// var moment = require('moment');
// var jwt = require('jwt-simple');
// var Auth = require('./controllers/auth.js');
// var People = require('./controllers/people.js');

// // 2. Authentication Middleware
// function ensureAuthenticated(req, res, next) {
//   if (!req.headers.authorization) {
//     return res.status(401).send({ error: 'TokenMissing' });
//   }
//   var token = req.headers.authorization.split(' ')[1];

//   var payload = null;
//   try {
//     payload = jwt.decode(token, config.TOKEN_SECRET);
//   }
//   catch (err) {
//     return res.status(401).send({ error: "TokenInvalid" });
//   }

//   if (payload.exp <= moment().unix()) {
//     return res.status(401).send({ error: 'TokenExpired' });
//   }
//   // check if the user exists
//   Person.findById(payload.sub, function(err, person){
//     if (!person){
//       return res.status(401).send({error: 'PersonNotFound'});
//     } else {
//       req.user = payload.sub;
//       next();
//     }
//   });
// };










// All we need our store to do is load in knex using the 
// knexfile.js config and then write data to the user table 
// whenever a createUser request is made.

// const knex = require('knex')(require('./knexfile'))

// For the time being, we will mock the store in order to check that our API works.
// Below: did NOT persist created user to mysql

// module.exports = {
//     createUser ({ username, password }) {
//       console.log(`Add user ${username} with password ${password}`)
//       return Promise.resolve()
//     }
//   }




// Ruby Auth Controller: 
// require 'jwt'
// # skip_before_action :verify_authenticity_token
// # before_action :authenticate_user, raise: false

// def retrieve
//     token = request.headers["Authorization"]
//     user_id = JWT.decode(token, "secret")[0]["user_id"]
//     user = User.find(user_id)
//     # debugger
//     render json: {user: user.username}
// end

// def authenticate
//     #username = JWT.decode(token, "secret")[0]["username"]
//     user = User.find_by(username: user_params["username"])
//     # debugger  When I log in as Ben, it does find Ben in the backend (by username)
//     # I never check password!   Password should come in as JWT though.. no? 
//     #if user_params["password"] === user.password
//     if user.password_digest   # I never check password! 
//         secret = 'secret'
//         token = JWT.encode(user, secret, 'HS256')
//         render json: {
//             token: token,    # Does return a token! 
//             user_id: user.id,
//             user_name: user.username,
//             user_location: user.location
//         }
//     else
//         render json: {
//             message: "Incorrect creds"
//         }
//     end

// end