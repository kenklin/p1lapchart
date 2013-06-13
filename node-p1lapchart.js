// Node program: p1lapchart
//	Parses mylaps lapchart web pages into json.
//
// For Node jQuery on Windows, see https://github.com/tmpvar/jsdom#contextify

var $ = require('jquery');

var source = "http://kenlin.com/x/p1lapchart/lapchart/2695656.html";
if (process.argv.length > 2) {
	source = process.argv[2];
}

function parse(dom) {
	var lapchart = {
		summary: undefined,
		participants: [],
//		results: [],
		laps: {}
	};

	// Parse lapchart.summary
	var summary_select = $("table.events-summary>tbody", dom);
	lapchart.summary = {
		date: $(">tr:eq(0)>td:eq(1)", summary_select).text(),
		location: $(">tr:eq(0)>td:eq(3)", summary_select).text(),
		length: $(">tr:eq(1)>td:eq(3)", summary_select).text(),
	}
					
	// Parse lapchart.participants
	var participants_selector = "table.js_lapchart-participants>tbody tr";
	$(participants_selector, dom).each(function(i) {
		if (i > 0) {
			var car = $(":eq(1) span.participant-number", this).text();
			lapchart.participants.push({
				start: $(":eq(0)", this).text(),
				car: car,
				name: $(":eq(1)", this).text().substring(car.length)
			});
		}
	});

	// Parse lapchart.laps
	var results_selector = "table.js_lapchart-results tr";
	$(results_selector, dom).each(function(position) {
		if (position > 0) {
			var numbers = [];
			$(">td", this).each(function(lap) {
				var car = $(this).attr("data-startnumber");
				if (car != undefined) {
					numbers.push(car);
					if (lapchart.laps[car] == undefined) {
						lapchart.laps[car] = [];
//						lapchart.laps[car] = {
//							car: car,
//							position: []
//						};
					}
					lapchart.laps[car][lap] = +position;
//					lapchart.laps[car].position[lap] = +[position];
				}
			});
//			lapchart.results.push(numbers);
		}
	});

	return lapchart;
};



$.get(source, function(data) {
	console.log(JSON.stringify(parse(data)));
})
.fail(function(jqXJR, textStatus, errorThrown) {
	console.log(textStatus); 
});