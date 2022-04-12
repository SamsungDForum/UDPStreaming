/*
 * Copyright and License
 * Copyright 2021 Samsung Electronics, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 * 
 * 
*/

var Player = webapis.avplay;
var url = "udp://238.1.1.1:5004"; 


var listener = {
		onbufferingstart: function () {
            console.log("buffering start");
        },
        onbufferingprogress: function (percent) {
			messageLogger("buffering progress...");
        	console.log("buffering progress..");
        },
        onbufferingcomplete: function () {
        	messageLogger("buffering complete");
        	console.log("buffering complete..");
        },
        oncurrentplaytime: function (currentTime) {
        	console.log("current playtime :: ", currentTime);
        },
        onevent: function (eventType, eventData) {
        	console.log("onevent " + eventType + " data " + eventData);        	
        },
        onstreamcompleted: function () {
        	messageLogger("stream completed..");
			console.log("stream completed..");               
        },
        onerror: function (eventType) {
        	messageLogger("error has occured: ", eventType);
           console.log("error has occured.." + eventType);
        },
        onsubtitlechange: function (duration, text, data3, data4) {
        	messageLogger("subtitle changed..");
            console.log("subtitle changed..");
        },
        ondrmevent: function (drmEvent, drmData) {
        	console.log("on drm event..");
        }
    };

var init = function () {
	messageLogger("Press Play Key to play IP Channel:  ", url);

    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 415: //PLAY
    		startPlayback();
    		break;
    	case 413: //STOP
    		stopPlayback();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    	break;
    	}
    });
    registerKey();
};


var registerKey = function() {
	tizen.tvinputdevice.registerKey("MediaPlay");
	tizen.tvinputdevice.registerKey("MediaPause");
	tizen.tvinputdevice.registerKey("MediaStop");
	tizen.tvinputdevice.registerKey("MediaRewind");
	tizen.tvinputdevice.registerKey("MediaFastForward");
};

//Start playback

var startPlayback = function(){
	if(Player.getState() == "PAUSED"){
		Player.play();
	}else {
		Player.open(url); //Open player with set URL
		Player.setDisplayRect(0, 0, 1920, 1080); //set player size
		Player.setListener(listener); //add listeners 
		Player.setBufferingParam("PLAYER_BUFFER_FOR_PLAY","PLAYER_BUFFER_SIZE_IN_SECOND", 10); 
	    Player.setBufferingParam("PLAYER_BUFFER_FOR_RESUME","PLAYER_BUFFER_SIZE_IN_SECOND", 10);
		Player.setTimeoutForBuffering(10000);    	
		Player.prepareAsync(function() {
	        Player.play(); //start player
	        messageLogger("Playing: "+url);
	    });
	}
};

//Stop Playback

var stopPlayback = function(){
	messageLogger("Stopped");
	Player.stop();
	Player.close();
};

//show logs on the screen

var messageLogger =  function (msg,arg){
	var messagebox = document.getElementById("messagebox");
	if(arg){
		messagebox.innerHTML = msg +" "+ arg;
	}else {
		messagebox.innerHTML = msg;
	}
};

window.onload = init;