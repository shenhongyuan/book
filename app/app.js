let express = require('express');
let app = express();
let path = require('path');
app.use(express.static(path.resolve('..','node_modules')));
app.use(express.static(path.resolve()));
app.get('/',function(req,res){
    res.sendFile(path.resolve('index.html'));
});
app.listen(8080);