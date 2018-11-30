var add_category;
var add_mode;
var add_subject;
var add_contents;
var add_code;
var add_file_name;
var uuid;
var tag;
var add_room_no;
function getImage(cat,mode) {
    add_category=cat;
    add_mode=mode;
    uuid=device.uuid;
    console.log("카메라");
    if (add_mode=="freeboard") {
          add_subject=$("#freeboard_subject").val();
          add_contents=$("#freeboard_contents").val();
          if (!add_subject) {
            alert_msg("경고","제목을 입력하세요.");
            exit;
          } else if (!add_contents) {
            alert_msg("경고","내용을 입력하세요.");
            exit;
          }

    } else if (add_mode=="qna") {
    add_contents=$("#qna_contents").val();
    } else if (add_mode=="goods") {
    add_contents=$("#goods_contents").val();
    } else if (add_mode=="parade")
    {
         add_contents=$("#parade_contents").val();
    } else if (add_mode=="photo") 
    {
         tag=$("#tag").val();
         if (!tag) {
          alert_msg("경고","태그를 먼저 입력하세요.");
          exit;
         }
    }  else if (add_mode=="chat"){
        add_room_no=$("#room_no").val();
    }


        console.log("camera"+cat + "mode "+add_mode+ " contents "+ add_contents);
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto, function(message) {
alert('사진 등록에 실패 했습니다.');
},{
quality: 100,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
});
    }

    function getImage_board(cat) {
        console.log("게시판 사진 첨부 카메라");

    uuid=device.uuid;
  
    
          add_subject=$("#freeboard_subject").val();
          add_contents=$("#freeboard_contents").val();
          add_code=$("#add_code").val();
         


       // console.log("camera"+cat + "mode "+add_mode+ " contents "+ add_contents+ " add_code "+ add_code);
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto_pic, function(message) {
alert('사진 등록에 실패 했습니다.');
},{
quality: 100,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
});
    }

    function uploadPhoto(imageURI) {
        
         navigator.notification.activityStart("사진 등록 중", "사진 업로드 중입니다.");
        var options = new FileUploadOptions();
        options.fileKey="files";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        add_file_name=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        params.category=add_category;
        params.mode=add_mode;
        params.member_srl=member_srl;
        params.contents=add_contents;
        params.uuid=uuid;
        params.tag=tag;
        params.subject=add_subject;
        params.room_no=add_room_no;

     

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://atopynews.co.kr/upload_app.php", win, fail, options);
    }

 function uploadPhoto_pic(imageURI) {
      
         navigator.notification.activityStart("사진 등록 중", "사진 업로드 중입니다.");
        var options = new FileUploadOptions();
        options.fileKey="files";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        add_file_name=member_srl+"_"+imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        params.add_code=add_code;
        params.member_srl=member_srl;
       
     

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://atopynews.co.kr/upload_file_app.php", win_board, fail, options);
    }
// 게시판 사진 첨부

function win_board(r) {
      
navigator.notification.activityStop();
      var img_src="http://atopynews.co.kr/photo/"+member_srl+"_"+add_code+".jpg";
      var file_name=member_srl+"_"+add_code+".jpg";
      console.log(img_src);
      $("#img_board").attr("src", img_src);
      $("#file_name").val(file_name);
    }

    // 성공


    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
navigator.notification.activityStop();
if (add_mode=="photo") {
      photo_show(add_category);
  } else if (add_mode=="freeboard") {

     freeboard_show(add_category);
  } 
  else if (add_mode=="qna") {

     qna_show(add_category);
  } 
  else if (add_mode=="goods") {

     goods_show(add_category);
  } 

 var modal = UIkit.modal("#add_contents_uk_modal");
    modal.hide();       
        

    }

    function fail(error) {
        navigator.notification.activityStop();

    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
