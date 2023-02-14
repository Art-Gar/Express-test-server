const express = require('express');
const app=express();
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
let sql;


const db = new sqlite3.Database('./data.db',sqlite3.OPEN_READWRITE, (err) =>{

    if (err) return console.error(err.message);
});

//gets data from db of all users http://localhost:5000/api/db/
router.get('/', function(request, response){
    db.all('select * from users', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {

            response.send(results);
        }
    });
});
//gets data from db of a single user http://localhost:5000/api/db/:id :id=id parameter
router.get('/:id', function(request, response){
    db.all(`select * from users where id = ${parseInt(request.params.id)}`, function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        }  
                results.forEach(results => {
        console.log(results);
    })
            response.send(results);
    });
});


//inserts a new user into the db
router.post('/', (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    if(!newUser.first_name || !newUser.last_name || !newUser.email) {
        res.status(400).json({msg: 'Please include both a name and an email'});
    }
    sql = `INSERT INTO users(first_name,last_name,email) VALUES (?,?,?)`;
    db.run(sql,
    [newUser.first_name,newUser.last_name,newUser.email], (err) =>  {
    if (err){ 
        res.status(400).json({msg: 'Please include both a name and an email/put a unique email'}); 
        return console.error(err.message) }
    else res.json({  msg: `user deleted` });
})
});
//deletes a user from the db
router.delete('/:id', (req,res) => {
sql = `DELETE FROM users WHERE id=?`;
db.run(sql, [req.params.id], (err) => {
    if (err) return console.error(err.message);
    else res.json({  msg: `user deleted` });
})
});

module.exports=router;