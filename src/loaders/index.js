const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const knexLoader = require('./knexfile');   // UnhandledPromiseRejectionWarning: TypeError: knexLoader is not a function
// import Logger from './logger';
// //We have to import at least all the events once so they can be triggered
// import './events';
const express = require('express');
const mongoApp = express();    


exports.runLoaders = async ( appObj ) => {   // NONE OF THIS EVER SEEMS TO LOG!!!! 
// exports.runLoaders = async ({ expressApp }) => {   // NONE OF THIS EVER SEEMS TO LOG!!!! 
    console.log("Calling Express Loader from Loaders index ---- : "); //, {appObj})
    await expressLoader.connectExpressWebServer({ app: appObj.app });
    // await expressLoader.connectExpressWebServer({ app: expressApp });

    
    
    const mongoConnection = await mongooseLoader.connectMongoDb( {app : appObj.mongoApp});  // Pass in param or no???  REFACTOR TO!!!    
    // const mongoConnection = await mongooseLoader.connectMongoDb( {app : expressApp});  // Pass in param or no???  REFACTOR TO!!!    
    console.log('MongoDB Intialized from Loaders');

    const sqlConnection = knexLoader;  // UnhandledPromiseRejectionWarning: TypeError: knexLoader is not a function
    // const sqlConnection = await knexLoader();  // UnhandledPromiseRejectionWarning: TypeError: knexLoader is not a function
    console.log('SQL aka Knex DB connection Intialized from Loaders');
};










// export default async ({ expressApp }) => {
//     console.log("Calling MongoDB Loader ---- ")
//     const mongoConnection = await mongooseLoader( expressApp);  // Pass in param or no???
//     console.log('MongoDB Intialized from Loaders');
//     await expressLoader({ app: expressApp });
//     const sqlConnection = await knexLoader();
//     console.log('SQL DB connection Intialized from Loaders');

//     //   Logger.info('✌️ DB loaded and connected!');

//     //   Logger.info('✌️ Express loaded');

//   /**
//    * WTF is going on here?
//    *
//    * We are injecting the mongoose models into the DI container.
//    * I know this is controversial but will provide a lot of flexibility at the time
//    * of writing unit tests, just go and check how beautiful they are!
//    */

// //   const userModel = {
// //     name: 'userModel',
// //     // Notice the require syntax and the '.default'
// //     model: require('../models/user').default,
// //   };



//             // It returns the agenda instance because it's needed in the subsequent loaders
//             //   const { agenda } = await dependencyInjectorLoader({
//             //     mongoConnection,
//             //     models: [
//             //       userModel,
//             //       // salaryModel,
//             //       // whateverModel
//             //     ],
//             //   });

//             //   Logger.info('✌️ Dependency Injector loaded');

//             //   await jobsLoader({ agenda });
//             //   Logger.info('✌️ Jobs loaded');

// };






