	var player = "";
	var defender = "";

$(document).ready(function(){

	//load initial screen
	action.reset();

  //choose fighter
  $('#char_row').on('click', '.char-box', function() {
  	player = this.id;
  	shift.toEnemy(this);

		$('#enemy_row').on('click', '.char-box', function() {
	  	// defender = this.id;
	  	shift.toDefender(this);
		});

	});

	$('#fight_btn').on('click', function() {
		if (player != "" && defender != "" && $("#"+player).attr('hp') > 0) {
			var playEl = "#" + player;
			var defEl = "#" + defender;

			//first decrement defender HP and see if still alive
			if (action.decDefHP(playEl, defEl) > 0) {
				if (action.decPlayHP(playEl, defEl) <= 0) {
					//game over
					action.displayInfo(playEl, defEl, "lost");	
				} 
				else {
					action.displayInfo(playEl, defEl, "attacking");	
				}
			}
			else {
				//eliminate defender
				$('#defender_row').html("");
				action.displayInfo(playEl, defEl, "oneDown");
			}

			//check if won
			if ($("#defender_row > .char-box").length < 1 && $("#enemy_row > .char-box").length < 1) {
				action.displayInfo(playEl, defEl, "won");
			}

			action.incPlayAP(playEl, defEl);
			action.displayHP(playEl, defEl);
		}
	});

});

var shift = {
	toEnemy: function(fighter) {
		$('#char_row').children('div').each(function() { 
			if (this != fighter) {
				$('#enemy_row').append(this);
			}
			else {
				if ($("#char_row > .char-box").length > 1) {
					player = this.id;
				}
			}
		});
	},

	toDefender: function(fighter) {
		if ($("#defender_row > .char-box").length < 1) {
			$('#enemy_row').children('div').each(function() { 
				if (this === fighter) {
					$('#defender_row').append(this);
					defender = this.id;
					action.displayInfo(player, defender, "clear");
				}
			});
		}
	},

	hide: function(fighter) {
		$('#defender_row').children('div').each(function() { 
			if (this === fighter) {
				$('#info').append(this);

			}
		});	
	}
}

var action = {
	decDefHP: function(playEl, defEl) {
		var playAP = $(playEl).attr("ap");
		var defHP = $(defEl).attr("hp");

		var intDefHP = parseInt(defHP) - parseInt(playAP);
		$(defEl).attr("hp", intDefHP);

		return intDefHP;
	},
	decPlayHP: function(playEl, defEl) {
		var playHP = $(playEl).attr("hp");
		var defCP = $(defEl).attr("cp");

		var intPlayHP = Math.max((parseInt(playHP) - parseInt(defCP)), 0);
		$(playEl).attr("hp", intPlayHP);

		return intPlayHP;
	},
	incPlayAP: function(playEl, defEl) {
		var playAP = $(playEl).attr("ap");
		var playInc = $(playEl).attr("inc");

		var intPlayAP = parseInt(playAP) + parseInt(playInc);
		$(playEl).attr("ap", intPlayAP);
	},
	displayHP: function(playEl, defEl) {
		var playHP = $(playEl).attr("hp");
		var defHP = $(defEl).attr("hp");

		$(playEl+"_hp").text(playHP);
		$(defEl+"_hp").text(defHP);

	},
	displayInfo: function(playEl, defEl, status) {
		var info;
		var reset="";
		if (status === "attacking") {
			var playAP = $(playEl).attr("ap");
			var defCP = $(defEl).attr("cp");

			info = "<p>You attacked " + defender + " for " + playAP + " damage.</p>";
			info += "<p>" + defender + " countered for " + defCP + " damage.</p>";
		}
		else if (status === "lost") {
			info = "You have been defeated...<br>";
			reset = $('<button>Reset</button>').on('click', function() {
				action.reset();
			});
		}
		else if (status === "won") {
			info = "Congratulations, you won!<br>";
			reset = $('<button>Reset</button>').on('click', function() {
				action.reset();
			});
		}
		else if (status === "clear") {
			info = "";
		}
		else {
			info = "<p>You have defeated " + defender + "!</p>";
			info += "<p>Choose another enemy.</p>";
		}

		$('#info').html(info);
		$('#info').append(reset);
	},
	reset: function() {
		//restore global vars
		player = "";
		defender = "";

		//clear all char rows
		$('.gen-row').html("");

		//regenerate characters
		$('#char_row').append(make.elem("ryu"));
		$('#char_row').append(make.elem("ken"));
		$('#char_row').append(make.elem("blanka"));
		$('#char_row').append(make.elem("vega"));

		//clear info 
		$('#info').html("");
	}
}

var make = {
	ryu: {
		hp: "180",
		ap: "7",
		cp: "20",
	},
	ken: {
		hp: "180",
		ap: "7",
		cp: "20",
	},
	blanka: {
		hp: "240",
		ap: "5",
		cp: "15",
	},
	vega: {
		hp: "150",
		ap: "10",
		cp: "25",
	},
	elem: function(fighter) {
		var fighterObj;

		if (fighter === "ryu") {fighterObj = this.ryu;}
		else if (fighter === "ken") {fighterObj = this.ken;}
		else if (fighter === "blanka") {fighterObj = this.blanka;}
		else {fighterObj = this.vega;}

		var hpTag = $('<p>').attr('id', fighter+'_hp');
		hpTag.text(fighterObj.hp);
		var nameTag = $('<p>').attr('id', 'char_col');

		var name = fighter[0].toUpperCase();
		for (var i = 1; i < fighter.length; i++) {
			name += " " + fighter[i].toUpperCase();
		}
		nameTag.text(name);

		var imgTag = $('<img>').addClass('char-img').attr('src', 'assets/images/'+fighter+'.jpg');
		var rowTag = $('<div>').addClass('char-row').attr('id', 'char_row');
		var divTag = $('<div>').addClass('char-box').attr('id',fighter);
		divTag.attr('hp', fighterObj.hp);
		divTag.attr('ap', fighterObj.ap);
		divTag.attr('inc', fighterObj.ap);
		divTag.attr('cp', fighterObj.cp);

		rowTag.append(imgTag);
		rowTag.append(nameTag);
		divTag.append(rowTag);
		divTag.append(hpTag);	

		return divTag;		
	}
}