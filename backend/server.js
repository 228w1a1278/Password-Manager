const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// MongoDB Setup
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Passop';

client.connect();


// Fetch all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

app.post('/', async (req, res) => {
  const password = req.body;

  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const result = await collection.insertOne(password);

    res.status(201).send({ success: true, result });
  } catch (err) {
    console.error('Insert Error:', err);
    res.status(500).send({ success: false, message: 'Insert failed' });
  }
});

app.delete('/', async (req, res) => {
  const { id } = req.body;

  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const result = await collection.deleteOne({ id: id });

    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, message: 'Password deleted' });
    } else {
      res.status(404).send({ success: false, message: 'Password not found' });
    }
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).send({ success: false, message: 'Delete failed' });
  }
});

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
