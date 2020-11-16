
// import Logger from './loaders/logger';
// const config = require('./config');
let config = {"port" : 3000}
const express = require('express');

async function startServer() {
    console.log("in startServer")
    const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
    await require('./src/loaders').default({ app });  // TypeError: require(...).default is not a functio
        console.log("Running Loaders now")
        runLoaders(app);
        console.log("Required loaders have run")

    app.listen(config.port, () => {         // SWAP IN CORRECT PORT # !!
        // Logger.info(`
        console.log(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
        `);
    }).on('error', err => {
        console.log("Startup Error!", err);
        // Logger.error(err);
        process.exit(1);
    });
}

startServer();





// const models = require('./src/models');       // all Models.  ATM is just Projects
// const connectDb = require('./src/models');    // the MongoDB database Connection itself 
// const allProjects = require('./src/api/routes/project.js');   // SHOULD MOVE THIS LATER !!!! to controller or svc. 
// const aProject = require('./src/api/routes/project.js');   // SHOULD MOVE THIS LATER !!!! to controller or svc. 






// // ---- MySQL   KNEX    User + Auth Routes ---- 
// // body-parser middleware-grabs the HTTP body, decodes the info, appends it 
// // to the req.body
// app.post('/book', (req, res) => {
//     const book = req.body;

//     // Output the book to the console for debugging
//     console.log(book);
//     books.push(book);

//     res.send('Book is added to the database');
// });


// app.get('/', (req, res) => {
//     // res.sendStatus(200)
//     res.json({info: "Testing!"})
// })















 





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











