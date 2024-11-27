const express=require("express");
const mysql2=require("mysql2");
const bodyParser = require('body-parser');
const cors = require('cors');


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'SCHOOL',
    password:'Akshat@15.'
});

