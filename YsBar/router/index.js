const express = require('express');
const app = express();
const router = express.Router();

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

router
    //menuから動的ルーティング
    .get('/menu/*', (req, res) => {
        var menu_list;
        console.log("menu in")
        //DBに接続
        MongoClient.connect(url, connectOption, (err, client) => {
            assert.equal(null, err);
            const db = client.db(dbName);
            //DBから「レシピ」のリストを取得し、レンダーに渡す
            db.collection("recipe").find({ "base": req.params[0] }).toArray((err, docs) => {
                menu_list = docs;
                res.render("recipe", {
                    title: "Recipe",
                    menu_list: menu_list
                });
            });
            client.close()
        });
    })

    .get('/base', (req, res) => {
        var base_list;
        //DBに接続
        MongoClient.connect(url, connectOption, (err, client) => {
            assert.equal(null, err);
            const db = client.db(dbName);
            //DBから「ベース」のリストを取得し、レンダーに渡す
            db.collection("base").find().toArray((err, docs) => {
                base_list = docs;
                res.render("baselist", {
                    title: "BaseList",
                    base_list: base_list
                });
            });
            client.close()
        });
    })

    .get('/regist', (req, res) => {
        MongoClient.connect(url, connectOption, (err, client) => {
            assert.equal(null, err);
            const db = client.db(dbName);
            
       }) 
    });


module.exports = router;