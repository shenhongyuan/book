let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
let fs = require('fs');
const BOOK_FILE_NAME = 'books.json';
app.use(function(req,res,next){
    //访问控制 允许哪个域来请求我的服务器接口
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8080');
    //允许跨域请求的方法
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    next();
});
//读books
function read(callback){
    fs.readFile(BOOK_FILE_NAME,'utf8',function(err,data){
        if(err){
            callback([]);
        }else{
           try{
               let books = JSON.parse(data);
               callback(books);
           }catch(e){
               callback([]);
           }
        }
    });
}
//向文件里写books
function write(books,callback){
    fs.writeFile(BOOK_FILE_NAME,JSON.stringify(books),callback);
}
//查询所有的书籍
app.get('/books',function(req,res){
    read(function(books){
        res.send(books);
    })
});
//查看单个书籍 路径参数 id是 /books/1 id =1
app.get('/books/:id',function(req,res){
    read(function(books){
        let book = books.find(book=>book.id == req.params.id);
        res.send(book);
    })
});
//增加一本
app.post('/books',function(req,res){
     let book = req.body;
     read(function(books){
         book.id = books.length==0?1:books[books.length-1].id+1;
         books.push(book);
         write(books,function(){
             res.send(book);
         })
     });
});
//删除一本书
app.delete('/books/:id',function(req,res){
    read(function(books){
        books = books.filter(book=>book.id != req.params.id);
        write(books,function(){
            res.send({});
        })
    })
})
//修改一本书
app.put('/books/:id',function(req,res){
    let book = req.body;
    read(function(books){
        books = books.map(item=>item.id == req.params.id?book:item);
        write(books,function(){
            res.send(book);
        });
    })
});
app.listen(3000);