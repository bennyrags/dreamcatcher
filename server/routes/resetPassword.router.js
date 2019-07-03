const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

    router.get('/', (req, res) => {
      console.log(`this is req.query:`, req.query.resetPasswordToken);
      
     return res.status(200).send(req.query.resetPasswordToken);
     //check to see if 
      pool.query(``)





    User.findOne({
        where: {
          resetPasswordToken: req.query.resetPasswordToken,
          resetPasswordExpires: {
            [Op.gt]: Date.now(),
          },
        },
      }).then((user) => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          res.status(403).send('password reset link is invalid or has expired');
        } else {
          res.status(200).send({
            username: user.username,
            message: 'password reset link a-ok',
          });
        }
      });
    });

  module.exports = router