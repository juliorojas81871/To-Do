const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const routes = require("./routes/TodoRoute");

const app = express();

//only work on local computer
const isDev = process.env.NODE_ENV === "development";

app.use(express.json());
app.use(cors());

// Routes
app.use(routes);

// this only runs in production (npm start or on heroku)
// it will run the backend always and just get the data 
// from the build when the user want to use it
if (!isDev) {
    app.use(express.static('client/build'))
}

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("app listening on port 5000")
});

