// Big Q: PROPER WAY TO MODULARIZE ROUTES? 


// import { Router } from 'express';                // Router Is imported below. /From old tutorial, not sure if need.   
// // import agendash from './routes/agendash';

// WRONG WAYS TO MODULARIZE ROUTES
// import auth from ('./routes/auth');         // on 'auth': SyntaxError: Unexpected identifier
// import project from './routes/project';
// import user from './routes/user';

// import authRoutes from ('./routes/auth.js')    // on 'authRoutes': SyntaxError: Unexpected identifier
// import userRoutes from ('./routes/user.js')

// import './routes/auth.js';  // PROPER WAY TO MODULARIZE ROUTES?    // SyntaxError: Unexpected string
// import './routes/user.js';




const store = require('../../src/loaders/knexfile');  // temp added Nov 23 to test /userList route here vs in user.js
console.log("Store in Routes > index.js is :  ", store) // the exported config obj, Good! 
const mySQLdb = require('knex')(store);
const userServices = require('../services/store');
console.log("userServices.retrieveUserList is: ", userServices.retrieveUserList)

// Initialize express router
let router = require('express').Router();


console.log("Express Router initialized in API index file")
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!   From Api > index.js',
    });
});
console.log("Basic testing home route up")

router.get('/userList', (req, res) => {
    console.log("In Api > Index.js  /userList route hit! ")
    // mySQLdb                     // store = KNEX -- MySQL   // don't need DB connection here, retrieveUserList has it! 
      userServices.retrieveUserList()
      .then((results) => res.send(results))
      // .then(() => res.sendStatus(200))
  })



// Import contact controller  ----- THIS is for PROJECT - MOVE TO PROJECT FOLDER!!!!!!
var projectController = require('../services/project.js');
console.log("projectController : ", projectController)
console.log("projectController.allprojects : ", projectController.allProjects) // is undefined. 
// Project routes
router.route('/allprojects')
    .get(projectController.allProjects)  // Route.get() requires a callback function but got a [object Undefined]
    // .get(allprojects)  // ReferenceError: allprojects is not defined
    // .post(projectController.new);
router.route('/p')
    .get(projectController.aProject)
    // .patch(contactController.update)
    // .put(contactController.update)
    // .delete(contactController.delete);
// Export API routes



module.exports = router;

// // guaranteed to get dependencies
// export default () => {
// 	const app = Router();
// 	auth(app);
//     project(app);
//     user(app);
// 	// agendash(app);
// 	return app
// }











// // Initialize express router
// let router = require('express').Router();
// // Set default API response
// router.get('/', function (req, res) {
//     res.json({
//         status: 'API Its Working',
//         message: 'Welcome to RESTHub crafted with love!',
//     });
// });
// // Import contact controller
// var contactController = require('./contactController');
// // Contact routes
// router.route('/contacts')
//     .get(contactController.index)
//     .post(contactController.new);
// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);
// // Export API routes
// module.exports = router;