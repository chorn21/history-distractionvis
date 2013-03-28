
function DistractionVis(hist, songLength, start, end) {
	this.history = hist;
	this.start = start;
	this.end = end;
	this.historyPeriod = processTime(history[history.length-1]).getTime() - processTime(history[0]).getTime();
	this.averages = [];
	this.intervals = [];
	this.scale = d3.scale.linear().domain([this.start.getTime(), this.end.getTime()]).range([0, songLength]);
}

DistractionVis.prototype.playAudio = function(blockCount) {
	var blockBound = this.start.getTime() + (this.historyPeriod / blockCount);
	var blockLength = this.historyPeriod / blockCount;
	var items = 0;
	var distractionCount = 0;
	var index = 0;
	var waitTime = this.scale(blockLength);

	for(var i=0; i<this.history.length; i++) {
		if(processTime(this.history[i]).getTime() < blockBound) {
			items++;
			if(this.history[i].distraction) {
				distractionCount++;
			}
		}
		else {
			this.averages[index] = distractionCount/items*100;
			this.intervals[index] = processTime(this.history[i]).getTime();
			index++;
			items = 1;
			distractionCount = this.history[i].distraction ? 1 : 0;
			blockBound += blockLength;
		}
	}

	document.getElementById("concerto").play();
	for(var i=0; i<this.averages.length; i++) {
		setTimeout(function() {
			var num = Math.floor(this.averages[i]/10)*10;
			document.getElementById(num).play();
		}, waitTime);
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

