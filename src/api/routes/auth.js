// Auth is KNEX + MySql !
// move auth routes here, move logic in /services/auth.js 

import { Router } from 'express';
const route = Router();

export default (app) => {    // was typescript (app: Router)   "Router" is a type, caused issue. 
  app.post('/login', (req, res) => {
      store                     // store = KNEX -- MySQL
        .authenticate({
            username: req.body.username,
            password: req.body.password
        })
        //.then(({ success }) => {
        .then(( resp ) => {
            console.log("In Backend Index post login response. uInfo is: ", resp.uinfo)
            if (resp.success) {       // need to change to add === true ? 
              // res.sendStatus(200)
              const userinfo = resp.uinfo;   
              return res.status(200).send({
                success: 'true',
                message: 'retrieved successfully',
                // body: success   // get body: true   when console log
                userinfo
              });
            } else {
              res.sendStatus(401)
            }
        })
  })
}