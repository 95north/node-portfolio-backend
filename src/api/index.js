// Initialize express router
let router = require('express').Router();


// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'This API is working, but there is no data at this path!',
    });
});

router.use('/user', require('./routes/user.js'));



// Import contact controller  ----- THIS is for PROJECT (mongo)- MOVE TO PROJECT FOLDER!!!!!!
var projectController = require('../services/project.js');
console.log("projectController : ", projectController)
console.log("projectController.allprojects : ", projectController.allProjects) // is undefined. 

// Project routes
router.route('/allprojects')            // http://localhost:7555/api/allProjects
    .get(projectController.allProjects)  // Route.get() requires a callback function but got a [object Undefined]
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