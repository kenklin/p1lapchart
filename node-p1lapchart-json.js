// Node program: p1lapchart
//	Parses mylaps lapchart web pages into json.
//
// For Node jQuery on Windows, see https://github.com/tmpvar/jsdom#contextify

var $ = require('jquery');

function getSource() {
	var source = "http://kenlin.com/x/p1lapchart/lapchart/2695656mylaps.json";	// http://www.mylaps.com/api/eventlapchart?id=2695656
	if (process.argv.length > 2) {
		source = process.argv[2];
	}
	return source;
}

function enhance(data) {
	// Add data.meta
	data.p1meta = {
		 createtime: new Date()
		,source: getSource()
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

	// Remove data.lapchart.positions since it is bulky and unused
	data.lapchart.positions = null;

	return data;
};



$.getJSON(getSource(), function(data) {
	console.log(JSON.stringify(enhance(data)));
})
.fail(function(jqXJR, textStatus, errorThrown) {
	console.log("getJSON failed: " + textStatus); 
});
