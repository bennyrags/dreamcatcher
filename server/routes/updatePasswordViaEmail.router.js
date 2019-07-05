const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');

router.put('/', (req,res) => {
res.status(200).send('hello from updatePasswordViaEmail!')
});



module.exports = router;