// Project model is MongoDB ! 

// const express = require('express');
// const router = express.Router();
// const connectDb = require('../../src/models');  // connectDb.connectDb to access it...    this is the DB connection

// const projectSchema = require('../models/project.js') // works in mongoose.js ...
// //  Error on below: `Model` is not a valid type at path `Project`. 
// const Project = mongoose.model('Project', projectSchema);  //  [MissingSchemaError]: Schema hasn't been registered for model "Project".

const mongoose = require('mongoose');
const Project = mongoose.model('Project' );
console.log("Project is", Project); // A MongoDb Model, correct! 
// const Project = require('../models/project.js') // works in mongoose.js ...
// const Project = exports.Project;
const fs = require('fs');
const Binary = require('mongodb').Binary;


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


async function addProject (req){
    // console.log("Has req.body? req param received in addProj is: ", req.body);  //  req=IncomingMessage { _readableState: ReadableState {
    //  WORKS !! Get Body: is an array containing a string: '�PNG\r' + '\n\u001a\n\u0000\u0000\u0000\r' +

    let image = await processImageUpload(req.body[0])
    // console.log("image is: ", image.slice(0, 300))
    
    // for (var key of req.body.images.entries()) {     // is not a function or its return value is not iterable
    //     console.log(key[0] + ', ' + key[1]);
    // }
    // for (var key of data.entries()) {
    //     console.log(key[0] + ', ' + key[1]);
    // }

    try {
        let project = new Project({
            // "topic" : req.subject,  
            // "detail": req.detail
            "name": req.name,
            "description": req.description,
            "link": req.link,
            "languages": req.languages,
            "year": req.year,
            "images": image
            // "images": req.images
        });
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




const processImageUpload = (base64Img) => {
    let decodedImage = "Default val no good";
    // ??? best practice was to store image location and other such metadata to the DB and store the image file to disk.
    // base64 encode the image, 
    // then store it using mongo's BinData type. 
    // As I understand, that will save as BSON bit array, 
    // not actually store the base64 string, so the size won't grow larger than your original binary image.
    // It will display in json queries as a base64 string.

    // https://stackoverflow.com/questions/52285059/when-storing-binary-data-in-mongodb-is-it-stored-as-binary-or-base64-internally
    // <bindata> is "the base64 representation of a binary string", according to this: BSON Data Types and Associated Representations - Binary


    // Binary() - constructor - A class representation of the BSON Binary type. (from MongoDB)
    // Arguments:       buffer (buffer) – a buffer object containing the binary data.
    // Argument2:       [subType] (number) – the option binary type
    // https://mongodb.github.io/node-mongodb-native/api-bson-generated/binary.html

    // var img = fs.readFileSync(imgLocation);     // const fs = require('fs');
    // errno: -63,
    // syscall: 'open',
    // code: 'ENAMETOOLONG',
    // path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhE

    
    // fs.readFile(image_origial, function(err, original_data){
    fs.readFile(base64Img, async function(err, base64Img){
        console.log("base64img is: ", base64Img);
        // var decodedImage = new Buffer(base64Img, 'base64').toString('binary');
        decodedImage = await new Buffer.from(base64Img).toString('binary');

        // error posting to /project:  Error: ENAMETOOLONG: name too long, open 'data:image/png;base64,iVBORw0KGgoAAAANS

        console.log("decodedImage  img is : ", decodedImage);  //  uploaded img is :  <Buffer 89 50 4e 47 0d 
        // console.log("uploaded img is : ", img);  //  uploaded img is :  <Buffer 89 50 4e 47 0d 

        fs.writeFile('image_decoded.jpg', decodedImage, function(err) {console.log("processImageUpload writefile err: ", err)});
    });
    // fs.readFile(image_origial, function(err, original_data){
    //     fs.writeFile('image_orig.jpg', original_data, function(err) {});
    //     var base64Image = new Buffer(original_data, 'binary').toString('base64');
    //     var decodedImage = new Buffer(base64Image, 'base64').toString('binary');
    //     fs.writeFile('image_decoded.jpg', decodedImage, function(err) {});
    // });



    // error posting to /project:  TypeError [ERR_INVALID_ARG_VALUE]: 
    // The argument 'path' must be a string or Uint8Array without null bytes. 
    // Received '�PNG\r' +
    // '\n\u001a\n\u0000\u0000\u0000\r' +
    // 'IHDR\u0000\u0000\u0002.\u0000\u0000\u0002T\b\u0006\u0000\u0000\u00002�x\u0000...
    //   at Object.readFileSync (fs.js:333:35)


    // print it out so you can check that the file is loaded correctly
    // console.log("Loading image file");
    // console.log("uploaded img is : ", img);  //  uploaded img is :  <Buffer 89 50 4e 47 0d 
    

    // return img  // what if just return Buffer instead? 

    var imageBin = {};
    // imageBin.bin = Binary(img);                 // const Binary = require('mongodb').Binary;
    imageBin.bin = Binary(decodedImage);                 // const Binary = require('mongodb').Binary;

    // console.log("type of imageBin.bin is : ", typeof imageBin.bin) // "object"
    console.log("imageBin.bin is instance of Binary? : ", imageBin.bin instanceof Binary) // true
    // console.log("length de invoice.bin= "+ imageBin.bin.length());
    // console.log("Buffer.isEncoding(utf8) :", Buffer.isEncoding("utf8")) // returns true for both utf8 and binary.... 
    // console.log("Buffer.isEncoding(binary) :", Buffer.isEncoding("binary"))  // returns true for both utf8 and binary.... 
    return imageBin.bin
    // What gets inserted into MongoDB: 
    //  images: [ 'BinData(0, ' + '"iVBORw0KGgoAAAANSUhEUgAABmwAAAQoCAYAAAAHVfHnAAAMJWlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU8kagOeWJCQktEAEpITeBJFepNcIAlIFGyEJJJQYEoKKHVlUcC2oiGBFV0....
}       // ends  processImageUpload




const deadcode_processImageUpload = (imgLocation) => {
    // ??? best practice was to store image location and other such metadata to the DB and store the image file to disk.
    // base64 encode the image, 
    // then store it using mongo's BinData type. 
    // As I understand, that will save as BSON bit array, 
    // not actually store the base64 string, so the size won't grow larger than your original binary image.
    // It will display in json queries as a base64 string.

    // https://stackoverflow.com/questions/52285059/when-storing-binary-data-in-mongodb-is-it-stored-as-binary-or-base64-internally
    // <bindata> is "the base64 representation of a binary string", according to this: BSON Data Types and Associated Representations - Binary


    // Binary() - constructor - A class representation of the BSON Binary type. (from MongoDB)
    // Arguments:       buffer (buffer) – a buffer object containing the binary data.
    // Argument2:       [subType] (number) – the option binary type
    // https://mongodb.github.io/node-mongodb-native/api-bson-generated/binary.html

    var img = fs.readFileSync(imgLocation);     // const fs = require('fs');
    // error posting to /project:  TypeError [ERR_INVALID_ARG_VALUE]: 
    // The argument 'path' must be a string or Uint8Array without null bytes. 
    // Received '�PNG\r' +
    // '\n\u001a\n\u0000\u0000\u0000\r' +
    // 'IHDR\u0000\u0000\u0002.\u0000\u0000\u0002T\b\u0006\u0000\u0000\u00002�x\u0000...
    //   at Object.readFileSync (fs.js:333:35)


    // print it out so you can check that the file is loaded correctly
    // console.log("Loading image file");
    console.log("uploaded img is : ", img);  //  uploaded img is :  <Buffer 89 50 4e 47 0d 
    

    // return img  // what if just return Buffer instead? 

    var imageBin = {};
    imageBin.bin = Binary(img);                 // const Binary = require('mongodb').Binary;
    // console.log("type of imageBin.bin is : ", typeof imageBin.bin) // "object"
    console.log("imageBin.bin is instance of Binary? : ", imageBin.bin instanceof Binary) // true
    // console.log("length de invoice.bin= "+ imageBin.bin.length());
    // console.log("Buffer.isEncoding(utf8) :", Buffer.isEncoding("utf8")) // returns true for both utf8 and binary.... 
    // console.log("Buffer.isEncoding(binary) :", Buffer.isEncoding("binary"))  // returns true for both utf8 and binary.... 
    return imageBin.bin
    // What gets inserted into MongoDB: 
    //  images: [ 'BinData(0, ' + '"iVBORw0KGgoAAAANSUhEUgAABmwAAAQoCAYAAAAHVfHnAAAMJWlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU8kagOeWJCQktEAEpITeBJFepNcIAlIFGyEJJJQYEoKKHVlUcC2oiGBFV0....
}       // ends  processImageUpload









// If your application expects a search to find a value you can either check the result in the callback (results==null)
// or daisy chain the orFail() method on the query. 



// export default router;
// exports.allProjects = allProjects();  // This worked when it was a function.. 
exports.allProjects = allProjects;
exports.aProject = aProject;
exports.addProject = addProject;

// module.exports = router;   // Looks like this blocks allProjects from being exported!!!! 