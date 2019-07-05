const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');

router.put('/', (req,res) => {
//res.status(200).send('hello from updatePasswordViaEmail!, here is req.body!', req.body)
//res.sendStatus(200);
console.log(`this is req.body,`, req.body);
const password = encryptLib.encryptPassword(req.body.password)
const userName = req.body.username;
let sqlText = `UPDATE "user" SET "password" = $1 WHERE "username" = $2`;
pool.query(sqlText, [password, userName])
.then(response=>{
        res.status(200).send('password updated')
    }
)
.catch(error=>{ 
res.status(500).send('Error updating password')
console.log(`there was an error updating the password:`, error);

})
});



module.exports = router;