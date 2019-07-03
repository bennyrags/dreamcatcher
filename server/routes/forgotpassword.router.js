//const userStrategy = require('././strategies/user.strategy');
const crypto = require ('crypto');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
require('dotenv').config();
//const User = require('../sequelize');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

//console.log(`this is crypto.randomBytes(20)toString('hex'):`, crypto.randomBytes(20).toString('hex'));

const auth = {
    auth: {
        api_key: `${process.env.MG_KEY}`,
        domain: `${process.env.MG_DOMAIN}`,
    }
}
 router.post('/',  (req,res,next)=>{
 //res.status(200).send(`hello, ${req.body.email}`);
 let email = req.body.email;
 pool.query(`SELECT "user"."email" FROM "user" WHERE "email" = $1`, [email])
.then(result=>{
    console.log(`here is result from db,`, result.rows);
    
    if (result.rows.length === 0) {
        res.status(200).send(`email not in db`);
    }
    else {
        //res.status(200).send(`this email DOES exist`);
        const token = crypto.randomBytes(20).toString('hex');
        console.log(token);
        pool.query(`UPDATE "user" SET "resetPasswordToken" = $1, "resetPasswordExpires" = $2 WHERE "email"=$3`, [token, Date.now() + 360000, req.body.email])
        .then(result=>{
            // res.status(200).send('code inserted into DB')
             })
        .catch(error=>{
            res.status(500).send('500 - error inseting code into db')
            console.log(`error inserting code into db:`, error);
            })
        ///this is where I'm going to try to get the mail to go
        const transporter = nodemailer.createTransport(mg(auth));
           const mailOptions = {
               from: `${process.env.EMAIL_ADDRESS}`,
               to: `${req.body.email}`,
               subject: `Link to reset password`,
               text: 
               `You are receiving this email because you requested th reset the password for your account.\n\n`+
               `Please click on the following link within an hour of receiving it.\n\n`+
               `http://localhost:3000/home#/reset/${token}`
           }
           console.log(`sending email`);
           transporter.sendMail(mailOptions, function(err, response){
               if (err) {
                   console.log(`there was an error sending email:`, err);           
               }
               else {
                   console.log(`here is the response:`, response);
                   res.status(200).send(`recovery email sent`);
                   //res.sendStatus(200);
                   
               }
            });
       
    
    
    
    }


//    res.status(200).send(`this is result from db: ${result.rows}`)
})
.catch(err=>{
    res.sendStatus(500);
    console.log(`error when making sql req w email`,err);
})
})

// router.post('/', rejectUnauthenticated, (req,res,next)=>{
// console.log(`this is req.body.email:`, req.body.email);
//     if (req.body.email==='') {
//     res.send('email not in db');
//     res.sendStatus(400)
// }
// User.findOne({
//     where: {
//         email: req.body.email
//     }
// })
// .then( user => {
// if (user===null) {
//     console.log(`email not in database`);
//     res.json('User not in database')
// }
// else {
//     const token = crypto.randomBytes(20).toString('hex');
//     console.log(token);
//    user.update({
//        resetPasswordToken: token,
//        resetPasswordExpires: Date.now() + 360000,
//    }); 

//    const transporter = nodemailer.createTransport(mg(auth))
//    const mailOptions = {
//        from: `${process.env.EMAIL_ADDRESS}`,
//        to: `${user.email}`,
//        subject: `Link to reset password`,
//        text: 
//        `You are receiving this email because you requested th reset the password for your account.\n\n`+
//        `Please click on the following link within an hour of receiving it.\n\n`+
//        `http://localhost:3000/reset/${token}`
//    }
//    console.log(`sending email`);
//    transporter.sendMail(mailOptions, function(err, response){
//        if (err) {
//            console.log(`there was an error sending email:`, err);           
//        }
//        else {
//            console.log(`here is the response:`, response);
//            res.send(`recovery email sent`);
//            res.sendStatus(200);
           
//        }
//    })
   
// }
// })


// })


module.exports = router; 