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
const port = 3001
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

// Make sure app.use(express.json()) is added at the top

app.delete("/", async (req, res) => {
  const { id } = req.body;
  console.log("Delete request received for id:", id);

  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const result = await collection.deleteOne({ id: id }); // delete by UUID

    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, message: "Password deleted" });
    } else {
      res.status(404).send({ success: false, message: "Password not found" });
    }
  } catch (error) {
    console.error("Error deleting password:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
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