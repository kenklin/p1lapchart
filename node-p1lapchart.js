// Node program: p1lapchart
//	Parses mylaps lapchart web pages into json.
//
// For Node jQuery on Windows, see https://github.com/tmpvar/jsdom#contextify

var $ = require('jquery');

function getSource() {
	var source = "http://kenlin.com/x/p1lapchart/lapchart/2695656.html";	// http://www.mylaps.com/en/lapchart/2695656
	if (process.argv.length > 2) {
		source = process.argv[2];
	}
	return source;
}

function parse(dom) {
	var data = {
		 p1meta: undefined
		,session: undefined
		,event: undefined
		,lapchart: {
			participants: []
		}
		,p1laps: {}	// .carnum[lap] = pos
	};

	// Create data.p1meta
	data.p1meta = {
		 createtime: new Date()
		,source: getSource()
	}
	
	// Create data.session
	var meta_select = $("div.breadcrumb", dom);
	var event_select = $("table.events-summary>tbody", dom);
	data.session = {
		 dateTime: $(">tr:eq(0)>td:eq(1)", event_select).text()
		,group: undefined
	}
	
	// Parse data.event.location
	data.event = {
		 name: $(">a:eq(1)", meta_select).text()
		,location: {
			 name: $(">tr:eq(0)>td:eq(3)", event_select).text()
			,lengthLabel: $(">tr:eq(1)>td:eq(3)", event_select).text()
		}
	}
					
	// Parse data.lapchart.participants
	var participants_selector = "table.js_lapchart-participants>tbody tr";
	$(participants_selector, dom).each(function(i) {
		if (i > 0) {
			var startNumber = $(":eq(1) span.participant-number", this).text();
			data.lapchart.participants.push({
				 position: $(":eq(0)", this).text()
				,startNumber: startNumber
				,name: $(":eq(1)", this).text().substring(startNumber.length)
			});
		}
	});

	// Parse data.p1laps
	var results_selector = "table.js_lapchart-results tr";
	$(results_selector, dom).each(function(position) {
		if (position > 0) {
			$(">td", this).each(function(lap) {
				var startNumber = $(this).attr("data-startnumber");
				if (startNumber != undefined && startNumber != "") {
					if (data.p1laps[startNumber] == undefined) {
						data.p1laps[startNumber] = [];
					}
					data.p1laps[startNumber][lap] = +position;
				}
			});
		}
	});

	return data;
};



$.get(getSource(), function(data) {
	console.log(JSON.stringify(parse(data)));
})
.fail(function(jqXJR, textStatus, errorThrown) {
	console.log("getSource(): " + textStatus); 
});
