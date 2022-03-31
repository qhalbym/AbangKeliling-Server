const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017/"; // local mongodb
const uri =
  "mongodb+srv://abangkelilingh8:Abangkeliling123@cluster0.4qmof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db;

async function connectMongo() {
  try {
    const connection = await client.connect();
    db = connection.db("abangKeliling");
  } catch (err) {
    throw err;
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectMongo, getDatabase };
