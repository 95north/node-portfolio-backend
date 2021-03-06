let route = require('express').Router();
const authServices = require('../../../src/services/auth.js');
const entryServices = require('../../../src/services/entry.js'); 
// const store = require('../../../src/loaders/knexfile');  // DON't NEED this- Services/User imports knex connection. 


route.post('/entry', async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   // Just this header - post still doesnt hit. 
    // console.log("req in post new entry: ", req)// .body)  req is huge object.
    try {
        console.log("req.headers.auth: ", req.headers.authorization)
        if (authServices.verifyJwtTokenViaParamsNotHeaders(req.headers.authorization)   == true ){//
            console.log("req.body in post new entry: ", req.body)  // undefined
            // console.log("req.body Type in post new entry: ", typeof req.body)  // Object - therefore auto- Json.parsed!!!
            // let reqBody = JSON.parse(req.body)      // error posting to /entry:  SyntaxError: Unexpected token o in JSON at position 1
            let theResult = await entryServices.addEntry(req.body) 
            console.log("result is: ", theResult)
            res.status(200).json({body: theResult});  // also sends result? 
            // res.send(result);
        } else {
            console.log("JWT Bad")
            res.status(500).send("JWT Bad");
        }
    } catch (error) {
        console.log("error posting to /entry: ", error)
        res.status(500).send(error);
    }
})


route.post('/:id', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // console.log("hit route.delete.  req.params.id is ", req.params.id)
    try {
        if (authServices.verifyJwtTokenViaParamsNotHeaders(req.headers.authorization)   == true ){//
            let result = await entryServices.deleteEntry(req.params.id) 
            console.log("In Entry Route - result is: ", result)
            res.status(200).json({body: result});
        } else {
            console.log("JWT Bad")
            res.status(500).send("JWT Bad");
        }
    } catch (error) {
        console.log("in post Delete, error is: ", error)
        res.status(500).send(error);
    }
})


route.get('/entries', async function (req, res) {  // ERROR HANDLING! 
    let data = await entryServices.getAllEntries();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
    res.status(200).send({  
        success: 'true',
        entries: data,
    })
});







// route.get('/userList', (req, res) => {        // http://localhost:7555/api/user/userList
//   console.log("in Routes > User.js >  userList route is hit!")
//     userServices.retrieveUserList()
//     .then((results) => res.send(results));
//     // .then(() => res.sendStatus(200))
// })

// add authenticate route for function in userServices? 


module.exports = route;


