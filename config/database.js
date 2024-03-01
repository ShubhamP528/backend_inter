const mongoose = require("mongoose");

const databseConnection = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/IntershipWork")
    .then(() => {
      console.log("database connection established");
    })
    .catch((err) => {
      console.log("Connection error: " + err.message);
    });
};

module.exports = { databseConnection };
