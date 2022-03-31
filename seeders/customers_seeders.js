const { connectMongo, getDatabase } = require("../config/mongoConnection");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);

const customers = [
  {
    username: "Marquez",
    email: "marquez@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 102.816666,
      latitude: Number("-3.200000"),
    },
  },
  {
    username: "Alex Rins",
    email: "akex@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 102.816666,
      latitude: Number("-3.200000"),
    },
  },
  {
    username: "Joan Mir",
    email: "joan@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 102.816666,
      latitude: Number("-3.200000"),
    },
  },
  {
    username: "Giacomo Agostini",
    email: "Agos@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 102.816666,
      latitude: Number("-3.200000"),
    },
  },
  {
    username: "Nicky Hayden",
    email: "hayden@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 102.816666,
      latitude: Number("-3.200000"),
    },
  },
];

const seed_customers = connectMongo()
  .then(() => {
    const db = getDatabase();
    return db.collection("customers").insertMany(customers);
  })
  .then((data) => {
    console.log(data);
    console.log("seeding customers success");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = seed_customers;
