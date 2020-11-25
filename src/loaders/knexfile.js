
module.exports = require('knex')({      // unnamed export. 
  client: 'mysql',
  connection: {
    host : '127.0.0.1',  // Added Nov 22... 
    user: 'root',
    password: 'tori',
    database: 'node_site_db'
  }
})


// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
// In a production environment, you would want to put your 
// configuration details in a separate file 
// with restrictive permissions that is not accessible from 
// version control, but for the simplicity of this tutorial ,
//  we’re keeping it in the same file as the queries.


// const knex2 = require('knex')({   
//   client: 'mysql',
//   connection: {
//     user: 'root',
//     password: 'tori',
//     database: 'node_site_db',
//     host : '127.0.0.1',       
//     port: 7555                
//   }
// })(require('../loaders/knexfile'))


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


  // exports.mySqlDbConnection = knex;         
