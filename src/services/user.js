const crypto = require('crypto')
// const knex = mySqlConnection.mySqlDbConnection;     // using named export.
const knex = require('../loaders/knexfile');

// move to auth? Or keep here? 
module.exports = {
    saltHashPassword,
    checkUserExists,

    createUser ({ username, password }) {
      console.log(`Add user ${username}`)
      console.log("pw is :", password)
      console.log("pw type :", typeof password)

      const { salt, hash } = saltHashPassword({password})
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

    // Add error handling? 
    // Should this be here or in auth? 
    // was named 'authenticate' orig. 
    checkPassword ({ username, password }) {
      console.log(`Authenticating user:  ${username}`)
      return knex('user').where({ username: username })
      // knex('user').where({ username: username })
        .then((user) => {
          console.log("In store.authenticate() - user is ", user) 
          console.log("In store.authenticate() - user.salt is ", user[0].salt) 

          if (!user) return { success: false }
          const { hash } = saltHashPassword({
            password : password,
            salt: user[0].salt
          })
          console.log("hash is: ", hash)
          // let resp = {header: ""};
          // resp.header("Access-Control-Allow-Origin", "*");
          // resp.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
          // resp.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
  

          success: hash === user[0].encrypted_password ? resp = {
            success: true, 
            "uinfo" : username, 
            "uId" : user[0].id,
            // body: user[0].id
          } : resp = {success : false}
          // Token added in Routes > Login.js.   within  route.post('/processlogin'...
          // success: hash === user[0].encrypted_password ? resp = {success: true, "uinfo" : username, "moreUserInfo" : user, "token": "HARD CODED BAD !"} : resp = {success : false}

          // resp.body = {success: true, 
          //   "uinfo" : username, 
          //   "uId" : user[0].id,}

            // resp.send({success: true,   // .send() doesn't work here bc not in req/res
            //   "uinfo" : username, 
            //   "uId" : user[0].id})

          return { 
            // success: hash === user.encrypted_password,
            // "uinfo" : hash
            // user
            resp
          }

        })
    }

}


function saltHashPassword ({password, salt = randomString()}) {
  console.log(`in saltHashPswd   user salt: ${salt},  pw: ${password}`)
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

function checkUserExists(){

}


function randomString () {
    // crypto is a native node module and need not be installed using npm.
    return crypto.randomBytes(4).toString('hex')
}
