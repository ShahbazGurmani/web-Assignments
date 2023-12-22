// const dotenv = require('dotenv');
// dotenv.config();

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require('express-flash');


const app = express();
const PORT = process.env.PORT || 4700;

//connection to the database
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Connected to the database");
});
//.................................................................

//some middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,

  })
);

app.use((req, resp, next) => {
  resp.locals.message = req.session.message;
  delete req.session.message;
  next();
});


app.use(express.static('uploads'));
//.................................................................
//set template engine like ejs
app.set("view engine", "ejs");

//.................................................................
// app.get("/", (req, resp) => {
//   resp.send("hello node crud");
// });

//use routers
app.use("", require("./routes/routes"));

app.listen(PORT, (req, resp) => {
  console.log(`Node running on this ${PORT} port`);
});
