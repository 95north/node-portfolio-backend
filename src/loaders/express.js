const express = require('express');
const bodyParser = require('body-parser');      // body-parser package so we can receive JSON data in our payloads
let config = {"port" : 7555}
const expressWebServerApp = express(); 
// let expressPort = process.env.PORT || 8070;
// import bodyParser from 'body-parser';
// const routes = require('../api'); 



exports.connectExpressWebServer = async () => {
    console.log("Hello from Express loader")
    expressWebServerApp.use(express.static('public'))
    expressWebServerApp.use(bodyParser.json())
    // app.use(BodyParser.urlencoded({ extended: true }));    // What is this for? is in addition to app.use(bodyParser.json())
    // app.use(cors())    Don't need anymore - 
    // app.use(config.api.prefix, routes());
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


