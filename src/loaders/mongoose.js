const express = require('express');
const URL_MONGODB = "mongodb://localhost:27017/portfoliodb";   // mongodb://<HOSTNAME>:<PORT>/<DBNAME>       // dbpath=/data/db
// const URL_MONGODB = "mongodb://127.0.0.1.27017/portfoliodb"; 
const PORT_MONGODB = "27017";  // Redundant??
const mongoose = require('mongoose');
mongoose.set('debug', false); // This toggles whetheg Mongoose.insert()s printed or not!!!
const models = require('../models');  
const Project = require('../models/project');  
const fs = require('fs');
const Binary = require('mongodb').Binary;
// const mongoWebApp = express(); 


exports.connectMongoDb = async (app) => {           // this function is actively used! 
    // console.log("In Loaders > Mongoose, app is: ", app)
    await connectDb(app); //.then(seedMongoDb());
            // app.use(express.static('public'))                        // TypeError: app.use is not a function
            // app.use(function(req, res, next) {
            //     res.header("Access-Control-Allow-Origin", "*");
            //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //     next();
            // });
    seedMongoDb(app);
}


// exports.connectDb = async () => {  
const connectDb = async (app) => {    // Does it still work if I disconnect this? NO - bc use this in main index!!! 
    // When createProjectSeedData() was never reached, this was never being invoked.....
    let k = await connectToMongoDB(app)
    return k;

    function connectToMongoDB(app){
        let mongoDbConnection = mongoose.connect(
                    URL_MONGODB, 
                    { useNewUrlParser: true, 
                    useUnifiedTopology: true }
                ).catch(err => 
                    console.log("Mongoose port 27017 error connecting: ", err)
                ).then(() => {
                    console.log(`Mongoose.js connectDb  mongoDbConnection: , ${mongoDbConnection}
                    ################################################
                    🛡️🛡️  Mongoose Server - on port:  ${PORT_MONGODB}
                    ################################################`);
                    app.app.listen(PORT_MONGODB, () => {
                        console.log("Server has started!")
                    })
                    // app.app.use(express.static('public'))                     
                    
                    // localhost didn’t send any data.
                    // frontend error: Unhandled Rejection (TypeError): Failed to execute 'json' on 'Response': body stream already read
                    // but without the CORS below, get CORS blocked issue! 

                    app.app.use(function(req, res, next) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        // next();
                    });
                }
        )
        // mongoDbConnection.use(express.static('public'))                     // TypeError: mongoDbConnection.use is not a function
        // mongoDbConnection.use(function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        // });
        console.log("typeof mongoDbConnection : ", mongoDbConnection)
        return mongoDbConnection;
        // return mongoose.connect(process.env.DATABASE_URL);
    }
};


// eg. the environment var in an .env file could look like this:
// DATABASE_URL=mongodb://localhost:27017/node-express-mongodb-server

// The database URL can seen when you start up 
// MongoDB on the command line. You only need 
// to define a subpath for the URL 
// to define a specific database. 
// If the database doesn't exist yet, 
// MongoDB will create one for you.







// // connectDb.on('error', (error) => console.error(error))    // connectDb.on is not a function  :( 
// // db.once('open', () => console.log('connected to database'))

// // const models = { User, Message };  // export as list, doesn't like
// // const models = { Project };   as list.  commented out to resolve error  TypeError: models.models.Project is not a constructor main index.js ln161
// const models = Project;  // YUP! This fixed it 

// // export { connectDb }; // export list. 
// // export default models;
// exports.connectDb = connectDb;  // the MongoDB DataBase  **Connection** itself,  there is a Connection object.. 
// exports.models = models;





// //  this version: re-initializes db on every Express server start
const eraseDatabaseOnSync =  true;  // was true, changed bc got error "Cannot read property 'deleteMany' of undefined"
// const seedMongoDb = (app) => {  
const seedMongoDb = async (app) => {  

    console.log("INSIDE ASYNC FUNCTION AFTER CONNECTDB EXECUTES")
    // console.log("app is: ", app)
    // const models = require('../models');  
    // const Project = require('../models/project');  
    console.log(" MongoDb Project is:", Project)  //MongoDb Project is: { Project: Model { Project } }
    console.log("typeof  MongoDb Project is:", typeof Project)
    console.log(" MongoDb Project.Proejct is:", Project.Project)
    console.log("typeof  MongoDb Project.Project is:", typeof Project.Project) // a Function
    console.log(" MongoDb Project.Project.Model is:", Project.Project.Model)
    console.log(" MongoDb Project.Model is:", Project.Model)
    console.log(" MongoDb Models is:", models)  //MongoDb Project is: { Project: Model { Project } }
    console.log(" MongoDb models.Project is:", models.Project)  //MongoDb Project is: { Project: Model { Project } }

    if (eraseDatabaseOnSync && Project !== undefined) {
        //  Promise.all([
        await Promise.all([
            Project.Project.deleteMany({}),   // Cannot read property 'Project' of undefined
        ]).then(
            createProjectSeedData()
        );
    } 
    // app.listen(PORT_MONGODB , () =>
    //   console.log(`Now listening on port  ------------ ${PORT_MONGODB}!`),
    //   console.log(`Now listening on url ------------ ${URL_MONGODB}!`),
    // );
}







// connectDb().then(async () => {
//     console.log("INSIDE ASYNC FUNCTION AFTER CONNECTDB EXECUTES")
//     if (eraseDatabaseOnSync && Project !== undefined) {
//         await Promise.all([
//             models.models.Project.deleteMany({}),
//         ])
//         createProjectSeedData();
//     }
//     // await createProjectSeedData();

//     app.listen(PORT_MONGODB , () =>
//       console.log(`Now listening on port  ------------ ${PORT_MONGODB}!`),
//       console.log(`Now listening on url ------------ ${URL_MONGODB}!`),
//     );
// });







const createProjectSeedData= async () => {
    let project1ImagesLocations = [
        "/Users/tori/Desktop/TV_images/DiyOrDont1.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont2.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont3.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont4.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont5.png"
    ];
    let project2ImagesLocations = [
        "/Users/tori/Desktop/TV_images/Bodega1.png",
        "/Users/tori/Desktop/TV_images/Bodega2.png",
        "/Users/tori/Desktop/TV_images/Bodega3.png",
        "/Users/tori/Desktop/TV_images/Bodega4.png"
    ];
    let project3ImagesLocations = [
        "/Users/tori/Desktop/TV_images/WindSolar1.png",
        "/Users/tori/Desktop/TV_images/WindSolar2.png",
        "/Users/tori/Desktop/TV_images/WindSolar3.png"
    ];
    let project4ImagesLocations = [
        "/Users/tori/Desktop/TV_images/YogaSequencer1.png",
        "/Users/tori/Desktop/TV_images/YogaSequencer2.png",
        "/Users/tori/Desktop/TV_images/YogaSequencer3.png"
    ];



    const project1 = new Project.Project({
    // const project1 = new models.models.Project({
      name: "DIY Or Don't  (FROM MONGO SEED DATA)",
      description: "Research, read, & leave reviews of home improvement projects, add projects to your list, manage your toolbox and shopping list, have your shopping list texted to you.",
      link: "http://diy-or-dont-frontend.herokuapp.com/login",
      languages: ["React", "JavaScript", "HTML", "CSS", "Ruby", "Ruby on Rails"], 
      year: 2019,
      images: []
    });
    await project1ImagesLocations.forEach(img => project1["images"].push(processImageUpload(img)));
    await project1.save();

    const project2 = new Project.Project({
    // const project2 = new models.models.Project({
      name: "Bodega Review App",
      description: "Locate the best bodega by map as rated for its coffee, cat, etc.",
      languages: ["React", "JavaScript", "HTML", "CSS", "Ruby", "Ruby on Rails"], 
      libraries: ["Mapbox"], 
      year: 2019,
      images: []
    });
    await project2ImagesLocations.forEach(img => project2["images"].push(processImageUpload(img)));
    await project2.save();

    const project3 = new Project.Project({
    // const project3 = new models.models.Project({
        name: "Wind vs Solar Energy ROI",
        description: "See if your location is a better fit for wind or solar energy!",
        languages: ["Ruby On Rails", "Ruby", "HTML", "Custom CSS", ], 
        libraries: ["ERB - monolithic app", "NOAA API", "Scraped Wind Energy Data"], 
        year: 2019,
        images: []
      });
      await project3ImagesLocations.forEach(img => project3["images"].push(processImageUpload(img)));
      await project3.save();

      const project4 = new Project.Project({
        //   const project4 = new models.models.Project({
        name: "Yoga Sequencer",
        description: "",
        languages: ["Vanilla JavaScript", "Custom HTML", "Custom CSS", "Ruby", "Ruby on Rails"], 
        libraries: ["none - manually specified!!!!  "],
        year: 2019,
        images: []
      });
      await project4ImagesLocations.forEach(img => project4["images"].push(processImageUpload(img)));
      await project4.save();
};





const processImageUpload = (imgLocation) => {
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


    // let encodedPic = window.btoa(img);  // ReferenceError: window is not defined
    // return encodedPic;


    // set an ID for the document for easy retrieval ::: 
    // imageBin._id = 12345; 
    //   mongo.connect('mongodb://localhost:27017/nogrid', function(err, db) {
    //   if(err) console.log(err);
    //      db.collection('invoices').insert(imageBin, function(err, doc){
    //     if(err) console.log(err);
    //   // check the inserted document :::
    //     console.log("Inserting file");
    //     console.log(doc);
    
    //     db.collection('invoices').findOne({_id : 12345}, function(err, doc){
    //       if (err) {
    //         console.error(err);
    //         }
    
    //       fs.writeFile('vcout.exe', doc.bin.buffer, function(err){
    //           if (err) throw err;
    //           console.log('Sucessfully saved!');
    //     });
    
    //     });
    //   });
    // });  // ends mongo.connect






// https://stackoverflow.com/questions/11442356/storing-some-small-under-1mb-files-with-mongodb-in-nodejs-without-gridfs
    // var fs = require('fs');
    // var mongo = require('mongodb').MongoClient;
    // var Binary = require('mongodb').Binary;
    
    // var archivobin = fs.readFileSync("vc.exe"); 
    // // print it out so you can check that the file is loaded correctly
    // console.log("Loading file");
    // console.log(archivobin);
    
    // var invoice = {};
    // invoice.bin = Binary(archivobin);
    
    // console.log("largo de invoice.bin= "+ invoice.bin.length());
    // // set an ID for the document for easy retrieval
    // invoice._id = 12345; 
    //   mongo.connect('mongodb://localhost:27017/nogrid', function(err, db) {
    //   if(err) console.log(err);
    //      db.collection('invoices').insert(invoice, function(err, doc){
    //     if(err) console.log(err);
    //   // check the inserted document
    //     console.log("Inserting file");
    //     console.log(doc);
    
    //     db.collection('invoices').findOne({_id : 12345}, function(err, doc){
    //       if (err) {
    //         console.error(err);
    //         }
    
    //       fs.writeFile('vcout.exe', doc.bin.buffer, function(err){
    //           if (err) throw err;
    //           console.log('Sucessfully saved!');
    //     });
    
    //     });
    //   });
    // });

}       // ends  processImageUpload












// fm  https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
// mongoDB server-side logic
// 1. define database schema -- moved to Models folder!

// var Item = new ItemSchema(
//   { img: 
//       // Buffer type allows store our image as data (arrays)
//       { data: Buffer, contentType: String }   
//   }
// );
// var Item = mongoose.model('Clothes',ItemSchema);

// path of image uploading. 
// Multer - middleware - uploads photos on the server side
// app.use(multer({ dest: ‘./uploads/’,
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));

// post to DB
//  app.post(‘/api/photo’,function(req,res){
//   var newItem = new Item();     // create instance of Item model.
//   newItem.img.data = fs.readFileSync(req.files.userPhoto.path)  // actual image. sb <Binary Data>
//   newItem.img.contentType = ‘image/png’;  // specifies file type
//   newItem.save();
//  });


















// SetUp per :   https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// //Import the mongoose module
// var mongoose = require('mongoose');

// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, { useNewUrlParser: true });

// // get the default Connection object with mongoose.connection.
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

