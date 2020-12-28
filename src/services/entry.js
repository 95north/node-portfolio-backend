const mongoose = require('mongoose');
const Entry = mongoose.model('Entry' );


    async function addEntry(req){
        console.log("Has req.body? req param received in addEntry is: ", req);
        try {
            let entry = new Entry(req.body);
            entry["dateAdded"] = new Date();
            let result = await entry.save();
            return result
            // response.send(result);  //  must send from route.post()
        } catch (error) {
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
        async function processDeletion (){
            let data = await Entry.findById({entryMongoId},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
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
        let mydata = await processDeletion();
        return mydata;
    }




exports.addEntry = addEntry;
exports.getAllEntries = getAllEntries;




