function main_show() {
   $.ajax({
            type:"GET",
            url:"http://ku4h.com/app_data.php",
            success:function(data){
                $("#main_contents").html(data);
            }
        })
}
function chat_show() {
  menu="chat";
  console.log("대화방");
  $("#chat_icon").addClass('active');
  $.ajax({
            type:"GET",
            url:"http://ku4h.com/chat_app.php",
            success:function(data){
                $("#main_contents").html(data);
            }
        })
}



function photo_show(cat) {
  var cat=cat;
  // 지도 숨김 
  $("#photo_icon").addClass('active');
 $.post("http://ku4h.com/photo_list_app.php",
   {
    cat:cat
    
       },
   function(data){

$("#main_contents").html(data);
  
   });

}

function freeboard_show(cat) {
  var cat=cat;
$("#board_icon").addClass('active');
  $("#top_banner").html("freeboard");
 $.post("http://ku4h.com/freeboard_list_app.php",
   {
    cat:cat
    
       },
   function(data){

$("#main_contents").html(data);

   });

}

function shop_show() {
  console.log("쇼핑");
  $("#shop_icon").addClass('active');
  $.ajax({
            type:"GET",
            url:"http://www.ku4h.com/shop_list.php",
            success:function(data){
                $("#main_contents").html(data);
            }
        })
}

function blog_show() {
  console.log("블로그");
  $("#blog_icon").addClass('active');
  $.ajax({
            type:"GET",
            url:"http://www.ku4h.com/atopy_blog.php",
            success:function(data){
                $("#main_contents").html(data);
            }
        })
}

function exit_show() {
navigator.notification.confirm("종료하시게습니까? ", onConfirm, "Confirmation", "Yes,No"); 
 } 