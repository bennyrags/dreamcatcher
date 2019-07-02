//const userStrategy = require('././strategies/user.strategy');
const crypto = require ('crypto');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
require('dotenv').config();
const User = require('../sequelize');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

//console.log(`this is crypto.randomBytes(20)toString('hex'):`, crypto.randomBytes(20).toString('hex'));

const auth = {
    auth: {
        api_key: `${process.env.MG_KEY}`,
        domain: `${process.env.MG_DOMAIN}`,
    }
}


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
   }); 

   const transporter = nodemailer.createTransport(mg(auth))
   const mailOptions = {
       from: `${process.env.EMAIL_ADDRESS}`,
       to: `${user.email}`,
       subject: `Link to reset password`,
       text: 
       `You are receiving this email because you requested th reset the password for your account.\n\n`+
       `Please click on the following link within an hour of receiving it.\n\n`+
       `http://localhost:3000/reset/${token}`
   }
   console.log(`sending email`);
   transporter.sendMail(mailOptions, function(err, response){
       if (err) {
           console.log(`there was an error sending email:`, err);           
       }
       else {
           console.log(`here is the response:`, response);
           res.send(`recovery email sent`);
           res.sendStatus(200);
           
       }
   })
   
}
})


})


module.exports = router; 