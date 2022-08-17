const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const routes = require("./routes/TodoRoute");

const app = express();

const isDev = process.env.NODE_ENV === "development";

app.use(express.json());
app.use(cors());

// Routes
app.use(routes);

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

// let port = process.env.PORT;
const PORT = process.env.port || 5000;
// if(port == null || port == ""){
//     port = 5000;
// }

app.listen(PORT, () => {
    console.log("app listening on port 5000")
});

// app.listen(process.env.PORT || 5000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });