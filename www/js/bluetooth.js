var application = {
    params: {"request": true, "statusReciever": false},
    devices: [],
    content: [],
    error: '',
    success: ''
};
//application.params = {"request": true, "statusReciever": false};
//application.devices = [];
//application.content = [];


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
        console.log('new device');
    }
}

function scanError(response) {
	console.log(response);
}

function initialiseBluetooth() {
	bluetoothle.initialize(initialiseSuccess, initialiseError, application.params);
}

function getClosest(devices) {
	var closest;
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
            var result = {
                uid: item.address,
                username: item.name,
                text: item.advertisement,
                signal: item.rssi,
                avatar: "img/types/bluetooth.png"
            };
            // change this from MI to uri-beacon when you have a physical-web beacon
            if(item.name === 'MI') { result.avatar = "img/types/uri-beacon.png"; }
            results.push(result);
        }
    );
    return results;
}