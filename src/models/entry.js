const mongoose = require('mongoose');


const entrySchema = new mongoose.Schema(
    { 
        topic: String,
        detail: String,
        dateAdded: Date
    }
);


const Entry = mongoose.model('Entry', entrySchema);

exports.Entry = Entry;