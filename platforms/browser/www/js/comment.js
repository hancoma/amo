function save_freeboard_comment(no) {
	var no=no;
	var freeboard_comment=$("#freeboard_comment").val();
  console.log(member_srl);
	  $.post("http://ku4h.com/freeboard_comment_save.php",
   {
    no:no,
    member_srl:member_srl,
    freeboard_comment:freeboard_comment
    
       },
   function(data){
          if (data=="ok") {
            
            contents_modal_show("freeboard",no);

          }
   });

	
}

function save_qna_comment(no) {
  var no=no;
  var qna_comment=$("#qna_comment").val();
  console.log(member_srl);
    $.post("http://ku4h.com/qna_comment_save.php",
   {
    no:no,
    member_srl:member_srl,
    qna_comment:qna_comment
    
       },
   function(data){
          if (data=="ok") {
            
            contents_modal_show("qna",no);

          }
   });

  
}


function save_parade_comment(no) {
	var no=no;
	var parade_comment=$("#parade_comment").val();
	  $.post("http://gallerybear.com/parade_comment_save.php",
   {
    no:no,
    memberuid:memberuid,
    parade_comment:parade_comment
    
       },
   function(data){
          if (data=="ok") {
            
            contents_modal_show("parade",no);

          }
   });

	
}
