

    const Binary = require('mongodb').Binary;
    // to store images as binData in MongoDB document: 
    const fs = require('fs');


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
        console.log("Loading image file");
        // console.log("uploaded img is : ", img);  //  uploaded img is :  <Buffer 89 50 4e 47 0d 
        

        // return img  // what if just return Buffer instead? 

        var imageBin = {};
        imageBin.bin = Binary(img);                 // const Binary = require('mongodb').Binary;
        // console.log("type of imageBin.bin is : ", typeof imageBin.bin) // "object"
        console.log("imageBin.bin is instance of Binary? : ", imageBin.bin instanceof Binary) // true
        console.log("largo de invoice.bin= "+ imageBin.bin.length());
        console.log("Buffer.isEncoding(utf8) :", Buffer.isEncoding("utf8")) // returns true for both utf8 and binary.... 
        console.log("Buffer.isEncoding(binary) :", Buffer.isEncoding("binary"))  // returns true for both utf8 and binary.... 
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









