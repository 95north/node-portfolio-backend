// Project: Services - MOVED ALL THIS HERE FROM  API/ROUTES/project.js !!! 


// Project model is MongoDB ! 

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connectDb = require('../../src/models');  // connectDb.connectDb to access it...    this is the DB connection






// const projectSchema = require('../models/project.js') // works in mongoose.js ...
// //  Error on below: `Model` is not a valid type at path `Project`. 
// const Project = mongoose.model('Project', projectSchema);  //  [MissingSchemaError]: Schema hasn't been registered for model "Project".

const Project = require('../models/project.js') // works in mongoose.js ...
// const Project = exports.Project;

// var allProjects = Project.find({});
// allProjects = () => { Project.find({}); }


async function allProjects(){ 
    console.log("Project is", Project);
    function retrieveAllProjects (){
        let data = Project.find({},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
            if (err){
                console.log("Error with Project.find in Services ")
                // return c//handleError(err);   
            } 
                
            projects = result;
            console.log("Type of result is -------", typeof result)
            console.log("________", projects[0]["languages"])
            return projects;

            // if (projects.length > 0){
            //     return { success: true,
            //         "info" : projects
            //       }   // projects
            // } else {
            //     return "There seem to be no projects?"
            // }
        });
        return data;  // data = Query Object. 
    }
    let mydata = await retrieveAllProjects();
    return mydata;
}



async function aProject (){
    function retrieveAllProjects (){
        let data = Project.findOne() //  function(err, result){  // All callbacks in Mongoose: callback(error, result)
        //     if (err) return handleError(err);   
        //     projects = result;
        //     console.log("Type of result is -------", typeof result)
        //     console.log("________", projects[0]["languages"])
        //     return projects;

        // });
        // return data; 
        return data

    }
    let mydata = await retrieveAllProjects();
    return mydata;
}











// If your application expects a search to find a value you can either check the result in the callback (results==null)
// or daisy chain the orFail() method on the query. 



// export default router;
// exports.allProjects = allProjects();  // This worked when it was a function.. 
exports.allProjects = allProjects;
exports.aProject = aProject;
// module.exports = router;   // Looks like this blocks allProjects from being exported!!!! 