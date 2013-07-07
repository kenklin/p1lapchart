// Node program: node-p1lapchart.js
//	Parses www.mylaps.com/api json into p1lapchart json.

var $ = require('jquery');

function getSource() {
	var source = "http://kenlin.com/x/p1lapchart/lapchart/2695656mylaps.json";	// http://www.mylaps.com/api/eventlapchart?id=2695656
	if (process.argv.length > 2) {
		source = process.argv[2];
	}
	return source;
}

function enhance(data, source) {
	// Add data.meta
	data.p1meta = {
		 createtime: new Date()
		,source: source
	}

	// Add data.laps by parsing data.lapchart.positions
	data.p1laps = new Object();
	for (var position=0; position<data.lapchart.positions.length; position++) {
		for (var lap=0; lap<data.lapchart.laps.length; lap++) {
			if (data.lapchart.positions[position][lap] != undefined) {
				var startNumber = data.lapchart.positions[position][lap].startNumber;
				if (data.lapchart.positions[position][lap] != undefined && startNumber != undefined && startNumber != "") {
					if (data.p1laps[startNumber] == undefined) {
						data.p1laps[startNumber] = [];
					}
					data.p1laps[startNumber][lap] = position+1;
				}
			}
		}
	}

	// Delete properties from original mylaps.com JSON that we don't use
	delete data.lapchart.laps;
	delete data.lapchart.positions;
	data.lapchart.participants.forEach(function(p) {
		delete p.color;
	});

	return data;
};



$.getJSON(getSource(), function(data) {
	console.log(JSON.stringify(enhance(data, getSource())));
})
.fail(function(jqXJR, textStatus, errorThrown) {
	console.log("getJSON failed: " + textStatus); 
});
