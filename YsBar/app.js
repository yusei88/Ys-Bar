const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

const router = require('./router/index');

const url = "mongodb://localhost:27017";
const dbName = "Cocktail";

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');

const connectOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//staticディレクトリを設定
app.use(express.static("static"));
app.use(express.static("images"));

//viewエンジンをejsであることを設定
app.set("view engine", "ejs");

//baseへのルーティング
app.use('/',router);

app.get('/order', function (req, res) {
    console.log("Order in");
    res.render("order", {
        title: "Order"
    });
});

io.on('connection',function(socket){
    console.log('connected');
    socket.on("message", function (msg) {
        console.log('message: ' + msg);
        io.emit("message", msg);
    });
});

http.listen(PORT, () => console.log('app listening on port 3000!'))