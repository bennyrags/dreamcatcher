const express = require('express');
const pool = require('../modules/pool');
//const userStrategy = require('././strategies/user.strategy');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Handles POST request with new user data
// The only thing different from this and every other post 
// is that the password gets encrypted before being inserted
router.get('/:id', rejectUnauthenticated, (req, res, next) => {
    const id = req.params.id;
    const queryText = `SELECT dreams.id, dreams.date, dreams.description, dreams.score_temp, dreams.score_mood, string_agg(themes.theme_name, ', ') FROM dreams 
JOIN themes_dreams ON dreams.id = themes_dreams.dream_id
JOIN themes ON themes.id = themes_dreams.theme_id WHERE dreams.id=$1
GROUP BY dreams.id;`;

    pool.query(queryText, [id])
        .then(response => {
            let dream = response.rows;
            res.send(dream);
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log(`Error GETTING dreams:`, error);
        }
        );
});


router.delete('/:id', rejectUnauthenticated, (req,res,next) =>{
    const id = req.params.id;
    const sqlText = `DELETE FROM "dreams" WHERE "id" = $1;
    `;
    pool.query(sqlText, [id])
    .then(response=>{
      res.sendStatus(200);
    })
    .catch(error=>{
      res.sendStatus(500);
      console.log(`Error deleting dream, here is error:`, error);
      
    })
  })
router.put('/:id',rejectUnauthenticated, (req,res,next) =>{
    const id = req.params.id;
    const description = req.body.description;
    const sqlText = `UPDATE "dreams" SET "description"=$1 WHERE "id" = $2;
    `;
    pool.query(sqlText, [description, id])
    .then(response=>{
      res.sendStatus(200);
    })
    .catch(error=>{
      res.sendStatus(500);
      console.log(`Error deleting dream, here is error:`, error);
      
    })
  })
  

router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    try {

        const dream = req.body.dreamInfo;
        console.log(`this is dream:`, dream);
        const themeInfo = req.body.themes;
        const dreamQuery = `INSERT INTO "dreams" ("user_id","date","description","score_temp","score_mood") VALUES ($1,$2,$3,$4,$5) RETURNING id`;
        const themeQuery = `INSERT INTO "themes_dreams" ("theme_id","dream_id") VALUES ($1,$2)`;

        await client.query('BEGIN')
        const dreamResults = await client.query(dreamQuery, [dream.user_id, new Date(), dream.description, dream.score_temp, dream.score_mood]);
        const dreamId = dreamResults.rows[0].id;


        for (let i = 0; i < themeInfo.length; i++) {
            await client.query(themeQuery, [themeInfo[i], dreamId]);
        }

        await client.query('COMMIT')
        res.sendStatus(201)

    }
    catch (error) {
        res.sendStatus(500);
        console.log(`this is the error when trying to post `, error);

    }

    finally {
        client.release()

    }


});

module.exports = router;
