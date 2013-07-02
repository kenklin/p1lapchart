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
	var lapchart = {
		 meta: undefined
		,session: undefined
		,summary: undefined
		,participants: []
//		,results: []
		,laps: {}	// [carnum][lap] = pos
	};

	// Create meta
	var meta_select = $("div.breadcrumb", dom);
	lapchart.meta = {
		 createtime: new Date()
		,source: getSource()
	}
	
	// Create session
	var session_select = $("div.breadcrumb", dom);
	lapchart.session = {
		 name: $(">a:eq(1)", meta_select).text()
		,dateTime: undefined
		,group: undefined
	}
	
	// Parse lapchart.summary
	var summary_select = $("table.events-summary>tbody", dom);
	lapchart.summary = {
		 date: $(">tr:eq(0)>td:eq(1)", summary_select).text()
		,location: $(">tr:eq(0)>td:eq(3)", summary_select).text()
		,length: $(">tr:eq(1)>td:eq(3)", summary_select).text()
	}
					
	// Parse lapchart.participants
	var participants_selector = "table.js_lapchart-participants>tbody tr";
	$(participants_selector, dom).each(function(i) {
		if (i > 0) {
			var startNumber = $(":eq(1) span.participant-number", this).text();
			lapchart.participants.push({
				start: $(":eq(0)", this).text()
				,startNumber: startNumber
				,name: $(":eq(1)", this).text().substring(startNumber.length)
			});
		}
	});

	// Parse lapchart.laps
	var results_selector = "table.js_lapchart-results tr";
	$(results_selector, dom).each(function(position) {
		if (position > 0) {
			var numbers = [];
			$(">td", this).each(function(lap) {
				var startNumber = $(this).attr("data-startnumber");
				if (startNumber != undefined && startNumber != "") {
					numbers.push(startNumber);
					if (lapchart.laps[startNumber] == undefined) {
						lapchart.laps[startNumber] = [];
//						lapchart.laps[startNumber] = {
//							startNumber: startNumber,
//							position: []
//						};
					}
					lapchart.laps[startNumber][lap] = +position;
//					lapchart.laps[startNumber].position[lap] = +[position];
				}
			});
//			lapchart.results.push(numbers);
		}
	});

	return lapchart;
};



$.get(getSource(), function(data) {
	console.log(JSON.stringify(parse(data)));
})
//$.ajax({
//  url: getSource(),
//  type: "POST",
//  dataType: "html"
//}).success(function(data) {
//  console.log(data);
//})
.fail(function(jqXJR, textStatus, errorThrown) {
	console.log("getSource(): " + textStatus); 
});
