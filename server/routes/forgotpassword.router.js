const express = require('express');
const pool = require('../modules/pool');
//const userStrategy = require('././strategies/user.strategy');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
require('dotenv').config();


router.post('/', rejectUnauthenticated, (req,res)=>{
console.log(`this is req.body.email:`, req.body.email);
    if (req.body.email==='') {
    res.status(400).send('email not in db')
}
})


module.exports = router; 