const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
const mongoose = require("mongoose");

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require("dotenv").config();
require("./controllers/index.js")(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.mongodburi || "mongodb://localhost:27017/itenerary");

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});