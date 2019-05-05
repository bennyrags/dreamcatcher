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
    const queryText = `SELECT * FROM "themes" WHERE "user_id" = $1`;
    pool.query(queryText, [id])
    .then( response => {
        let themes = response.rows;
        res.send(themes);
    })
   .catch((error) => {
        res.sendStatus(500);
    console.log(`Error GETTING themes:`, error);
    }
    );
})

router.get('/count/:id', rejectUnauthenticated, (req,res,next) => {
  const id = req.params.id;
  const queryText = `SELECT themes.id, themes.theme_name, count(dreams.id) FROM themes
  JOIN themes_dreams ON themes.id = themes_dreams.theme_id
  JOIN dreams ON dreams.id = themes_dreams.dream_id
  JOIN "user" ON "user".id = themes.user_id WHERE "user".id = $1
  Group by themes.id;`;
pool.query(queryText, [id])
.then(response=>{
res.send(response.rows);
})
.catch(error=>{
  res.sendStatus(500);
  console.log(`this is the error when trying to return count of themes used in dreams by user`);
  
})
})


module.exports = router;
