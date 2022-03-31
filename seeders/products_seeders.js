const { connectMongo, getDatabase } = require("../config/mongoConnection");
let sellers = [];
let categories = [];
const seed_product = async () => {
  try {
    await connectMongo();
    const db = await getDatabase();
    const getSellers = await db.collection("Sellers").find({}).toArray();
    sellers = getSellers;
    const getCategories = await db.collection("categories").find({}).toArray();
    categories = getCategories;
    const products = [
      {
        name: "Bakso Sapi Binaragawan",
        price: 5000,
        image:
          "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/bakso-sapi-kuah-1.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
        SellerId: sellers[0]._id,
        CategoryId: categories[0]._id,
      },
      {
        name: "Nasi Goreng Andalan Kami",
        price: 6000,
        image:
          "https://awsimages.detik.net.id/community/media/visual/2021/08/25/resep-nasi-goreng-sosis-ala-warung-bhakti_43.jpeg?w=700&q=90",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
        SellerId: sellers[3]._id,
        CategoryId: categories[3]._id,
      },
      {
        name: "Sop Iga",
        price: 5000,
        image:
          "https://ik.imagekit.io/10tn5i0v1n/article/c6aceb99e70b9f4dd816ad742289b49f.jpeg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
        SellerId: sellers[1]._id,
        CategoryId: categories[2]._id,
      },
      {
        name: "Rawon Mantab",
        price: 50000,
        image:
          "https://www.dapurawit.com/wp-content/uploads/2020/10/Resep-Rawon-Daging-Sapi-Khas-Jawa-Timur-Spesial.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
        SellerId: sellers[3]._id,
        CategoryId: categories[4]._id,
      },
      {
        name: "Sate Endolita",
        price: 5000,
        image:
          "http://asset-a.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/7670_sate-ayam.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sed ex id egestas. Sed molestie convallis laoreet. Donec eros.",
        SellerId: sellers[4]._id,
        CategoryId: categories[2]._id,
      },
    ];

    await db.collection("products").insertMany(products);
  } catch (error) {
    console.log(error);
  }
};
seed_product();
