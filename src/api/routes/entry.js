let route = require('express').Router();
const authServices = require('../../../src/services/auth.js');
const entryServices = require('../../../src/services/entry.js'); 

// const store = require('../../../src/loaders/knexfile');  // DON't NEED this- Services/User imports knex connection. 



route.post('/entry', (req, res) => {
    // store                     // store = KNEX -- MySQL

    try {
        var result = await entryServices.getAllEntries(); 
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

route.get('/entries', (req, res) => {
    // store                     // store = KNEX -- MySQL


    try {
        if (authServices.verifyJwtToken()   == true ){//
            // need to decode req? 
            // entryServices.addEntry(req) 
            // res.sendStatus(200)
            var result = await entryServices.addEntry(req) 
            res.send(result);
        } else {
            console.log("JWT Bad")
            res.status(500).send("JWT Bad");
        }
    } catch (error) {
        res.status(500).send(error);
    }


// route.get('/userList', (req, res) => {        // http://localhost:7555/api/user/userList
//   console.log("in Routes > User.js >  userList route is hit!")
//     userServices.retrieveUserList()
//     .then((results) => res.send(results));
//     // .then(() => res.sendStatus(200))
// })

// add authenticate route for function in userServices? 


module.exports = route;


