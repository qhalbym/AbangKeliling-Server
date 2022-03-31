require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./config/mongoConnection");
const app = express();
const PORT = process.env.PORT || 4000;

const router = require("./routes");


const errorHandler = require('./middlewares/errorHandler');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errorHandler);

connectMongo()
  .then(() => {
    app.listen(PORT, () => console.log("Running in port", PORT));
  });
// .catch((err) => console.log(err));

module.exports = app;
