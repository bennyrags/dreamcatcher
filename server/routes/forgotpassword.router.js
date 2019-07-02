//const userStrategy = require('././strategies/user.strategy');
const crypto = require ('crypto');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
require('dotenv').config();
const User = require('../sequelize');


//console.log(`this is crypto.randomBytes(20)toString('hex'):`, crypto.randomBytes(20).toString('hex'));

router.post('/', rejectUnauthenticated, (req,res,next)=>{
console.log(`this is req.body.email:`, req.body.email);
    if (req.body.email==='') {
    res.send('email not in db');
    res.sendStatus(400)
}
User.findOne({
    where: {
        email: req.body.email
    }
})
.then( user => {
if (user===null) {
    console.log(`email not in database`);
    res.json('User not in database')
}
else {
    const token = crypto.randomBytes(20).toString('hex');
    console.log(token);
   user.update({
       resetPasswordToken: token,
       resetPasswordExpires: Date.now() + 360000,
   }) 
}
})


})


module.exports = router; 