	var player = "";
	var defender = "";

$(document).ready(function(){

  //choose fighter
  $('#char_row').on('click', '.char-box', function() {
  	player = this.id;
  	shift.toEnemy(this);

		$('#enemy_row').on('click', '.char-box', function() {
	  	defender = this.id;
	  	shift.toDefender(this);
		});

	});

	$('#fight_btn').on('click', function() {
		if (player != "" && defender != "" && $("#"+player).attr('hp') > 0) {
			var playEl = "#" + player;
			var defEl = "#" + defender;

			//first decrement defender HP and see if still alive
			if (action.decDefHP(playEl, defEl) > 0) {
				if (action.decPlayHP(playEl, defEl) < 0) {
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

			// console.log("Def: " + $(defEl).attr("hp") + " " + $(defEl).attr("ap") + " " + $(defEl).attr("cp"));
			// console.log("Play: " + $(playEl).attr("hp") + " " + $(playEl).attr("ap") + " " + $(playEl).attr("cp"));
		}
	});

});

var shift = {
	toEnemy: function(fighter) {
		$('#char_row').children('div').each(function() { 
			if (this != fighter) {
				$('#enemy_row').append(this);
			}
		});
	},

	toDefender: function(fighter) {
		if ($("#defender_row > .char-box").length < 1) {
			$('#enemy_row').children('div').each(function() { 
				if (this === fighter) {
					$('#defender_row').append(this);
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

		var intPlayHP = parseInt(playHP) - parseInt(defCP);
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
			reset = $('<button>Reset</button>').on('click', this.reset());
		}
		else if (status === "won") {
			info = "Congratulations, you won!";
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
		$('#char_row').append(make.ryu.elem());
		$('#char_row').append(make.ken.elem());
		$('#char_row').append(make.blanka.elem());
		$('#char_row').append(make.vega.elem());

		//clear info 
		$('#info').html("");
	}
}

var make = {
	ryu: {
		hp: "180",
		ap: "7",
		inc: "7",
		cp: "20",
		elem: function() {
			var hpTag = $('<p>').attr('id','ryu_hp');
			hpTag.text(this.hp);
			var nameTag = $('<p>').attr('id', 'char_col');
			nameTag.text("R Y U");
			var imgTag = $('<img>').addClass('char-img').attr('src', 'assets/images/ryu.jpg');
			var rowTag = $('<div>').addClass('char-row').attr('id', 'char_row');
			var divTag = $('<div>').addClass('char-box').attr('id','ryu');
			divTag.attr('hp', this.hp);
			divTag.attr('ap', this.ap);
			divTag.attr('inc', this.inc);
			divTag.attr('cp', this.cp);

			rowTag.append(imgTag);
			rowTag.append(nameTag);
			divTag.append(rowTag);
			divTag.append(hpTag);

			return divTag;
		}
	},
	ken: {
		hp: "160",
		ap: "7",
		inc: "7",
		cp: "20",
		elem: function() {
			var hpTag = $('<p>').attr('id','ken_hp');
			hpTag.text(this.hp);
			var nameTag = $('<p>').attr('id', 'char_col');
			nameTag.text("K E N");
			var imgTag = $('<img>').addClass('char-img').attr('src', 'assets/images/ken.jpg');
			var rowTag = $('<div>').addClass('char-row').attr('id', 'char_row');
			var divTag = $('<div>').addClass('char-box').attr('id','ken');
			divTag.attr('hp', this.hp);
			divTag.attr('ap', this.ap);
			divTag.attr('inc', this.inc);
			divTag.attr('cp', this.cp);

			rowTag.append(imgTag);
			rowTag.append(nameTag);
			divTag.append(rowTag);
			divTag.append(hpTag);

			return divTag;
		}
	},
	blanka: {
		hp: "220",
		ap: "5",
		inc: "5",
		cp: "15",
		elem: function() {
			var hpTag = $('<p>').attr('id','blanka_hp');
			hpTag.text(this.hp);
			var nameTag = $('<p>').attr('id', 'char_col');
			nameTag.text("B L A N K A");
			var imgTag = $('<img>').addClass('char-img').attr('src', 'assets/images/blanka.jpg');
			var rowTag = $('<div>').addClass('char-row').attr('id', 'char_row');
			var divTag = $('<div>').addClass('char-box').attr('id','blanka');
			divTag.attr('hp', this.hp);
			divTag.attr('ap', this.ap);
			divTag.attr('inc', this.inc);
			divTag.attr('cp', this.cp);

			rowTag.append(imgTag);
			rowTag.append(nameTag);
			divTag.append(rowTag);
			divTag.append(hpTag);

			return divTag;
		}
	},
	vega: {
		hp: "150",
		ap: "10",
		inc: "10",
		cp: "25",
		elem: function() {
			var hpTag = $('<p>').attr('id','vega_hp');
			hpTag.text(this.hp);
			var nameTag = $('<p>').attr('id', 'char_col');
			nameTag.text("V E G A");
			var imgTag = $('<img>').addClass('char-img').attr('src', 'assets/images/vega.jpg');
			var rowTag = $('<div>').addClass('char-row').attr('id', 'char_row');
			var divTag = $('<div>').addClass('char-box').attr('id','vega');
			divTag.attr('hp', this.hp);
			divTag.attr('ap', this.ap);
			divTag.attr('inc', this.inc);
			divTag.attr('cp', this.cp);

			rowTag.append(imgTag);
			rowTag.append(nameTag);
			divTag.append(rowTag);
			divTag.append(hpTag);

			return divTag;
		}
	}
}