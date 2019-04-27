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

// router.post('/', rejectUnauthenticated, (req,res,next) => {
// const dream = req.body;


// const queryText = `
    
//     with new_dream as(
//     INSERT INTO "dreams" ("user_id","date","description","score_temp","score_mood")
//     VALUES ($1,$2,$3,$4,$5)
//     RETURNING ID
//     )
//     INSERT INTO "themes_dreams" (theme_id, dream_id) VALUES 
//     ($6,(SELECT ID FROM new_dream));
//     `
    
    
//     `
//     INSERT INTO "dreams" ("user_id","date","description","score_temp","score_mood")
// VALUES ($1,$2,$3,$4,$5);
// `
//pool.query(queryText, [dream.user_id, dream.date,dream.description,dream.score_temp,dream.score_mood])
// pool.query(queryText, [dream.user_id, dream.date,dream.description,dream.score_temp,dream.score_mood,  dream.themes])
// .then(reposonse => {
// res.sendStatus(200)
// res.send(response.data)
// })
// .catch(error => {
// res.sendStatus(500);
// console.log(`This is an error when posting new dream`, error);
// })
//});



module.exports = router;
