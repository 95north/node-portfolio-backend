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
var atob = require('atob');
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








addProject = async (req) => {
    // console.log("Has req.body? req param received in addProj is: ", req.body);  //  req=IncomingMessage { _readableState: ReadableState {
    //  WORKS !! Get Body: is an array containing a string: '�PNG\r' + '\n\u001a\n\u0000\u0000\u0000\r' +

    // let image = await processImageUpload(req.body[0])
    // let images = []
    // let numberOfImages = req.body.length
    // for (let i=0; i<numberOfImages; i++) {     // is not a function or its return value is not iterable
    //     let img = await processImageUpload(req.body[i])
    //     images.push(img)
    // }    
    
    let images = await processImageArray(req)
    console.log("in main addProject, images arr is: ", images )

    // for (var key of req.body.images.entries()) {     // is not a function or its return value is not iterable
    //     console.log(key[0] + ', ' + key[1]);
    // }

    try {
        let project = new Project({
            // "topic" : req.subject,  
            // "detail": req.detail
            "name": req.body.name ? req.body.name : "None !",
            "description": req.body.description ? req.body.description : "None !",
            "link": req.body.link ? req.body.link : "None !",
            "languages": req.body.languages ? req.body.languages : "None !",
            "year": req.body.year ? req.body.year : 2050 ,
            "images": images
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



// req.body is a string obj - JSONified 
processImageArray = async (req) => {
    let images = []
    let numberOfImages = req.body.length

    // console.log("req.body", req.body)      // 'data:image/png;base64,iVBORw0KGgoA ... 
    console.log("----typeof req.body", typeof req.body)     // Obj
    console.log("----keys in req.body", Object.keys(req.body) );    // Object éArray Iteratorê äü
    console.log("----# keys in req.body", Object.keys(req.body).length );    // 1
    // console.log("req.body[Array]", req.body["Array"] );    // Object éArray Iteratorê äü
    // let reqBody = JSON.parse(req.body)              //   SyntaxError: Unexpected token d in JSON at position 0
    // console.log("typeof reqBody (parsed JSON)", typeof reqBody) 

    for (let i=0; i<numberOfImages; i++) {     // is not a function or its return value is not iterable
        let img = await processImageUpload(req.body[i])    /// REFACTOR BODY TO HAVE >1 IMG
        images.push(img)
    }    
    return images
    
}




processImageUpload = async (base64Img) => {   // convert base64Img file (str),  to  buffer,  to binary. 
    let decodedImage = "Default val no good";
    console.log("processImageUpload - typeof base64Img : ", typeof base64Img)   // string


    let file = await readBase64ImgFile(base64Img);   // returns a buffer



    // fs.readFile(base64Img, async function(err, base64Img){
    //     console.log("base64img is: ", base64Img);
    //     decodedImage = await new Buffer.from(base64Img).toString('binary');
    //     fs.writeFile('image_decoded.jpg', decodedImage, function(err) {console.log("processImageUpload writefile err: ", err)});
    // });
    console.log("processImageUpload - typeof file : ", typeof file)  // obj
    console.log("processImageUpload - file instanceof Buffer  : ", file instanceof Buffer )  // obj
    console.log("processImageUpload - file instanceof Binary (testing atob(base64str); )  : ", file instanceof Binary )  // obj

    console.log("processImageUpload - file length : ", file.length)  // string


    var imageBin = {};
    imageBin.bin = await  Binary(file);                 // const Binary = require('mongodb').Binary;
    // imageBin.bin = await  Binary(decodedImage);                 // const Binary = require('mongodb').Binary;


    console.log("imageBin.bin is instance of Binary? : ", imageBin.bin instanceof Binary) // true
    console.log("imageBin.bin is  : ", imageBin.bin )   //object
    console.log("imageBin.bin KEYS is  : ", Object.keys(imageBin.bin) )   //object
    // console.log("imageBin.bin[0] is  : ", imageBin.bin["0"] )   // undefined
    console.log("imageBin.bin[0] is  : ", imageBin.bin["buffer"] )   // WORKS


    console.log("typeof imageBin.bin is  : ", typeof imageBin.bin )

    // console.log("imageBin.bin.Binary.buffer is  : ", imageBin.bin[0].buffer )

    // SHOULD BE: imageBin.bin is: = �PNG
    // IHDR�{���
    //          %iCCPICC ProfileH���TS���$$$�@����^�R	$���YTp-��`EWD]
    // ��������R@W�{������?��e2w�                                      �
    //                           �1l�(�G�'�
    // dNLNa�X;6G"
    // ���P����wס5�+�2_?��W���$��i\	'�Ap7�H����f� a�@[

    
    return imageBin.bin["buffer"]
    // What gets inserted into MongoDB: 
    //  images: [ 'BinData(0, ' + '"iVBORw0KGgoAAAANSUhEUgAABmwAAAQoCAYAAAAHVfHnAAAMJWlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU8kagOeWJCQktEAEpITeBJFepNcIAlIFGyEJJJQYEoKKHVlUcC2oiGBFV0....
}       // ends  processImageUpload


readBase64ImgFile = (base64Img) => {   // returns a buffer
    
    let decodedImage = null;

    let buff = new Buffer(base64Img.slice(21), 'base64');   // data:image/png;base64,  remove 1st 22 chars. 
    decodedImage = buff.toString('ascii');

    
    
    // fs.readFile(base64Img, async function(base64Img, err){  // base64img is:  éError: ENAMETOOLONG: name too long, open 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA
    
    // fs.readFile(base64Img, 'base64', async function(err, base64Img2){  // base64img is:  éError: ENAMETOOLONG: name too long, open 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA
    // //  The "path" argument must be one of type string, Buffer, or URL. Received type object
    // // fs.readFile(image_origial, function(err, original_data){
        //     // // This tells node to load the file into a Buffer 'original_data' because you
        //     // // have not specified an encoding for the returned values. If you provided an
        //     // // encoding, then original_data would be a string with that encoding.
        
        //     console.log("base64img is: ", base64Img2);    // undefined!!!!! 
        //     decodedImage = await Buffer.from(base64Img2, 'base64'); // got rid of new keyword
        //     decodedImage = decodedImage.toString('binary');
        
        
        //     fs.writeFile('image_decoded.jpg', decodedImage, function(err) {console.log("processImageUpload writefile err: ", err)});
        // });
        
        // readFile expects a file path...
        // decodedImage = fs.readFile(base64Img,  async function (err, data) {
            // decodedImage = fs.readFile(base64Img, {encoding: 'base64'}, async function (err, data) {   // errno: -63, code: 'ENAMETOOLONG',
            //     console.log ("decodedImage err is: ", err)
            //  The "path" argument must be one of type string, Buffer, or URL. Received type object
            // fs.readFile(image_origial, function(err, original_data){
                // // This tells node to load the file into a Buffer 'original_data' because you
                // // have not specified an encoding for the returned values. If you provided an
                // // encoding, then original_data would be a string with that encoding.
                
                // console.log("base64img is: ", base64Img2); // undefined!!!!! 
                // decodedImage = await Buffer.from(base64Img2, 'base64'); // got rid of new keyword
                // decodedImage = decodedImage.toString('binary');
                
                
                // fs.writeFile('image_decoded.jpg', decodedImage, function (err) { console.log("processImageUpload writefile err: ", err); });
                
                // });
                // atob(): decodes a base64 encoded string("atob" should be read as "ASCII to binary").
                // return atob(base64Img);   // NOPE. returns neither Binary nor Buffer typeof. 

                return buff;
                return decodedImage;
            }
            
            
            




// If your application expects a search to find a value you can either check the result in the callback (results==null)
// or daisy chain the orFail() method on the query. 



// export default router;
// exports.allProjects = allProjects();  // This worked when it was a function.. 
exports.allProjects = allProjects;
exports.aProject = aProject;
exports.addProject = addProject;

// module.exports = router;   // Looks like this blocks allProjects from being exported!!!! 