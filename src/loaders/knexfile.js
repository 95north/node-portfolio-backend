
const store = require('../services/store');  //****** KNEX TO CONNECT TO MySQL DATABASE !!!!  */
const connectDb = require('../models');    // the MongoDB database Connection itself 


// // PORT for MySQL + KNEX .   Looks like it works running 2 ports for 2 DBs! 
// app.listen(7555, () => {
//   console.log('Server running on http://localhost:7555')
// })


// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
// In a production environment, you would want to put your 
// configuration details in a separate file 
// with restrictive permissions that is not accessible from 
// version control, but for the simplicity of this tutorial ,
//  we’re keeping it in the same file as the queries.

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// })



// this is in Services > store.js.   This is probably not being used anywhere, pasted in on Nov 22. 
const knex = require('knex')({      // LOAD THIS IN FROM KNEXFILE.JS  INSTEAD? ? ? 
  client: 'mysql',
  connection: {
    user: 'root',
    password: 'tori',
    database: 'node_site_db',
    host : '127.0.0.1',       // added Nov 23
    port: 7555                // VS ADDED Sun Nov 22nd. 
  }
})(require('../loaders/knexfile'))



// module.exports = require('knex')({
//     client: 'mysql',
//     connection: {
//       user: 'root',
//       password: 'tori',
//       database: 'node_site_db',
//       host : '127.0.0.1',       // added Nov 23
//       port: 7555                // VS ADDED Sun Nov 22nd. 
//     }// ,
//     // migrations: {
//     //   tableName: migrationTable
//     // }
//   })



  module.exports = {          // This is how it is in node_express_site.... 
    client: 'mysql',
    connection: {
      user: 'root',
      password: 'tori',
      database: 'node_site_db',
      host : '127.0.0.1',       // added Nov 23
      port: 7555                // VS ADDED Sun Nov 22nd. 
    }
  }