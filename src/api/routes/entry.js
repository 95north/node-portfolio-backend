let route = require('express').Router();
const authServices = require('../../../src/services/auth.js');
const entryServices = require('../../../src/services/entry.js'); 

// const store = require('../../../src/loaders/knexfile');  // DON't NEED this- Services/User imports knex connection. 



// route.get('/entries', async (req, res) => {
//     // store                     // store = KNEX -- MySQL

//     try {
//         let result = await entryServices.getAllEntries(); 
//         console.log("In Routes>Entry,  result is: ", result)
//         res.json({body: result});
//         // res.send(result);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

route.get('/entries', async function (req, res) {  // ERROR HANDLING! 
    let data = await entryServices.getAllEntries();

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");

    // return res.status(200).send({  // how responded in old project
    res.status(200).send({  // how responded in old project
        success: 'true',
        entries: data,
    })
});


route.post('/entry', async (req, res) => {
    // store                     // store = KNEX -- MySQL

    try {
        if (authServices.verifyJwtToken()   == true ){//
            // need to decode req? 
            // entryServices.addEntry(req) 
            // res.sendStatus(200)
            console.log("req in post new entry: ", req.body)
            var result = await entryServices.addEntry(req.body) 
            res.json({body: result});
            // res.send(result);
        } else {
            console.log("JWT Bad")
            res.status(500).send("JWT Bad");
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

// route.get('/userList', (req, res) => {        // http://localhost:7555/api/user/userList
//   console.log("in Routes > User.js >  userList route is hit!")
//     userServices.retrieveUserList()
//     .then((results) => res.send(results));
//     // .then(() => res.sendStatus(200))
// })

// add authenticate route for function in userServices? 


module.exports = route;


