const express = require('express');
const {MongoClient, ServerApiVersion} = require('mongodb');
let cors = require('cors')
require('dotenv').config();
const app = express();

const URI = "mongodb+srv://saladhunter:M@n1them00n@cluster0.cnpwvt9.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(URI, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors:true
     }
})

async function run() {
     try {
          await client.connect();

          await client.db("admin").command({ping: 1});
          console.log("Successfully connected to mongoDB");
     } catch (error) {
          console.log(error);
     } finally {
          await client.close();
     }
}

run();