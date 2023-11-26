var express = require('express');
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion;
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();
var app = express();
var pool = require('../db');
var port = 3000;
var URI = "mongodb://localhost:27017/Reports";
app.get('/', function (req, res) {
    res.sendStatus(200);
});
app.listen(port, function () { return console.log("server has started on port: ".concat(port)); });
