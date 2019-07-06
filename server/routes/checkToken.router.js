const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

    router.get('/', (req, res) => {
      console.log(`this is req.query:`, req.query.resetPasswordToken);
      
     //return res.status(200).send(req.query.resetPasswordToken);
     //check to see if token is valid, less than one hour old

     let queryText = `SELECT "user"."resetPasswordExpires", "user"."username" FROM "user" WHERE "resetPasswordToken"=$1`
     
     pool.query(queryText, [req.query.resetPasswordToken])
     .then(response=>{
      console.log(`this is response from select resetPasswordExpires from user`, (response.rows[0]));
      console.log(`this is response from select resetPasswordExpires from user`, Number(response.rows[0].resetPasswordExpires));
      console.log(`this is date.now`, Date.now());
      let expireDate = Number(response.rows[0].resetPasswordExpires)
      let userName = response.rows[0].username
      if (expireDate > Date.now()) {
        res.status(200).send({
                  username: userName,
                  message: 'password reset link a-ok',
                });
      }
      else {
        res.status(200).send(`thie reseset Password has expired`)
      }
     })
     .catch(error=>{
       
      console.log(`this is the error when calling the resetPassword query`, error);
      
     })






    // User.findOne({
    //     where: {
    //       resetPasswordToken: req.query.resetPasswordToken,
    //       resetPasswordExpires: {
    //         [Op.gt]: Date.now(),
    //       },
    //     },
    //   }).then((user) => {
    //     if (user == null) {
    //       console.error('password reset link is invalid or has expired');
    //       res.status(403).send('password reset link is invalid or has expired');
    //     } else {
    //       res.status(200).send({
    //         username: user.username,
    //         message: 'password reset link a-ok',
    //       });
    //     }
    //   });
    });

  module.exports = router