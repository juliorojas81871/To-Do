const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const routes = require("./routes/TodoRoute");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use(routes);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));

let port = process.env.PORT;
if(port == null || port == ""){
    port = 5000;
}

app.listen(port, () => {
    console.log("app listening on port 5000")
});