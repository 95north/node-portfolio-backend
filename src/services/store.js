const crypto = require('crypto')
// Need to rename this.  It is used in loaders/knexfile.


// const knex = require('knex')(require('../loaders/knexfile'))
// Error: knex: Required configuration option 'client' is missing.
const knex = require('knex')({      // LOAD THIS IN FROM KNEXFILE.JS  INSTEAD? ? ? 
  client: 'mysql',
  connection: {
    host : '127.0.0.1',  // Added Nov 22... 
    user: 'root',
    password: 'tori',
    database: 'node_site_db'
  }
}) // (require('../loaders/knexfile'));

// const mySQLdb = require('knex')(knex);  //  Unknown configuration option 'client' value


module.exports = {
    saltHashPassword,

    createUser ({ username, password }) {
      console.log(`Add user ${username}`)
      const { salt, hash } = saltHashPassword(password)
      return knex('user').insert({
        salt,
        encrypted_password: hash,
        username
      })//.debug()   // log a Knex query
    },

    retrieveUserList () {
      console.log(`Retrieving all users function in Services > store.js.   knex is: `, knex);
      // return mySQLdb('user');
      return knex('user');

    },

    authenticate ({ username, password }) {
      console.log(`Authenticating user ${username}`)
      return knex('user').where({ username })
        .then(([user]) => {
          console.log("In store.authenticate() - user is ", user) 
          if (!user) return { success: false }
          const { hash } = saltHashPassword({
            password,
            salt: user.salt
          })
          return { success: hash === user.encrypted_password,
            "uinfo" : hash
          }
        })
    }

}


function saltHashPassword ({password, salt = randomString()}) {
// function saltHashPassword (password) {  // now accepts salt optionally
// argument as object- call like: 
//   saltHashPassword({ password: 'some password', salt: '239ab09'})
// ie. more obvious what happens in function call
    // const salt = randomString()  // don't need w refactor
    const hash = crypto
      .createHmac('sha512', salt)
      .update(password)
    return {
      salt,
      hash: hash.digest('hex')
    }
}


function randomString () {
  // crypto is a native node module and need not be installed using npm.
  return crypto.randomBytes(4).toString('hex')
}








// All we need our store to do is load in knex using the 
// knexfile.js config and then write data to the user table 
// whenever a createUser request is made.

// const knex = require('knex')(require('./knexfile'))

// module.exports = {
//   createUser ({ username, password }) {
//     console.log(`Add user ${username} with password ${password}`)
//     return knex('user').insert({
//       username,
//       password
//     })
//   }
// }





// Initial store.js : 
// index.js : When we run this file, the server will listen on 
// http://localhost:7555 for POST requests to /createUser 
// and pass those requests to the store file. 
// The server will then respond with a 200 status code 
// (200 is the code that every HTTP server uses to say the request was successful).

// For the time being, we will mock the store in order to check that our API works.
// Below: did NOT persist created user to mysql

// module.exports = {
//     createUser ({ username, password }) {
//       console.log(`Add user ${username} with password ${password}`)
//       return Promise.resolve()
//     }
//   }