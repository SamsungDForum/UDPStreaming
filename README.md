Instruction for UDP streamer Sample App
========================================

Introduction : 
-------------
This application is for multicast streaming and Plays IP streamed channels.



Steps :  
---------
1) Start UDP stream in network, you can use any UDP streamer.
2) Default channel IP: udp://238.1.1.1:5004, can be changed in varable "url" of main.js file
3) Install UDPStreamingTizen65 app via USB, URL Launcher or Tizen Studio debug mode
4) Launch web application and Press Play Key to Play IP Channel (udp://238.1.1.1:5004)


Result :  
---------
UDP stream will start on device.


Requirements:
---------------
Make sure the LFD and the stream are in the same local network.
To use `webapis.avplay` API, embed below script into your `index.html`:

```html
<script type='text/javascript' src='$B2BAPIS/b2bapis/b2bavplay.js'></script>
```

Privileges and metadata:
---------------
```xml
<tizen:privilege name="http://tizen.org/privilege/tv.inputdevice"/> 
```

File structure

```
UDPStreamingTizen65/ - UDPStreaming sample app root folder
│
│
├── css/ - styles used in the application
│   │
│   ├── main.css - styles specific for the application
│   └── style.css - style for application's template
│
├── js/ - scripts used in the application
│   │
│   ├── main.js - main application script
│
├── config.xml - application's configuration file
├── index.html - main document
└── README.md - this file
```
Other resources
---------------
*    ** RTP/UDP streamng on SSSP **
    https://www.samsungdforum.com/B2B/cmsguide/GuideView/8951

Copyright and License:
---------------
**Copyright 2019 Samsung Electronics, Inc.**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
