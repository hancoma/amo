var add_subject;
var add_contents;
var add_code;
var add_file_name;
var uuid;
var tag;
function save_board() {
    uuid=device.uuid;
    console.log("커뮤니티 저장");
   
          add_subject=$("#freeboard_subject").val();
          add_contents=$("#freeboard_contents").val();
          add_file_name=$("#file_name").val();
          add_code=$("#add_code").val();
          if (!add_subject) {
            alert_msg("경고","제목을 입력하세요.");
            exit;
          } else if (!add_contents) {
            alert_msg("경고","내용을 입력하세요.");
            exit;
          }


  $.post("http://ku4h.com/save_board.php",
   {
    add_subject:add_subject,
    add_contents:add_contents,
    add_file_name:add_file_name,
    add_code:add_code,
    member_srl:member_srl

    
       },
   function(data){
    freeboard_show();
    var modal = UIkit.modal("#add_contents_uk_modal");
    modal.hide();  

   });

} 


       