// import { Router } from 'express';
// const route = Router();
let route = require('express').Router();

const bodyParser = require('body-parser');   // I think I need, per notes? 
const mySqlConnection = require('../../loaders/knexfile');
const knex = mySqlConnection;
let userServices = require('../../services/user.js');
let authServices = require('../../services/auth.js');
let ps;

route.get('/g', (req, res) => {
    console.log("In GET Login Route")

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
            res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
            res.status(200).send({
                success: 'true',
                message: 'Login get retrieved successfully',
            })
})







 
route.post('/processlogin', async (req, res, next) => {
    console.log("In Post Login Route, res.body is: ", res.body)
    // console.log("In Post Login Route, res is: ", res)  //  a HUGE object. 

    try {
        // res.body = await userServices.checkPassword({
        
        ps = await userServices.checkPassword({
            username: req.body.user.username,
            password: req.body.user.password
        })
        // let userinfo = {username : "", userId: "", token: ""};
        // userinfo.username = ps.resp.uinfo; 
        // userinfo.userId = ps.resp.uId; 
        ps["resp"]["token"] = await authServices.generateToken({username: ps.resp.uinfo,  userId: ps.resp.uId}); 
        // userinfo.token = await authServices.generateToken(userinfo); 
        // console.log("In Post Login Route, userinfo is: ", userinfo)

        // res.status(200).json({userinfo})
        console.log("In Post Login Route, ps is: ", ps)

        // res.json([ps.resp]);   //.json() calls send() under the hood.    DOESNT WORK. 
        res.json({body: ps.resp});   //.json() calls send() under the hood.    DOESNT WORK. 

        // res.send(ps.resp);
        // res.status(200).json({ps})  // no body returned.. 

    } catch (err) {
        res.status(500).json({message: "Error logging in!", error: err})
    }
})






// // refactor w next().   you can't use .then() w/in this! 
//     route.post('/processlogin', async (req, res, next) => {
//         console.log("In Post Login Route, res.body is: ", res.body)
//         // console.log("In Post Login Route, res is: ", res)  //  a HUGE object. 

//         // ps = await userServices.checkPassword({
//         res.body = await userServices.checkPassword({
//             username: req.body.user.username,
//             password: req.body.user.password
//         })
        
//         ps = res.body;
        
//         console.log("checkPassword returned ps. ps is: ", ps)

//         next();
//     }, async (req, res, next) => {
//         // console.log("In Backend Routes>User>Index post login response. uInfo is: ", res.body.uinfo)
//         console.log("In Backend Routes>Login>Index post login response. ps is: ", ps)

//         if (ps.resp.success) {            
//             let userinfo = {username : "",  token: ""};
//             userinfo.username = ps.resp.uinfo;
//             // NEED TO SEND USERID TOO! 
//             // userinfo.id = res.uinfo.id;   
//             userinfo.token = await authServices.generateToken(userinfo);   // generateToken DOES return a token! 
//             console.log("in API Routes Login, userinfo.token is: ", userinfo.token)
 
//             // res.header("Access-Control-Allow-Origin", "*");
//             // res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
//             // res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");


//             // res.json(userinfo)
//             // res.body({userinfo})

//             next()
//             // moved below to next:
//             // return res.status(200).send({    // Cannot set headers after they are sent to the client
//             //     success: 'true',
//             //     message: 'retrieved successfully',
//             //     // body: success   // get body: true   when console log
//             //     // body: userinfo    // still console.logging bodyUsed : false
//             // });

//         } else {
//             res.sendStatus(401)
//         }
//     }, async (req, res) => {
//         console.log(" Final res.body is: ", res.body)  // ServerResponse {  giant obj.  so need to set body earlier...
//         // res.header("Access-Control-Allow-Origin", "*");
//         // res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
//         // res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
        
//         // return res.status(200).send({    // Cannot set headers after they are sent to the client

//         res.status(200).json(ps)    // Cannot set headers after they are sent to the client

//         // res.status(200).send({    // Cannot set headers after they are sent to the client
//         //     success: 'true',
//         //     message: 'retrieved successfully ---',
//         //     body: ps
//         //     // body: res // TypeError: Converting circular structure to JSON
//         //     // body: success   // get body: true   when console log
//         //     // body: userinfo    // still console.logging bodyUsed : false
//         // });
    
//     })
    




// YOU CANT MIX .THEN()  WITH ROUTE.POST ! 
// route.post('/processlogin', async (req, res) => {
//     // catch(error => { console.log('caught', error.message); });

//     console.log("In Post Login Route, req.body is: ", req.body)
//     var ps = await userServices.checkPassword({
//         username: req.body.user.username,
//         password: req.body.user.password
//     })
//     console.log("checkPassword returned ps. ps is: ", ps)
//     // is checkPassword returning? 
//     return ps
// .then( async ( resp ) => {
//         console.log("In Backend Index post login response. uInfo is: ", resp.uinfo)
//         if (ps.success) {       
//         // if (resp.success) {       
//             let userinfo;
//             userinfo.username = resp.uinfo.username;
//             userinfo.id = resp.uinfo.id;  
//             userinfo.token = await authServices.generateToken(userinfo);
 
//             res.header("Access-Control-Allow-Origin", "*");
//             res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
//             res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'retrieved successfully',
//                 // body: success   // get body: true   when console log
//                 userinfo    // this should work! 
//             });
//         } else {
//             res.sendStatus(401)
//         }
//     })
// })
// .catch((err) => {console.log("err in login.js :", err)})
// // }









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
