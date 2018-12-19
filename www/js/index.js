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
 var telephone_number; // 전화번호 전역 함수 
 var version="1.0.0";
 var version_check="n";
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
     //  window.plugins.sim.getSimInfo(successCallback, errorCallback);
       document.addEventListener("backbutton", exit_show, false);
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    
            app.onmain();
    },

    onmain : function() {

         var reg_id=device.uuid;
       // 기기 번호 검출 
          console.log('Received Event: ' + reg_id);

          push = PushNotification.init({
    android: {
        senderID: "443120016956"
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
    console.log(data.registrationId);
   // alert(data.registrationId);
   app_version_check(version);
   //save_reg_id(data.registrationId);
    json_call(data.registrationId);
  
});

push.on('notification', function(data) {
//  alert(data.message);
 // display_call_info(data.message);
  alert_msg("알람",data.message);
 
 
    
   
});

push.on('error', function(e) {
    // e.message
    alert_msg("경고",e.message);
});


  

        
    }

};
  
function save_reg_id(reg_id) {
    var reg_id=reg_id;
    var cordova=device.cordova;
    var model=device.model;
    var platform=device.platform;
    var uuid=device.uuid;
    var version=device.version;
    var manufacturer=device.manufacturer;
    var isVirtual=device.isVirtual;
    var serial=device.serial;
    var uuid_json='[{"cordova" : "'+cordova+'","model" : "'+model+'","platform" : "'+platform+'","uuid" : "'+uuid+'","version" : "1.0","manufacturer" : "'+manufacturer+'","isVirtual" : "'+isVirtual+'","serial" : "'+serial+'","registration_id":"'+reg_id+'"}]';
    var data_json='{ "app_data":'+uuid_json+'}';
  


    //console.log(data_json);
    $.ajax({
    url: "https://api-dev.cloudbric.com/v2/mobile/device",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("X-Cloudbric-Key", "zzg0cockog4g0sk4kgcc44ow0go40sw88wkkg8ks"); 
    },
    type: 'POST',
     dataType : "jsonp",
  crossDomain: true,

  
    processData: false,
   contentType:'application/json; charset=utf-8',
   
     

    success: function (data) {

      var data = JSON.stringify(data);
         console.log(data);
      var member_data = JSON.parse(data);
       console.log("data : "+member_data);

    },
    error: function(data){
       var data = JSON.stringify(data);
         console.log(data);
      alert("error");
    }
});
   }
function app_version_check(version) {
     $.post("http://topnailart.co.kr/version.json",
   {
    
   },
   function(data){
    var data=data;
     var data = JSON.stringify(data);
     var version_data = JSON.parse(data);
     var check_version=version_data.version;
     if (check_version!=version) {
      var ref = cordova.InAppBrowser.open('market://details?id=com.nhn.android.search', '_system', 'location=no');

       

      alert("버전이 다릅니다. 업데이트 후 이용해주세요.");
      return;
      
     } else {
       var ref = cordova.InAppBrowser.open('https://console-mobile.cloudbric.com', '_blank', 'location=no');
   ref .addEventListener('exit', exit_show);
     }
    
   //  alert("ok");
   })

}
function json_call(reg_id) {
      var reg_id=reg_id;
      var deviceid=device.uuid;
       
         $.post("http://ku4h.com/gcm_reg_app3.php",
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
navigator.notification.confirm("종료하시겠습니까? ", onConfirm, "확인", "예,아니요"); 
}

function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
      var ref = cordova.InAppBrowser.open('https://console-mobile.cloudbric.com', '_blank', 'location=no');
   ref .addEventListener('exit', exit_show);
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
}