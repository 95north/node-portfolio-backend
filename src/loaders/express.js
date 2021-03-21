const express = require('express');
const bodyParser = require('body-parser');      // body-parser package so we can receive JSON data in our payloads
let config = {"port" : 7555}
const expressWebServerApp = express();      // we create a new app here!  
// let expressPort = process.env.PORT || 8070;
// import bodyParser from 'body-parser';


exports.connectExpressWebServer = async (app) => {
    console.log("Hello from Express loader")
    // console.log("the app Parameter for express loader is: ", app);
    expressWebServerApp.use(express.static('public'))
    expressWebServerApp.use(bodyParser.json())    // {limit: '50mb'}  ???  need? express server does login stuff. 
    // app.use(BodyParser.urlencoded({ extended: true }));    // What is this for? is in addition to app.use(bodyParser.json())
    // app.use(cors())    Don't need anymore - 
    // app.use(config.api.prefix, routes());
    expressWebServerApp.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    expressWebServerApp.use('/api', require('../api'));  // WE NEED THIS!!!  Tested.  same as line 7 "routes"?
    // expressWebServerApp.use('/', require('../api'));  // WE NEED THIS!!!  Tested.  same as line 7 "routes"?

    expressWebServerApp.listen(config.port, () => {         // SWAP IN CORRECT PORT # !!
        // Logger.info(`
        console.log(`
        ################################################
        🛡️  Express Server listening on port: ${config.port} 🛡️
        ################################################
        `);
    }).on('error', err => {
        console.log("Express SQL Knex Server Startup Error!", err);
        // Logger.error(err);
        process.exit(1);
    });
}


