const crypto = require('crypto')
// const knex = mySqlConnection.mySqlDbConnection;     // using named export.
const knex = require('../loaders/knexfile');


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
      console.log("Services > User.js - hit retrieveUserList")    
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

// For the time being, we will mock the store in order to check that our API works.
// Below: did NOT persist created user to mysql

// module.exports = {
//     createUser ({ username, password }) {
//       console.log(`Add user ${username} with password ${password}`)
//       return Promise.resolve()
//     }
//   }