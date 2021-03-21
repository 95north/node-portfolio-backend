// import { Router, Request, Response, NextFunction } from 'express';
let router = require('express').Router();
let projectController = require('../../services/project.js');
// const projectServices = require('../../services/project.js'); 
const projectServices = require('../../../src/services/project.js'); 
const authServices = require('../../../src/services/auth.js');    




    router.get('/allprojects', async function (req, res) {              //this route works!  
        let data = await projectController.allProjects();
        // let data = projectController.allProjects();
        // let data;

        // function getAllProjectData (scope){
        //     console.log("this is :", scope)
        //     this.data = projectController.allProjects();  //Cannot access 'data' before initialization
        //     return projectController.allProjects();
        // }
        res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // res.header("Access-Control-Allow-Headers", "Origin");
        res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
        res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
        // res.json({
        //     status: 200,
        //     message: 'This API is working, there should be data here!!',
        //     body: data
        // });

        return res.status(200).send({  // how responded in old project
            success: 'true',
            projectsArray: data,
        })
    });
    
    router.post('/project', async(req, res) => {
        // res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   // Just this header - post still doesnt hit. 
        // console.log("req in post new entry: ", req)// .body)  req is huge object.
        try {
            console.log("PROJECT ROUTES: req.headers.auth: ", req.headers.authorization)
            if (authServices.verifyJwtTokenViaParamsNotHeaders(req.headers.authorization)   == true ){//
                // console.log("req.body in post new project: ", req.body)  // an array of strings @ 2021-Mar-21
                // console.log("req.body Type in post new entry: ", typeof req.body)  // Object - therefore auto- Json.parsed!!!
                // let reqBody = JSON.parse(req.body)      // error posting to /entry:  SyntaxError: Unexpected token o in JSON at position 1
                let theResult = await projectServices.addProject(req)//body) 
                console.log("Routes> Project:  await addProject result is: ", theResult)
                res.status(200).json({body: theResult});  // also sends result? 
                // res.send(result);
            } else {
                console.log("JWT Bad")
                res.status(500).send("JWT Bad");
            }
        } catch (error) {
            console.log("error posting to /project: ", error)
            res.status(500).send(error);
        }
    })


    
    // need to add one project route here!
    
    module.exports = router;









// export default (app) => {    // was typescript (app: Router)   "Router" is a type, caused issue. 
//     app.use('/auth', route);
  
//     // ----  mongoDB    Project Routes ---- 
//     app.get('/allprojects', async function (req, res) {
//         function getProjectsFromMongoDB(){
//             return allProjects.allProjects();
//         }

//         let theData = await getProjectsFromMongoDB();

//         return res.status(200).send({
//             success: 'true',
//             projectsArray: theData,
//         })
//     })


//     app.get('/p', async function (req, res) {
//     // console.log("in aProject, res is: ", res)   //  a ServerResponse obj!  Interesting to look at! 
//     function getAProjectFromMongoDB(){
//         return aProject.aProject();
//     }
//     let theData = await getAProjectFromMongoDB();
//     // return  theData.json();        // Error : TypeError: theData.json is not a function
//     // return res.json(theData);      // This works.  It likes this. 
//     return res.status(200).send({
//         theData
//     })
//     })
// }



// VS this export style.... 
// exports.allProjects = allProjects;
// exports.aProject = aProject;




                // // If your application expects a search to find a value you can either check the result in the callback (results==null)
                // // or daisy chain the orFail() method on the query. 



                // // export default router;
                // // exports.allProjects = allProjects();  // This worked when it was a function.. 
                // exports.allProjects = allProjects;
                // exports.aProject = aProject;
                // // module.exports = router;   // Looks like this blocks allProjects from being exported!!!! 