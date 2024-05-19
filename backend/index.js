const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("Connected DB");
      console.log("Servert listening to port " + PORT);
  });
});
