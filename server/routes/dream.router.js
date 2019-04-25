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
  const queryText = `SELECT dreams.id, dreams.date, dreams.description, dreams.score_temp, dreams.score_mood, string_agg(themes.theme_name, ', ') FROM dreams 
JOIN themes_dreams ON dreams.id = themes_dreams.dream_id
JOIN themes ON themes.id = themes_dreams.theme_id WHERE dreams.id=$1
GROUP BY dreams.id;`;

    pool.query(queryText, [id])
    .then( response => {
        let dream = response.rows;
        res.send(dream);
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
