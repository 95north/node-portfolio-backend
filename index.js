const express = require('express');
const app = express();    
const loadersFile = require('./src/loaders')//.default({ app });
console.log("loadersFile is : ", loadersFile);
// import Logger from './loaders/logger';
// const loaders = await require('./src/loaders').default({ app });  // TypeError: require(...).default is not a functio


async function startServer() {
    console.log("in startServer")
    console.log("Running Loaders now")
    loadersFile.runLoaders(app);
    console.log("Required loaders have run")

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    // await require('./src/loaders').default({ app });  // TypeError: require(...).default is not a functio
}

startServer();















 





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











