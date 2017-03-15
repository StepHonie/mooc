$(function(){
  $('.del').click(function(e){
    var target=$(e.target); //e.target是一个原生的Dom对象，用$符号把其变成jQeury对象
    var id=target.data('id');
    var tr=$('.item-id-'+id);

    $.ajax({
      type:delete,
      url: '/admin/list?id='+id;
    })
    .done(function(results{
      if(results.suscees===1){
        if(tr.length>0){
          tr.remove();
        }
      }
    })
  })
})
