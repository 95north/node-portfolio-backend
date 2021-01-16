const mongoose = require('mongoose');
const Entry = mongoose.model('Entry' );


    async function addEntry(req){
        console.log("Has req.body? req param received in addEntry is: ", req);
        try {
            let entry = new Entry({"topic" : req.subject,  "detail": req.detail});
            entry["dateAdded"] = new Date();
            let result = await entry.save();
            return result
            // response.send(result);  //  must send from route.post()
        } catch (error) {
            console.log("add entry error is: ", error)
            return ({ error : "Error saving entry to MongoDb"})
        }
    }//, 

    // async getAllEntries(){
    //     try {
    //     } catch (error) {
    //         console.log("Error retrieving entries from  MongoDb: ", error)
    //         return ({ error : "Error retrieving entries from  MongoDb"})
    //         response.status(500).send(error);
    //     }
    // }

    async function getAllEntries(){     // Need error handling - refactored from try+catch style..
        async function retrieveAllEntries (){
            let data = await Entry.find({},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
                if (err){
                    console.log("Error with Entry.find in Services ")
                    // return c//handleError(err);   
                } 
                // console.log("in getAllEntries, result is: ", result )
                entries = result;
                // console.log("Services > Entry > allEntries().  Type of result is --", typeof result)
                return entries;

            });
            return data;  // data = Query Object. 
        }
        let mydata = await retrieveAllEntries();
        return mydata;
    }





    async function deleteEntry(entryMongoId){     // Need error handling - refactored from try+catch style..
        console.log("in deleteEntry, entryMongoId is ", entryMongoId)
        // let entries; 
        async function processDeletion (){
            // db.collections('quotes').findOneAndDelete(  query,   options,  callback)
            let data = await Entry.findByIdAndDelete(entryMongoId,  function(err, result){  // All callbacks in Mongoose: callback(error, result)
                if (err){
                    console.log("Error with Entry.find in Services ")
                    // return c//handleError(err);   
                } else {
                    console.log("in delete , result is: ", result )
                    // console.log("Services > Entry > allEntries().  Type of result is --", typeof result)
                    // entries = result;
                    // return entries;
                    null;
                }
            });
            console.log("in deleteEntry, data  returned is: ", data)
            return data
            // let result = data.deleteOne();
            // console.log("in deleteEntry, result  returned is: ", result)

            // return data;  // data = Query Object. 

            // return result;  // data = Query Object. 
        }

        let mydata = await processDeletion();
        console.log("my data is: ", mydata)
        return mydata;
    }

    // async function deleteEntry(entryMongoId){     // Need error handling - refactored from try+catch style..
    //     console.log("in deleteEntry, entryMongoId is ", entryMongoId)
    //     async function processDeletion (){
    //         let data = await Entry.findById({entryMongoId},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
    //             if (err){
    //                 console.log("Error with Entry.find in Services ")
    //                 // return c//handleError(err);   
    //             } 
    //             // console.log("in getAllEntries, result is: ", result )
    //             entries = result;
    //             // console.log("Services > Entry > allEntries().  Type of result is --", typeof result)
    //             return entries;

    //         });
    //         console.log("in deleteEntry, data  returned is: ", data)
    //         let result = data.deleteOne();
    //         console.log("in deleteEntry, result  returned is: ", result)

    //         return result;  // data = Query Object. 
    //     }
    //     let mydata = await processDeletion();
    //     return mydata;
    // }




exports.addEntry = addEntry;
exports.getAllEntries = getAllEntries;
exports.deleteEntry = deleteEntry;




