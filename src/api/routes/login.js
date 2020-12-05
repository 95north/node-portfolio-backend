// import { Router } from 'express';
// const route = Router();
let route = require('express').Router();

const bodyParser = require('body-parser');   // I think I need, per notes? 
const mySqlConnection = require('../../loaders/knexfile');
const knex = mySqlConnection;
let userServices = require('../../services/user.js');
let authServices = require('../../services/auth.js');



// export default (app) => {   
  route.post('/login', (req, res) => {
    userServices.checkPassword({
        username: req.body.username,
        password: req.body.password
    })
    .then( async ( resp ) => {
        console.log("In Backend Index post login response. uInfo is: ", resp.uinfo)
        if (resp.success) {       
            let userinfo;
            userinfo.username = resp.uinfo.username;
            userinfo.id = resp.uinfo.id;  
            userinfo.token = await authServices.generateToken(userinfo);
 
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
            res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
            return res.status(200).send({
                success: 'true',
                message: 'retrieved successfully',
                // body: success   // get body: true   when console log
                userinfo    // this should work! 
            });
        } else {
            res.sendStatus(401)
        }
    })
  })
// }
module.exports = route;






// let route = require('express').Router();
// const authServices = require('../../../src/services/auth.js');
// // const loginServices = require('../../../src/services/auth.js'); 

// // const store = require('../../../src/loaders/knexfile');  // DON't NEED this- Services/User imports knex connection. 



// route.get('/login', (req, res) => {        // http://localhost:7555/api/user/userList
//     // console.log("in Routes > Login.js >  userList route is hit!")
//     User.checkPassword({ req }) 

    
//       .then((results) => res.send(results));
//       // .then(() => res.sendStatus(200))
//   })
