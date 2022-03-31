const { connectMongo, getDatabase } = require("../config/mongoConnection");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);

const sellers = [
  {
    username: "Miing",
    email: "bgranat@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 106.816666,
      latitude: Number("-6.200000"),
    },
    status: "open",
    storeName: "Bakso Urat Malu",
    storeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
  },
  {
    username: "Basuki",
    email: "basuki@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 106.816666,
      latitude: Number("-6.200000"),
    },
    status: "open",
    storeName: "Sop iga cicak",
    storeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
  },
  {
    username: "Kadir",
    email: "kadir@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 106.816666,
      latitude: Number("-6.200000"),
    },
    status: "open",
    storeName: "Sate Ekor Biawak",
    storeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
  },
  {
    username: "Doyok",
    email: "doyok@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 106.816666,
      latitude: Number("-6.200000"),
    },
    status: "open",
    storeName: "Sup Sapi Binaraga",
    storeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
  },
  {
    username: "Unang",
    email: "unang@gmail.com",
    password: bcrypt.hashSync("test1234", salt),
    phoneNumber: "08123456",
    location: {
      longitude: 106.816666,
      latitude: Number("-6.200000"),
    },
    status: "open",
    storeName: "Rawon kuah solar",
    storeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
  },
];

const seed_sellers = connectMongo()
  .then(() => {
    const db = getDatabase();
    return db.collection("sellers").insertMany(sellers);
  })
  .then((data) => {
    console.log(data);
    console.log("seeding sellers success");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = seed_sellers;
