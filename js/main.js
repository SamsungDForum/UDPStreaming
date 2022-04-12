/*
Copyright (c) 2021, Samsung Electronics Co., Ltd


* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
 

* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
 

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE. 

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