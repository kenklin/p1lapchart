// Node express program: app.js
//	Parses www.mylaps.com/api json into p1lapchart json.

var port = 9001;

var $ = require('jquery');
var express = require('express');
var app = express();

// http://stackoverflow.com/questions/13656300/jquery-getjson-doesnt-respond-but-direct-access-does
var allowCrossDomain = function (req, res, next) {	// Allow (CORS) cross-domain requests
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}
app.configure(function () {
	app.use(allowCrossDomain);
});

function getSource(id) {
	var source = "http://kenlin.com/x/p1lapchart/lapchart/2695656mylaps.json";	// http://www.mylaps.com/api/eventlapchart?id=2695656
	if (id != null) {
		source = 'http://www.mylaps.com/api/eventlapchart?id=' + id;
	} else {
		if (process.argv.length > 2) {
			source = process.argv[2];
		}
	}
	return source;
}

function enhance(data, source) {
	// Add data.meta
	data.p1meta = {
		 status: 0
		,source: source
//		,createtime: new Date()
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


app.get('/api/eventlapchart/:id', function(req, res) {
	var source = getSource(req.params.id);
	$.getJSON(source, function(data) {
		res.json(enhance(data, source));
	})
	.fail(function(jqXJR, textStatus, errorThrown) {
		console.log('getJSON("' + source + '") failed: ' + textStatus);
		res.json({"p1meta": {"status": 404}});
	});
});

app.listen(port);
console.log('Listening on port ' + port);