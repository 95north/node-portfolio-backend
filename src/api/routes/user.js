// User is KNEX + MySql !
// move user routes here, move logic in /services/user.js 
import { Router} from 'express';
// const store = require('././src/services/store');  //****** KNEX TO CONNECT TO MySQL DATABASE !!!!  */
// ^^^ is not Knex,  it's service functions createUser(), authenticate().
const store = require('././src/loaders/knexfile');  
console.log("Store in Api > User.js is :  ", store)


const route = Router();


export default (app) => {    // was typescript (app: Router)   "Router" is a type, caused issue. 
  app.post('/createUser', (req, res) => {
      store                     // store = KNEX -- MySQL
        .createUser({
          username: req.body.username,
          password: req.body.password
        })
        .then(() => res.sendStatus(200))
  })

  app.get('/userList', (req, res) => {
    console.log("in Routes > User.js >  userList route is hit!")
    store                     // store = KNEX -- MySQL
      .retrieveUserList
      .then((results) => res.send(results));
      // .then(() => res.sendStatus(200))
  })

}