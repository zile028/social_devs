const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const DB_URI = "mongodb+srv://zile028:NEVZh2ceIeKFhjIo@cluster0.klyvhjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const server = express();

const connection = mongoose.connect(DB_URI).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log(error);
});

server.use(express.static(__dirname + "/node_modules/bootstrap/dist/css"));
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(fileUpload());

server.set("view engine", "ejs");
server.use("/", require("./routes"));
server.use((err, req, res, next) => {
    res.render("error_page", {errorMsg: err.message, cbUrl: req.headers.referer});
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});