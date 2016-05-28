document.addEventListener('DOMContentLoaded', function() {
	//Create Div to add blocks to
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
			if (i%8 === 0) output += "\n<div class='row'>";
			output += "\n\t<div class='" + mapping[world[i]] + "'></div>";
			if (i%8 === 7) output += "\n</div>";
		}
		document.getElementById('world').innerHTML = output;
	}

	document.onclick = function(e) {
		var x = Math.floor(e.x/26);
		var y = Math.floor(e.y/26);
		if (x >= 8 || y >= 8) return;
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
	//function returns the position of all blocks around the clicked block with the same color
	function checkMatches(position, colornum) {
		var arr = [];
		if (world[position + 1] === colornum && position%8 !== 7) arr.push(position + 1);
		if (world[position - 1] === colornum && position%8 !== 0) arr.push(position - 1);
		if (world[position + 8] === colornum && Math.floor(position/8) < 7) arr.push(position + 8);
		if (world[position - 8] === colornum && Math.floor(position/8) > 0) arr.push(position - 8);
		return arr;
	}
});