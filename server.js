const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();
require("./controllers/index.js")(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});