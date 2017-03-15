var express=require('express');
var path=require('path');
var app=express();
var mongoose=require('mongoose');
var _=require('underscore');
var Movie=require('./models/movie');
var port=process.env.PORT || 3005;

mongoose.connect('mongodb://localhost/mooc');

app.set('views','./views/pages');
app.set('view engine','jade');
// app.use(express.bodyParser());
var bodyParser=require('body-parser');
// app.use(express.static(path.join(__dirname,'bower_components')));
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log("I'm listening port: "+port);

//index page
app.get('/',function(req,res)
{
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);
    }
    res.render('index',{
      title: 'imooc 首页',
      movies:movies
    });
  });
});

//
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

//admin post movie 后台录入页Post过来的数据-->update/addNew
app.post('/admin/movie/new',function(req,res){
  var id=req.body.movie._id;
  var movieObj=req.body.movie;
  var _movie;
  if(id!==undefined){
    Movie.findById('id',function(err,movie){
      if(err){
        console.log(err);
      }
      _movie = _.extend(movie,movieObj);
      _movie.save(function(err,movie){
        if(err){
          console.log(err);
        }
        res.redirect('/movie/'+movie.id);
      });
    });
  }else{
    _movie = new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary:movieObj.summary,
      flash:movieObj.falsh
    });
    _movie.save(function(err,movie){
      if(err){
        console.log(err);
      }
      res.redirect('/movie/'+movie._id);
    });
  }
});

//list delete movie
app.delete('/admin/list',function(req,res){
  var id=req.query.id;
  Movie.remove({_id:id},function(err,movie){
    if(err){
      console.log(err);
    }else{
      res.json({success:1});
    }
  })
})


//list page
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
      flash:'http://player.youku.com/player.php/sid/XMTQ5NzY4MTI4MA==/v.swf',
      summary:'sdjfowej'
    }]
  })
})

//detail page
app.get('/movie/:id',function(req,res){
  var id=req.params.id;
  Movie.findById(id,function(err,movie){
    res.render('detail',{
      title: movie.title+'详情页',
      movie: movie
    })
  })

})
