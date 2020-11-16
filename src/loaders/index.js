// import expressLoader from './express';
// import knexLoader from './knexfile';
// import mongooseLoader from './mongoose';

const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const knexLoader = require('./knexfile'); 



console.log(">>>> in Loaders Index file")
// import Logger from './logger';
// //We have to import at least all the events once so they can be triggered
// import './events';


exports.runLoaders = async ({ expressApp }) => {   // NONE OF THIS EVER SEEMS TO LOG!!!! 
    // await expressLoader({ app: expressApp });
    await expressLoader.connectExpressWebServer({ app: expressApp });
    
    console.log("Calling MongoDB Loader from Loaders index ---- ")
    const mongoConnection = await mongooseLoader.connectMongoDb( {app : expressApp});  // Pass in param or no???  REFACTOR TO!!!    
    console.log('MongoDB Intialized from Loaders');

    const sqlConnection = await knexLoader();
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






