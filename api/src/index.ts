const express = require('express');
const {MongoClient, ServerApiVersion} = require('mongodb');
const mongoose = require('mongoose');
let cors = require('cors')
require('dotenv').config();
const app = express();
const pool = require('../db');
const port = 3000;
const URI = "mongodb://localhost:27017/Reports";


app.get('/', (req:any, res:any) => {
     res.sendStatus(200);
})

app.listen(port, () => console.log(`server has started on port: ${port}`));
