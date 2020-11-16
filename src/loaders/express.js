// import bodyParser from 'body-parser';
const express = require('express');
const bodyParser = require('body-parser');      // body-parser package so we can receive JSON data in our payloads
const routes = require('../api'); 

let config = {"port" : 7555}
const expressWebServerApp = express(); 
// let expressPort = process.env.PORT || 8070;

// const app = express();
// console.log("Hello from Express loader")
// // .use is middleware that allows you to run code when the server gets a request but before it gets passed to your routes.
// app.use(express.static('public'))
// app.use(bodyParser.json())
// // app.use(BodyParser.urlencoded({ extended: true }));    // What is this for? is in addition to app.use(bodyParser.json())
// // app.use(cors())    Don't need anymore - 
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// exports.app = app;



exports.connectExpressWebServer = async () => {

    console.log("Hello from Express loader")
    expressWebServerApp.use(express.static('public'))
    expressWebServerApp.use(bodyParser.json())
    // app.use(BodyParser.urlencoded({ extended: true }));    // What is this for? is in addition to app.use(bodyParser.json())
    // app.use(cors())    Don't need anymore - 
    expressWebServerApp.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    expressWebServerApp.listen(config.port, () => {         // SWAP IN CORRECT PORT # !!
        // Logger.info(`
        console.log(`
        ################################################
        🛡️  Express Server listening on port: ${config.port} 🛡️
        ################################################
        `);
    }).on('error', err => {
        console.log("Startup Error!", err);
        // Logger.error(err);
        process.exit(1);
    });
}

// exports.app = app;







// // Load API routes    commmented out.  Don't need?????  bc of above:  const routes = require('../api'); ??????
// app.use(config.api.prefix, routes());

// // PORT for MySQL + KNEX .   Looks like it works running 2 ports for 2 DBs! 
// app.listen(7555, () => {
//     console.log('Server running on http://localhost:7555')
// })
