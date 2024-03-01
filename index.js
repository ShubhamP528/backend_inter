const express = require("express");
const app = express();
const session = require("express-session");
const { databseConnection } = require("./config/database");
const { verifiction } = require("./middleware/mobileVerification");
const personRouter = require("./routes/person");

databseConnection();
// verifiction();

app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(personRouter);

app.listen(8081, () => {
  console.log("server is running");
});
