const express = require('express');
const pool = require('../modules/pool');
//const userStrategy = require('././strategies/user.strategy');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res, next) => {  
  const id = req.params.id;
    const queryText = `SELECT * FROM "dreams" WHERE "user_id" = $1 ORDER BY "date" DESC`;
    pool.query(queryText, [id])
    .then( response => {
        let dreams = response.rows;
        res.send(dreams);
    })
   .catch((error) => {
        res.sendStatus(500);
    console.log(`Error GETTING dreams:`, error);
    }
    );
})

module.exports = router;
