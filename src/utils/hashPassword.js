// Utility function to see the hash of given plaintext password
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async plainText => {
  const hashedText = await bcrypt.hash(plainText, saltRounds);
  // console.log("hashedText", hashedText);
  return hashedText;
};

// const args = process.argv[2];

// if (args) {
//   console.log("string to be hashed:", args);
//   hash(args);
// }
module.exports = hashPassword;
