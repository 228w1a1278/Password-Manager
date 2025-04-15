const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Passop';
const port = 3000
app.use(bodyparser.json())
app.use(cors())
client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({success: true,result: findResult})
})

const { ObjectId } = require('mongodb');

const { ObjectId } = require('mongodb');

app.delete('/', async (req, res) => {
  const { id } = req.body; 
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ success: false, message: "Item not found" });
    }

    res.send({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "Error deleting item" });
  }
});





// app.get('/', async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection('documents');
//   const findResult = await collection.find({}).toArray();
//   res.json(findResult)
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})