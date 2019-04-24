const express = require('express');
const pool = require('../modules/pool');
//const userStrategy = require('././strategies/user.strategy');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.get('/:id', rejectUnauthenticated, (req, res, next) => {  
  const id = req.params.id;
    const queryText = `SELECT * FROM "dreams" WHERE "user_id" = $1`;
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

// router.get('/id:/dreams', (req,res,next) => {
// //assume that id is sent with req so I can get dreams just for this id.
//     const id = req.params.id;
//     const queryText = ''
// }); 

module.exports = router;
