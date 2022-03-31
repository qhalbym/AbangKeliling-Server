const { connectMongo, getDatabase } = require("../config/mongoConnection");
let sellers = [];
let products = [];
let customers = [];
const seed_product = async () => {
  try {
    await connectMongo();
    const db = await getDatabase();
    const getSellers = await db.collection("sellers").find({}).toArray();
    sellers = getSellers;
    const getProducts = await db.collection("products").find({}).toArray();
    products = getProducts;
    const getCustomers = await db.collection("customers").find({}).toArray();
    customers = getCustomers;
    const orders = [
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[0]._id,
        SellerId: sellers[2]._id,
        ProductId: [
          {
            ProductId: products[0]._id,
            quantity: 10,
          },
          {
            ProductId: products[2]._id,
            quantity: 3,
          },
        ],
      },
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[0]._id,
        SellerId: sellers[4]._id,
        ProductId: [
          {
            ProductId: products[1]._id,
            quantity: 20,
          },
          {
            ProductId: products[2]._id,
            quantity: 10,
          },
          {
            ProductId: products[3]._id,
            quantity: 10,
          },
        ],
      },
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[2]._id,
        SellerId: sellers[1]._id,
        ProductId: [
          {
            ProductId: products[3]._id,
            quantity: 5,
          },
        ],
      },
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[4]._id,
        SellerId: sellers[1]._id,
        ProductId: [
          {
            ProductId: products[2]._id,
            quantity: 4,
          },
          {
            ProductId: products[1]._id,
            quantity: 10,
          },
          {
            ProductId: products[3]._id,
            quantity: 10,
          },
          {
            ProductId: products[4]._id,
            quantity: 10,
          },
        ],
      },
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[4]._id,
        SellerId: sellers[1]._id,
        ProductId: [
          {
            ProductId: products[4]._id,
            quantity: 10,
          },
        ],
      },
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[2]._id,
        SellerId: sellers[2]._id,
        ProductId: [
          {
            ProductId: products[3]._id,
            quantity: 10,
          },
        ],
      },
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[1]._id,
        SellerId: sellers[2]._id,
        ProductId: [
          {
            ProductId: products[4]._id,
            quantity: 1,
          },
        ],
      },
      {
        status: "waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
        CustomerId: customers[2]._id,
        SellerId: sellers[2]._id,
        ProductId: [
          {
            ProductId: products[2]._id,
            quantity: 199,
          },
        ],
      },
    ];

    await db.collection("orders").insertMany(orders);
  } catch (error) {
    console.log(error);
  }
};
seed_product();
