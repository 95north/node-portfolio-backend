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

route.post('/entry/:token', async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   // Just this header - post still doesnt hit. 
    // console.log("req in post new entry: ", req)// .body)  req is huge object.
    try {
        // if (authServices.verifyJwtTokenViaParamsNotHeaders(req.params.token)   == true ){//
        if (authServices.verifyJwtTokenViaParamsNotHeaders(req.params.token)   == true ){//
            // need to decode req? 
            // entryServices.addEntry(req) 
            console.log("req.body in post new entry: ", req.body)  // undefined
            // console.log("req.body Type in post new entry: ", typeof req.body)  // Object - therefore auto- Json.parsed!!!
            // let reqBody = JSON.parse(req.body)      // error posting to /entry:  SyntaxError: Unexpected token o in JSON at position 1
            let theResult = await entryServices.addEntry(req.body) 
            console.log("result is: ", theResult)
            res.json({body: theResult});  // also sends result? 
            // res.sendStatus(200)
            // res.json({body: req.body});  // also sends result? 
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





// app.post("/addname", (req, res) => {
//     var myData = new User(req.body);
//     myData.save()
//       .then(item => {
//         res.send("item saved to database");
//       })
//       .catch(err => {
//         res.status(400).send("unable to save to database");
//       });
//   });


route.post('/:id/:token', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("hit route.delete.  req.params.id is ", req.params.id)
    console.log("hit route.delete.  req.params.token is ", req.params.token)

    // console.log("hit route.delete.  req.body is ", req.body)  undefined 
    try {
        if (authServices.verifyJwtTokenViaParamsNotHeaders(req.params.token)   == true ){//
        // if (authServices.verifyJwtToken(req.params.token)   == true ){//
            // need to decode req? 
            // console.log("req in Delete an entry: ", req.body)
            var result = await entryServices.deleteEntry(req.params.id) 
            console.log("result is: , result")
            res.json({body: result});
            // res.send(result);
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

    // return res.status(200).send({  // how responded in old project
    res.status(200).send({  // how responded in old project
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


