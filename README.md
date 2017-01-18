#初始化项目
```
npm init -y
```

```angular2html
{"name":"angular权威指南","price":99,"img":"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"}
```


```
curl 
-X POST 
--data '{"name":"angular权威指南","price":99,"img":"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"}' 
-H "Content-Type:application/json" 
http://localhost:8080/books
```