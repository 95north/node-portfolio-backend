// import { Router} from 'express';  // SyntaxError: Unexpected token {
// const route = Router();
let route = require('express').Router();
const userServices = require('../../../src/services/user.js'); 
const store = require('../../../src/loaders/knexfile');  // DON't NEED this- Services/User imports knex connection. 


route.post('/createUser', (req, res) => {
  // store                     // store = KNEX -- MySQL
  userServices
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

route.get('/userList', (req, res) => {        // http://localhost:7555/api/user/userList
  console.log("in Routes > User.js >  userList route is hit!")
    userServices.retrieveUserList()
    .then((results) => res.send(results));
    // .then(() => res.sendStatus(200))
})

// add authenticate route for function in userServices? 


module.exports = route;

