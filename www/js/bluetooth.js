/* global bluetoothle */
/* global updateList */
var application = {
    params: {"request": true, "statusReciever": false},
    devices: [],
    content: [],
    error: '',
    success: ''
};

application.content.push({'address': 'EA:FC:5B:28:2C:76', 'uri': 'example.com', 'text': 'Device 1'});
application.content.push({'address': '28:B2:BD:86:BA:B8', 'uri': 'test.example.com', 'text': 'Location 1'});

function initialiseSuccess(response) {
	application.success = "Bluetooth service "+response.status;
	bluetoothle.startScan(scanSuccess, scanError);
}

function initialiseError(response) {
	application.error = "Error Bluetooth service "+response.status;
	console.log(response);
}

function scanSuccess(response) {
	response.time = Math.floor(Date.now() / 1000);
    response = formatSingleDevice(response);
    if(typeof response.address !== 'undefined') {
        for(var i = 0; i < application.devices.length; i++) {
            if(application.devices[i].address == response.address) {
                application.devices[i] = response;
                updateList(formatDevices());
                return;
            }
        }
        application.devices.push(response);
        updateList(formatDevices());
    }
}

function scanError(response) {
	console.log(response);
}

function initialiseBluetooth() {
	bluetoothle.initialize(initialiseSuccess, initialiseError, application.params);
}

function getDevicesWithContent(devices, contents) {
    var validDevices = [];
    devices.forEach(function(device) {
        contents.forEach(function(content) {
            if(device.address === content.uid) {
                validDevices.push(device);
            }
        });
    });
    return validDevices;
}

function getClosest(devices) {
    var closest;
    if(devices.length > 0) {
    	for (var device in devices) {
    		if(device !== 'undefined') {
    			if(devices.hasOwnProperty(device)) {
    				if(typeof closest !== 'undefined') {
    					if(devices[device].rssi > closest.rssi) {
    						closest = devices[device];
    					}
    				} else {
    					closest = devices[device];
    				}
    			}
    		}
    	}    
    }
	return closest;
}

function formatSingleDevice(device) {
    if(typeof device.name === 'undefined') { device.name = 'Generic'; }
    return device;
}

function formatDevices() {
    var results = [];
    application.devices.forEach(
        function(item) {
            var result = {};
            // get existing item properties
            document.querySelector('post-list').posts.forEach(function(existing){
                if(existing.uid == item.address) { result = existing; }
            });

            // update the result with the new data
            result.uid = item.address;
            result.username = item.name;
            result.text = item.advertisement;
            result.signal = item.rssi;
            result.avatar = "img/types/bluetooth.png";

            // change this from MI to uri-beacon when you have a physical-web beacon
            if(item.name === 'MI') { result.avatar = "img/types/uri-beacon.png"; }
            document.querySelector('dynamic-content').contentLibrary.forEach(function(libraryItem){
                if(libraryItem.uid === result.uid) {
                    if(typeof libraryItem.content.title !== 'undefined') { result.username = libraryItem.content.title; }
                    if(typeof libraryItem.content.thumbnail !== 'undefined') { result.avatar = libraryItem.content.thumbnail; }
                }
            });

            results.push(result);
        }
    );
    removeOldReadings();
    displayContent(getClosest(getDevicesWithContent(application.devices, document.querySelector('dynamic-content').contentLibrary)));
    return orderBy(results, 'signal');
}

function orderBy(array, property) {
    function compare(a,b) {
      if (a[property] < b[property])
          return 1;
      if (a[property] > b[property])
          return -1;
      return 0;
    }
    array.sort(compare);
    return array;
}

function contentJSONToHTML(content) {
    var output = "";
    if(typeof content.title !== 'undefined') { output+="<h2 style='margin-top: -30px; margin-bottom: 5px;'>"+content.title+"</h2>"; }
    if(typeof content.heading !== 'undefined') { output+="<h3 style='margin-top: 5px; margin-bottom: 5px;'>"+content.heading+"</h3>"; }
    if(typeof content.description !== 'undefined') { output+="<p>"+content.description+"</p>"; }
    if(typeof content.image !== 'undefined') { output+='<img src="'+content.image+'" style="width: 60%;">'; }
    return output;
}

function displayContent(device) {
    if(typeof device !== 'undefined') {
        var defaultContent, match=false;
        document.querySelector('dynamic-content').contentLibrary.forEach(function(content){
            if(content.uid === 'default') {
                defaultContent = content.content;
            }
            if(content.uid == device.address) {
                //document.querySelector('dynamic-content').currentContent = content.content;
                document.querySelector('dynamic-content').newHtmlContent = contentJSONToHTML(content.content);
                match = true;
            }
        });
        if(!match) {
            //document.querySelector('dynamic-content').currentContent = defaultContent;
            document.querySelector('dynamic-content').newHtmlContent = contentJSONToHTML(defaultContent);
        }
        document.querySelector('dynamic-content').contentChanged();
    }
}

function removeOldReadings(timeout) {
    // timout in seconds
    if(typeof timeout === 'undefined') { timeout = 3; }
    var time = Math.floor(Date.now() / 1000) - timeout;
    var newDevices = [];
    application.devices.forEach(function (device) {
        if(device.time > time) { newDevices.push(device); }
    });
    application.devices = newDevices;
}
