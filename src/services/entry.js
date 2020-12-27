const mongoose = require('mongoose');
const Entry = mongoose.model('Entry' );
// console.log("Entry is", Entry);  // Model: Entry.  ok. 

// module.exports = {

    async function addEntry(req){
        console.log("Has req.body? req param received in addEntry is: ", req);
        try {
            let entry = new Entry(req.body);
            let result = await entry.save();
            return result
            // response.send(result);
        } catch (error) {
            return ({ error : "Error saving entry to MongoDb"})
            response.status(500).send(error);
        }
    }//, 

    // async getAllEntries(){
    //     console.log("In Entry Svcs.  Entry is: ", Entry)
    //     try {
    //         let entries = await Entry.find({});
    //         // let result = await entry.save();
    //         return entries
    //         // response.send(result);
    //     } catch (error) {
    //         console.log("Error retrieving entries from  MongoDb: ", error)
    //         return ({ error : "Error retrieving entries from  MongoDb"})
    //         response.status(500).send(error);
    //     }
    // }

    async function getAllEntries(){ 
        async function retrieveAllEntries (){
            // .find() is probably a mongoose function.... 
            let data = await Entry.find({},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
                if (err){
                    console.log("Error with Entry.find in Services ")
                    // return c//handleError(err);   
                } 
                console.log("in getAllEntries, result is: ", result )
                entries = result;
                console.log("Services > Entry > allEntries().  Type of result is --", typeof result)
                return entries;

            });
            return data;  // data = Query Object. 
        }
        let mydata = await retrieveAllEntries();
        return mydata;
    }




// } // end of old module.exports style.

exports.addEntry = addEntry;
exports.getAllEntries = getAllEntries;

// async function allProjects(){ 
//     function retrieveAllProjects (){
//         // .find() is probably a mongoose function.... 
//         let data = Project.find({},  function(err, result){  // All callbacks in Mongoose: callback(error, result)
//             if (err){
//                 console.log("Error with Project.find in Services ")
//                 // return c//handleError(err);   
//             } 
                
//             projects = result;
//             console.log("Services > Project > allProjects().  Type of result is --", typeof result)
//             console.log("___1st Project Languages", projects[0]["languages"])
//             return projects;
//         });
//         return data;  // data = Query Object. 
//     }
//     let mydata = await retrieveAllProjects();
//     return mydata;
// }



