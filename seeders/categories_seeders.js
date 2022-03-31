const { connectMongo, getDatabase } = require("../config/mongoConnection");

const categories = [
  {
    name: "Food",
    image: "https://i.imgur.com/4X5Q6BP.jpg",
  },
  {
    name: "Drinks",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cocktails-1594319263.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  },
  {
    name: "Snacks",
    image:
      "https://s3.theasianparent.com/cdn-cgi/image/height=412/tap-assets-prod/wp-content/uploads/sites/24/2021/05/leade-jajanan-tradisional.jpg",
  },
  {
    name: "Goods",
    image: "https://icon-library.com/images/goods-icon/goods-icon-27.jpg",
  },
  {
    name: "Services",
    image:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
  },
];

connectMongo()
  .then(() => {
    const db = getDatabase();
    return db.collection("categories").insertMany(categories);
  })
  .then((data) => {
    console.log(data);
    console.log("seeding categories success");
  })
  .catch((err) => {
    console.log(err);
  });
