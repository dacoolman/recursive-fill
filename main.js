document.addEventListener('DOMContentLoaded', function() {
	var worldDiv = document.createElement('div');
	worldDiv.id = 'world';
	document.getElementsByTagName('body')[0].appendChild(worldDiv);

	var mapping = {
		0: "white",
		1: "blue",
		2: "red",
		3: "yellow",
		4: "purple",
		5: "black"
	};
	var world = [
		4, 4, 4, 0, 0, 0, 3, 4, 
		4, 4, 1, 1, 1, 0, 3, 3, 
		4, 4, 2, 0, 4, 0, 0, 3, 
		0, 1, 2, 4, 4, 2, 2, 3, 
		3, 1, 2, 2, 0, 2, 2, 3, 
		3, 1, 2, 2, 1, 1, 1, 3, 
		3, 1, 2, 2, 1, 1, 1, 3, 
		3, 1, 0, 0, 3, 3, 3, 3, 
	];
	displayWorld();

	function displayWorld(){
		var output = '';
		for (var i=0 ; i<world.length ; i++) {
			var column = i%8;
			if (column === 0) output += "\n<div class='row'>";
			output += "\n\t<div class='" + mapping[world[i]] + "'></div>";
			if (column === 7) output += "\n</div>";
		}
		document.getElementById('world').innerHTML = output;
	}

	document.onclick = function(e) {
		var x = e.x !==undefined ? Math.floor(e.x/26) : Math.floor(e.clientX/26);
		var y = e.y !== undefined ? Math.floor(e.y/26) : Math.floor(e.clientY/26);
		if (x > 7 || y > 7) return;
		var position = y*8 + x;
		var colornum = world[position];
		rfill(position, colornum);
		displayWorld();
	};

	function rfill(position, colornum) {
		if (world[position] === 5) return;
		else world[position] = 5;
		var matches = checkMatches(position, colornum);
		for (var i = 0 ; i< matches.length ; i++) {
			rfill(matches[i], colornum);
		}
		return;
	}
	//returns the position of all blocks around the clicked block with the same color
	function checkMatches(position, colornum) {
		var arr = [];
		var row = Math.floor(position/8);
		var column = position%8;
		if (world[position + 1] === colornum && column !== 7) arr.push(position + 1);
		if (world[position - 1] === colornum && column !== 0) arr.push(position - 1);
		if (world[position + 8] === colornum && row < 7) arr.push(position + 8);
		if (world[position - 8] === colornum && row > 0) arr.push(position - 8);
		return arr;
	}
});