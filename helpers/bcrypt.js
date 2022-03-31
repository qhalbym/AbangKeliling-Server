const bcrypt = require("bcryptjs");

const encryptPass = (plainPassword) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(plainPassword, salt);
};

const comparePass = (plainPassword, hashedPass) => {
  return bcrypt.compareSync(plainPassword, hashedPass);
};

module.exports = {
  encryptPass,
  comparePass,
};
