// import { Router, Request, Response, NextFunction } from 'express';
const allProjects = require('../../services/project.js');   // SHOULD MOVE THIS LATER !!!! to controller or svc. 
const aProject = require('../../services/project.js');   // SHOULD MOVE THIS LATER !!!! to controller or svc. 
// const route = Router();  NOT USED
// ***** MIGHT need to import model like:    Contact = require('./contactModel');

    // ----  mongoDB    Project Routes ---- 
    exports.allprojects = async function (req, res) {
        console.log("ALL PROJECTS FETCH UNDER ROUTE FOLDER CALLED!")
        function getProjectsFromMongoDB(){
            return allProjects.allProjects();
        }

        let theData = await getProjectsFromMongoDB();

        return res.status(200).send({
            success: 'true',
            projectsArray: theData,
        })
    }


    exports.p =  async function (req, res) {
    // console.log("in aProject, res is: ", res)   //  a ServerResponse obj!  Interesting to look at! 
    function getAProjectFromMongoDB(){
        return aProject.aProject();
    }
    let theData = await getAProjectFromMongoDB();
    // return  theData.json();        // Error : TypeError: theData.json is not a function
    // return res.json(theData);      // This works.  It likes this. 
    return res.status(200).send({
        theData
    })
    }






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





// moved all below to /services/projects.js
                // // Project model is MongoDB ! 

                // const express = require('express');
                // const router = express.Router();
                // const mongoose = require('mongoose');
                // const connectDb = require('../../../src/models');  // connectDb.connectDb to access it...    this is the DB connection





                // // var Athlete = mongoose.model('Athlete', yourSchema);
                // // var query = Athlete.find({ 'sport': 'Tennis' });
                // const Project = mongoose.model('Project');
                // // var allProjects = Project.find({});
                // // allProjects = () => { Project.find({}); }


                // async function allProjects(){ 

                //     function retrieveAllProjects (){
                //         let data = Project.find({},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
                //             if (err) return handleError(err);   
                //             projects = result;
                //             console.log("Type of result is -------", typeof result)
                //             console.log("________", projects[0]["languages"])
                //             return projects;

                //             // if (projects.length > 0){
                //             //     return { success: true,
                //             //         "info" : projects
                //             //       }   // projects
                //             // } else {
                //             //     return "There seem to be no projects?"
                //             // }
                //         });
                //         return data;  // data = Query Object. 
                //     }

                //     let mydata = await retrieveAllProjects();
                //     return mydata;
                // }



                // async function aProject (){
                //     function retrieveAllProjects (){
                //         let data = Project.findOne() //  function(err, result){  // All callbacks in Mongoose: callback(error, result)
                //         //     if (err) return handleError(err);   
                //         //     projects = result;
                //         //     console.log("Type of result is -------", typeof result)
                //         //     console.log("________", projects[0]["languages"])
                //         //     return projects;

                //         // });
                //         // return data; 
                //         return data

                //     }
                //     let mydata = await retrieveAllProjects();
                //     return mydata;
                // }






                // // If your application expects a search to find a value you can either check the result in the callback (results==null)
                // // or daisy chain the orFail() method on the query. 



                // // export default router;
                // // exports.allProjects = allProjects();  // This worked when it was a function.. 
                // exports.allProjects = allProjects;
                // exports.aProject = aProject;
                // // module.exports = router;   // Looks like this blocks allProjects from being exported!!!! 