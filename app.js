const express=require("express");
const mysql=require("mysql2");
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
const PORT=8080;
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'SCHOOL',
    password:'Akshat@15.'
});

app.use(cors());
app.use(bodyParser.json());

connection.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});


app.get('/listSchools', (req, res) => {
    const { LATITUDE, LONGITUDE } = req.query;

   
    if (!LATITUDE || !LONGITUDE) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const sql = 'SELECT *, (6371 * acos(cos(radians(?)) * cos(radians(LATITUDE)) * cos(radians(LONGITUDE) - radians(?)) + sin(radians(?)) * sin(radians(LATITUDE)))) AS distance FROM schools ORDER BY distance';
    db.query(sql, [LATITUDE, LONGITUDE, LATITUDE], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        res.json(results);
    });
});


app.post('/addSchool', (req, res) => {
    const { NAME, ADDRESS, LATITUDE, LONGITUDE } = req.body;

    
    if (!NAME || !ADDRESS || !LATITUDE || !LONGITUDE) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = 'INSERT INTO schools (NAME, ADDRESS, LATITUDE, LONGITUDE) VALUES (?, ?, ?, ?)';
    db.query(sql, [NAME, ADDRESS, LATITUDE, LONGITUDE], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insertion error.' });
        }
        res.status(201).json({ id: result.insertId, NAME, ADDRESS, LATITUDE, LONGITUDE });
    });
});



app.get("/",(req,res)=>{
    res.send("Home page");
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});