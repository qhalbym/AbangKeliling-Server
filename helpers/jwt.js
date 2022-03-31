const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET;

const payloadToToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const tokenToPayload = (access_token) => {
  return jwt.verify(access_token, SECRET_KEY);
};

module.exports = {
  payloadToToken,
  tokenToPayload,
};
