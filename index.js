var express=require('express');
var app=express();
var port=process.env.PORT || 3001;

app.set('views','./views');
app.set('view engine','jade');
app.listen(port);

console.log("I'm listening port: "+port);

app.get('/',function(req,res)
{
  res.render('index',{
    title: 'imooc 首页'
  })
})

app.get('/movie/:id',function(req,res){
  res.render('admin',{
    title:'imooc管理页'
  })
})

app.get('/admin/list',function(req,res){
  res.render('list',{
    title:'imooc列表页'
  })
})

app.get('/admin/movie',function(req,res){
  res.render('detail',{
    title:'imooc详情页'
  })
})
