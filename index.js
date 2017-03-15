var express=require('express');
var path=require('path');
var app=express();
var port=process.env.PORT || 3005;

app.set('views','./views/pages');
app.set('view engine','jade');
// app.use(express.bodyParser());
var bodyParser=require('body-parser');
// app.use(express.static(path.join(__dirname,'bower_components')));
app.use(express.static(path.join(__dirname,'public')));
app.listen(port);

console.log("I'm listening port: "+port);

app.get('/',function(req,res)
{
  res.render('index',{
    title: 'imooc 首页',
    movies:[{
      title:'Moonlight',
      _id:1,
      poster:'https://assets.mubi.com/images/notebook/post_images/22621/images-w1400.jpg?1481167057'
    },{
      title:'Harry Potter',
      _id:2,
      poster:'http://www.freedesign4.me/wp-content/gallery/posters/free-movie-film-poster-harry-potter-phoenix.jpg'
    },{
      title:'Hangover',
      _id:3,
      poster:'http://img.moviepostershop.com/the-hangover-movie-poster-2009-1020488737.jpg'
    },{
      title:'Titanic',
      _id:4,
      poster:'http://www.impawards.com/1997/posters/titanic_ver2_xlg.jpg'
    },{
      title:'Portal',
      _id:5,
      poster:'http://1.media.dorkly.cvcdn.com/34/89/0e7378af2cf2fe59c89e87385530a8c3-the-best-of-videogame-movie-posters.jpg'
    },{
      title:'Miserables',
      _id:6,
      poster:'https://s-media-cache-ak0.pinimg.com/originals/58/04/f0/5804f0c6100d63b20087af79a0b5f004.jpg'
    }]
  })
})

app.get('/admin/movie',function(req,res){
  res.render('admin',{
    title:'imooc后台录入页',
    movie:{
      title:'title',
      doctor:'doctor',
      country:'country',
      year:'',
      poster:'',
      flash:'',
      summary:'',
      language:''}
  })
})

app.get('/admin/list',function(req,res){
  res.render('list',{
    title:'imooc列表页',
    movies:[{
      title:'title',
      _id:1,
      doctor:'doctor',
      country:'country',
      year:2017,
      language:'English',
      flash:'http://player.youku.com/player.php/sid/XNJANJc0NTUy/v.swf',
      summary:'sdjfowej'
    }]
  })
})

app.get('/movie/:id',function(req,res){
  res.render('detail',{
    title:'imooc详情页',
    movie: {
      doctor:'doctor',
      country:'American',
      title:'firest',
      year:2014,
      poster:'https://assets.mubi.com/images/notebook/post_images/22621/images-w1400.jpg?1481167057',
      language:'English',
      flash:'http://player.youku.com/player.php/sid/XNJANJc0NTUy/v.swf',
      summary:'There are some details about the movie.'}
  })
})
