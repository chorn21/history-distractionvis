$(function() {

	var start = processTime(history[0]);
	var end = processTime(history[history.length-1]);
	var month = document.getElementById("month");
	var date = document.getElementById("date");
	var year = document.getElementById("year");

	var startYear = start.getFullYear();
	var endYear = end.getFullYear();
	while(startYear <= endYear) {
		$(year).append('<option value="'+startYear+'">'+startYear+'</option>');
		startYear++;
	}

	var historyPeriod = processTime(history[history.length-1]) - processTime(history[0]);
	var songLength = 407; // length of song in seconds

	var blockCount = 40; // can be adjusted
	var blockAverages = [];
	var blockLength = historyPeriod / blockCount;
	var blockEnd = start + blockLength;

	var intervals = [];
	var index = 0;
	var items = 0;
	var distractionCount = 0;

	var scale = d3.scale.linear().domain([start.getTime(), end.getTime()]).range([0, songLength]);

	function calculateAverages() {
		for(var i=0; i<history.length; i++) {
			if(processTime(history[i]) < blockEnd) {
				items++;
				if(history[i].distraction) {
					distractionCount++;
				}
			}
			else {
				blockAverages[index] = distractionCount/items;
				intervals[index] = processTime(history[i]);
				index++;
				items = 1;
				distractionCount = history[i].distraction ? 1 : 0;
			}
		}
	}

	function processTime(visit) {
		var year = visit.time.substring(0,4);
		var month = visit.time.substring(5,7);
		var date = visit.time.substring(8,10);
		var hour = visit.time.substring(11,13);
		var minute = visit.time.substring(14,16);
		var second = visit.time.substring(17, 19);
		return new Date(year, month-1, date, hour, minute, second);
	}

	function playAudio() {
		var waitTime = scale(intervals[0]);
		$("#concerto").play();
		for(var i=0; i<blockAverages.length; i++) {
			setTimeout(function() {
				var num = Math.floor(blockAverages[i]/10)*10;
				$("#"+num).play();
			}, waitTime);
		}
	}

	$("#buttan").click(function() {
		calculateAverages();
		playAudio();
	});

});
