const {
  fetchOrders,
  fetchOrderOngoing,
  fetchOrderWaiting,
  fetchOrderHistory,
  createOrder,
  updateStatus,
  deleteOrder,
} = require("../models/orders");

const getOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const SellerId = req.login.id
    if (id) {
      const order = await fetchOrders({ id });
      if (!order) {
        throw { name: "notFound", message: "Order Not Found" };
      }
      res.status(200).json(order);
    } else if (status) {
      const orderFilter = await fetchOrders({ status, SellerId });
      res.status(200).json(orderFilter);
    } else {
      const orders = await fetchOrders({ id, status });
      res.status(200).json(orders);
    }
  } catch (error) {
    next(error);
  }
};

const getOrderOngoing = async (req, res, next) => {
  // try {
  const { id, role } = req.login;
  const order = await fetchOrderOngoing({ id, role });
  res.status(200).json(order);
  // } catch (err) {
  //   next(err);
  // }
};

const getOrderWaiting = async (req, res, next) => {
  try {
    const { id, role } = req.login;
    console.log(id, role, "<<<<<<<<<<<<<<< REQ LOG");
    const payload = { id, role };
    const order = await fetchOrderWaiting(payload);
    console.log(order, role, "<<<<<< orderan");
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const getHistory = async (req, res, next) => {
  try {
    console.log(req.login, "dari history con");
    const { id, role } = req.login;
    const order = await fetchOrderHistory({ id, role });

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const addOrder = async (req, res, next) => {
  try {
    console.log(req.body, "<<<<<<<<< req body");
    const { SellerId, ProductId } = req.body.order;
    const { id } = req.login;
    const payload = { CustomerId: id, SellerId, ProductId };
    const newOrder = await createOrder(payload);
    console.log(req.body);
    if (Array.isArray(req.body.order.ProductId)) {
      req.body.order.ProductId.forEach((e) => {
        if (e.quantity == 0 || !e.quantity) {
          throw { name: "badRequest", message: "Quantity cannot be empty" };
        }
      });
    }
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await fetchOrders({ id });
    if (!order) {
      throw { name: "notFound", message: "Order Not Found" };
    }
    const update = await updateStatus(id, status);
    res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};

const removeOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await fetchOrders({ id });
    if (!order) {
      throw { name: "notFound", message: "Order Not Found" };
    }
    const delOrder = await deleteOrder(id);
    res.status(200).json(delOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrderOngoing,
  getOrderWaiting,
  getHistory,
  addOrder,
  changeStatus,
  removeOrder,
};
