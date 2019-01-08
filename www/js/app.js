/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var push;
var duration=5;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
          document.addEventListener("backbutton", onBackKeyDown, false);
       
        app.receivedEvent('deviceready');
        
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
        console.log('Received Event: ' + id);
       
        app.onmain();
    },
    onmain : function() {
         // main_show();
           navigator.splashscreen.show();
        window.setTimeout(function () {
            navigator.splashscreen.hide();
        }, 1000 * duration);
    var reg_id=device.uuid;
       // 기기 번호 검출 

          console.log('Received Event: ' + reg_id);

          push = PushNotification.init({
    android: {
        senderID: "497366590069"
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});
          PushNotification.hasPermission(function(data) {
    if (data.isEnabled) {
        console.log('isEnabled');
    }
});


push.on('registration', function(data) {
    
      json_call(data.registrationId);
  
   
   
});

push.on('notification', function(data) {
  // alert(data.message);
 // display_call_info(data.message);
    modal = UIkit.modal.blockUI(data.message); 
       setTimeout(function(){ modal.hide() }, 1000)
 
  //alert_msg("알람",data.message);
 
 
    
   
});

push.on('error', function(e) {
    // e.message
    alert_msg("경고",e.message);
});

    
       
}
};



 function json_call(reg_id) {
      var reg_id=reg_id;
      var deviceid=device.uuid;
       
         $.post("http://ku4h.com/gcm_reg_app2.php",
   {
    reg_id:reg_id,
    deviceid:deviceid
   },
   function(data){
    var data;
    
   //  alert("ok");
   })
       } 


function alert_msg(title,msg) {
    var title=title;
    var msg=msg;
   navigator.notification.alert(
    msg,  // message
    alertDismissed,         // callback
    title,            // title
    '확인'                  // buttonName
);
}

// 종류
function exit_show() {
navigator.notification.confirm("종료하시겠습니까? ", onConfirm, "Confirmation", "Yes,No"); 
}

function onBackKeyDown(e) { 
    e.preventDefault(); 
} 

function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
}