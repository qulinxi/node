var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 

var app = express();
 
//  主页输出 "Hello World"
app.get('/', function (req, res) {
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        var dbo = db.db("qlx");
        dbo.collection("user"). find({}).toArray((err, result)=> { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
   console.log("主页 GET 请求");
//    res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
    
   console.log("主页 POST 请求");
})
 
//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})