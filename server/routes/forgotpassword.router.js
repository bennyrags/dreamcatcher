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
    res.status(400).send('email not in db')
}
})


module.exports = router; 