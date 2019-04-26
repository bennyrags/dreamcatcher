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
  const queryText = `SELECT * FROM "themes" WHERE "id" = $1`;

    pool.query(queryText, [id])
    .then( response => {
        let theme = response.rows;
        res.send(theme);
    })
   .catch((error) => {
        res.sendStatus(500);
    console.log(`Error GETTING dreams:`, error);
    }
    );
})

router.put('/:id', rejectUnauthenticated, (req,res,next) =>{
  const id = req.params.id; 
  const description = req.body.description;
  console.log(`this is req.body in router.put, `, req.body)

  const queryText = `UPDATE "themes" SET "theme_description"=$1 WHERE id=$2`;
  pool.query(queryText, [description, id])
  .then(response=>{
    res.sendStatus(200);
  
  })
  .catch(error =>{
    res.sendStatus(500);
    console.log(`error updating theme. here it is:`, error);
    
  })
})


router.post('/', rejectUnauthenticated, (req,res,next) => {
let newTheme = req.body;
  console.log(`this is inside of the post req in theme and here is the req.body`, newTheme);
const queryText = `INSERT INTO "themes" ("theme_name","theme_description","theme_creation_date", "user_id") VALUES ($1,$2,$3,$4)`;
pool.query(queryText, [newTheme.theme_name, newTheme.theme_description, newTheme.theme_creation_date, newTheme.user_id ])
.then(response =>{
  res.sendStatus(200);
})
.catch(error =>{
  res.sendStatus(500);
  console.log(`Error when adding theme. heres error:`, error);
  
})
})


module.exports = router;
