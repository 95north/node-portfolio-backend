// Project model is MongoDB ! 

// const express = require('express');
// const router = express.Router();
// const connectDb = require('../../src/models');  // connectDb.connectDb to access it...    this is the DB connection

// const projectSchema = require('../models/project.js') // works in mongoose.js ...
// //  Error on below: `Model` is not a valid type at path `Project`. 
// const Project = mongoose.model('Project', projectSchema);  //  [MissingSchemaError]: Schema hasn't been registered for model "Project".

const mongoose = require('mongoose');
const Project = mongoose.model('Project' );
const projectServices = require('../../../src/services/project.js'); 
// const Project = require('../models/project.js') // works in mongoose.js ...
console.log("Project is", Project); // A MongoDb Model, correct! 

// const Project = exports.Project;


async function allProjects(){ 
    function retrieveAllProjects (){
        // .find() is probably a mongoose function.... 
        let data = Project.find({},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
            if (err){
                console.log("Error with Project.find in Services ")
                // return c//handleError(err);   
            } 
                
            projects = result;
            console.log("Services > Project > allProjects().  Type of result is --", typeof result)
            console.log("___1st Project Languages", projects[0]["languages"])
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


async function addProject (){
    console.log("Has req.body? req param received in addEntry is: ", req);
    try {
        let project = new Project({"topic" : req.subject,  "detail": req.detail});
        project["dateAdded"] = new Date();
        let result = await project.save();
        return result
        // response.send(result);  //  must send from route.post()
    } catch (error) {
        console.log("add project error is: ", error)
        return ({ error : "Error saving project to MongoDb"})
    }
    // let mydata = await retrieveAllProjects();
    // return mydata;
}













// If your application expects a search to find a value you can either check the result in the callback (results==null)
// or daisy chain the orFail() method on the query. 



// export default router;
// exports.allProjects = allProjects();  // This worked when it was a function.. 
exports.allProjects = allProjects;
exports.aProject = aProject;
exports.addProject = addProject;

// module.exports = router;   // Looks like this blocks allProjects from being exported!!!! 