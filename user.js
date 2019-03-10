//   Hri7566 and Karl Marx's Chat Box
//   http://codeshare.io/aV433O
//   1.07
//   Chat bot for MPP
//   Copyright Hri7566 and Karl Marx of 2019
//   To be used on http://www.multiplayerpiano.com/*
//   Requires http://www.multiplayerpiano.com/Client.js


const MPPClient = require("./client.js");

client = new MPPClient('ws://multiplayerpiano.com', undefined);

client.start();

client.on("hi", () => {
	console.log("Online");
	client.setChannel("Karl's Room");
	setTimeout(() => {
		client.sendArray([{ m: 'userset', set:{name:"Hri7566's Bot"}}]);
		client.sendArray([{ m:'a', message:"Hola!" }]);
	}, 100)
});

var toggle = true

client.on("a", function(msg) {
  let args = msg.a.split(" ");
  let cmd = args[0].toLowerCase();
  let argcat = msg.a.substring(cmd.length).trim();


  if (cmd == "^toggle") {
     if (msg.p._id == client.getOwnParticipant()._id) {
        if ( toggle == true) {
          toggle = false
          chat.send("The chat bot is now off.");
        } else if (toggle == false) {
          toggle = true
          chat.send("The chat bot is now on.");
        }
    } else {
      chat.send("You don't have permission to use this command.")
    }
  }
  if(toggle == true) {

    if (cmd == "^help") {
      chat.send("Commands: ^help, ^insult, ^motivate, ^whoiskarl, ^joke, ^cut, ^8ball");
    } else if (cmd == "^insult") {
      chat.send(msg.p.name + ", your insult is: " + insult[Math.floor(Math.random()*insult.length)] );
    } else if (cmd == "^motivate") {
      chat.send(msg.p.name + ", your motivation is: " + motivate[Math.floor(Math.random()*motivate.length)] );
    }  else if (cmd == "^joke") {
      chat.send(msg.p.name + ", your joke is: " + joke[Math.floor(Math.random()*joke.length)] );
    } else if (cmd == "^whoiskarl") {
      chat.send("Karl Marx was a German philosopher, economist, historian, sociologist, political theorist, journalist and socialist revolutionary. Born in Trier, Germany, Marx studied law and philosophy at university. He married Jenny von Westphalen in 1843.");
    } else if (cmd == "^cut") {
    	if (argcat.length == 0) {
    	    chat.send("You need to specify an object.");
  		} else {
    	    chat.send(msg.p.name + " cut " + argcat + ".");
    	}
    } else if (cmd == "^secret") {
      	chat.send("(^'-')^ (^'-')> (>'-')> <('-'^) ^('-'^) (^'-')^ (^'-')> (>'-')> <('-'^) ^('-'^)");
    } else if (cmd == "^8ball") {
      if (argcat.length == 0) {
        chat.send("You need to ask a question");
      } else{
      	chat.send(msg.p.name + ", " + BallArray[Math.floor(Math.random()*BallArray.length)]);
      }
    } else if (cmd == "^spam") {
        spam(argcat)
    }
      } else if (cmd == '/mario') {
                if (isNoble == true || isKing == true) {
                    if (client.isOwner()) {
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________________▄▄▄▀▀▀▀▀▀▀▄" }]); }, 360);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______________▄▀▀____▀▀���▀▄____█" }]); }, 900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________▄▀▀__▀▀▀▀▀▀▄___▀▄___█" }]); }, 1200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________█▄▄▄▄▄▄_______▀▄__▀▄__█" }]); }, 1500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________█_________▀▄______█____█_█" }]); }, 1800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______▄█_____________▀▄_____▐___▐_▌" }]); }, 2100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______██_______________▀▄___▐_▄▀▀▀▄" }]); }, 2400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______█________██_______▌__▐▄▀______█" }]); }, 2700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______█_________█_______▌__▐▐________▐" }]); }, 3000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____▐__________▌_____▄▀▀▀__▌_______▐_____________▄▄▄▄▄▄" }]); }, 3300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______▌__________▀▀▀▀________▀▀▄▄▄▀______▄▄████▓▓▓▓▓▓▓███▄" }]); }, 3600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______▌____________________________▄▀__▄▄█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄" }]); }, 3900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______▐__________________________▄▀_▄█▓▓▓▓▓▓▓▓▓▓_____▓▓____▓▓█▄" }]); }, 4200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______▌______________________▄▀_▄█▓▓▓▓▓▓▓▓▓▓▓____▓▓_▓▓_▓▓__▓▓█" }]); }, 4500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____▄▀▄_________________▄▀▀▌██▓▓▓▓▓▓▓▓▓▓▓▓▓__▓▓▓___▓▓_▓▓__▓▓█" }]); }, 4800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ____▌____▀▀▀▄▄▄▄▄▄▄▄▀▀___▌█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓__▓________▓▓___▓▓▓█" }]); }, 5100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____▀▄_________________▄▀▀▓▓▓▓▓▓▓▓█████████████▄▄_____▓▓__▓▓▓█" }]); }, 5400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▄▄___▓▓▓▓▓█" }]); }, 5700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓███▓▓▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓█" }]); }, 6000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________█▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓█▓▓██░░███████░██▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓█" }]); }, 6300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________█▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓░░░░░█░░░░░██░░░░██▓▓▓▓▓▓▓▓▓██▓▓▓▓▌" }]); }, 6600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________█▓▓▓▓▓▓▓▓▓▓▓▓▓▓███░░░░░░░░____░██░░░░░░░██▓▓▓▓▓▓▓██▓▓▌" }]); }, 6900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________▐▓▓▓▓▓▓▓▓▓▓▓▓▓▓██░░░░░░░________░░░░░░░░░██████▓▓▓▓▓█▓▌" }]); }, 7200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________▐▓▓▓▓▓▓▓▓▓▓▓▓▓▓██░░░░░░___▓▓▓▓▓░░░░░░░███░░███▓▓▓▓▓█▓▌" }]); }, 7500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________█▓▓▓▓▓▓▓▓▓▓▓▓▓██░░░░░___▓▓█▄▄▓░░░░░░░░___░░░░█▓▓▓▓▓█▓▌" }]); }, 7800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________█▓▓▓▓▓▓▓▓▓▓▓▓▓█░░█░░░___▓▓██░░░░░░░░▓▓▓▓__░░░░█▓▓▓▓██" }]); }, 8100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________█▓▓▓▓▓▓▓▓▓▓▓▓▓█░███░░____▓░░░░░░░░░░░█▄█▓__░░░░█▓▓█▓█" }]); }, 8400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________▐▓▓▓▓▓▓▓▓▓▓▓▓▓█░█████░░░░░░░░░░░░░░░░░█▓__░░░░███▓█" }]); }, 8700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________█▓▓▓▓▓▓▓▓▓▓▓▓█░░███████░░░░░░░░░░░░░░░▓_░░░░░██▓█" }]); }, 9000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________█▓▓▓▓▓▓▓▓▓▓▓▓█░░░███████░░░░░░░░░░░░░░_░░░░░██▓█" }]); }, 9300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________█▓▓▓▓▓▓▓▓▓▓▓▓█░░░███████░░░░░░░░░░░░░░░░░░░██▓█" }]); }, 9600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________█▓▓▓▓▓▓▓▓▓▓▓▓█░░░░███████░░░░░░░░░░░█████░██░░░" }]); }, 9900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________█▓▓▓▓▓▓▓▓▓▓▓▓█░░░░░░__███████░░░░░███████░░█░░░░" }]); }, 10200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________█▓▓▓▓▓▓▓▓▓▓▓▓▓█░░░░░░█▄▄▄▀▀▀▀████████████░░█░░░░" }]); }, 10500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________▐▓▓▓▓▓▓▓▓▓▓▓▓█░░░░░░██████▄__▀▀░░░███░░░░░█░░░" }]); }, 10800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________▐▓▓▓▓▓▓▓▓▓▓▓█▒█░░░░░░▓▓▓▓▓███▄░░░░░░░░░░░░░░░______▄▄▄" }]); }, 11100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________█▓▓▓▓▓▓▓▓▓█▒▒▒▒█░░░░░░▓▓▓▓▓█░░░░░░░░░░░░░░░▄▄▄_▄▀▀____▀▄" }]); }, 11400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________█▓▓▓▓▓▓▓▓▓█▒▒▒▒█▓▓░░░░░░░░░░░░░░░░░░░░░____▄▀____▀▄_________▀▄" }]); }, 11700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________█▓▓▓▓▓▓▓▓▓█▒▒▒▒█▓▓▓▓░░░░░░░░░░░░░░░░░______▐▄________█▄▄▀▀▀▄__█" }]); }, 12000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________█▓▓▓▓▓▓▓▓█▒▒▒▒▒▒█▓▓▓▓▓▓▓░░░░░░░░░____________█_█______▐_________▀▄▌" }]); }, 12300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______█▓▓▓▓▓▓▓▓█▒▒▒▒▒▒███▓▓▓▓▓▓▓▓▓▓▓█▒▒▄___________█__▀▄____█____▄▄▄____▐" }]); }, 12600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______█▓▓▓▓▓▓▓█_______▒▒█▒▒██▓▓▓▓▓▓▓▓▓▓█▒▒▒▄_________█____▀▀█▀▄▀▀▀___▀▀▄▄▐" }]); }, 12900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____█▓▓▓▓▓██▒_________▒█▒▒▒▒▒███▓▓▓▓▓▓█▒▒▒██________▐_______▀█_____________█" }]); }, 13200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ____█▓▓████▒█▒_________▒█▒▒▒▒▒▒▒▒███████▒▒▒▒██_______█_______▐______▄▄▄_____█" }]); }, 13500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __█▒██▒▒▒▒▒▒█▒▒____▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒____▒█▓█__▄█__█______▀▄▄▀▀____▀▀▄▄█" }]); }, 13800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __█▒▒▒▒▒▒▒▒▒▒█▒▒▒████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█_______█▓▓█▓▓▌_▐________▐____________▐" }]); }, 14100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __█▒▒▒▒▒▒▒▒▒▒▒███▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒_______█▓▓▓█▓▌__▌_______▐_____▄▄____▐" }]); }, 14400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒_____█▓▓▓█▓▓▌__▌_______▀▄▄▀______▐" }]); }, 14700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒███████▓▓█▓▓▓▌__▀▄_______________▄▀" }]); }, 15000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒███▒▒▒▒▒▒▒██▓▓▓▓▓▌___▀▄_________▄▀▀" }]); }, 15300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒█▓▓▓▓▓▀▄__▀▄▄█▀▀▀" }]); }, 15600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▓▓▓▓██▄▄▄▀" }]); }, 15900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████" }]); }, 16200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 16500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▄▄▄▄▄" }]); }, 16800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒█▒▒▒▒▒���▒▒▒▒▒▒▒▒▒███▒▒▒▒▒▒██▄▄" }]); }, 17100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒███▒▒▒▒▒▒▒▒▒▒▒▒▒█▄" }]); }, 17400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 17700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒█▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 18000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒█▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▌" }]); }, 18300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ____█▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒█▒▒▒▒█▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░▒▒▌" }]); }, 18600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ____█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█████████████▒▒▒▒▒█▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒░▒▌" }]); }, 18900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█_______▐▒▒▒▒█▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▌" }]); }, 19200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█________█▒▒█▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌" }]); }, 19500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█________█▒█▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌" }]); }, 19800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█________█▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 20100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█________█▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 20400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█________█▒▒▒░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀" }]); }, 20700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█_______█▒░░░▒▒▒▒▒░░░░░░░░▒▒▒█▀▀▀" }]); }, 21000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█_______█░▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░█▀" }]); }, 21300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ____________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█_______█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀" }]); }, 21600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█_______█▒▒▒▒▒▒▒▒▒▒▒▒█▀" }]); }, 21900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█_______▀▀▀███████▀▀" }]); }, 22200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 22500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 22800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 23100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 23400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒█" }]); }, 23700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________________█▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒█" }]); }, 24000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________________█▒▒▒▒▒▒▒▒████▒▒▒▒▒▒▒█" }]); }, 24300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ___________________█████████▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 24600);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ____________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 24900);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ____________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█" }]); }, 25200);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▌" }]); }, 25500);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▌" }]); }, 25800);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ______________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▌" }]); }, 26100);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______________________█▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░█" }]); }, 26400);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " ________________________█▒▒▒▒▒▒▒▒▒▒▒░░░█" }]); }, 26700);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " __________________________██▒▒▒▒▒▒░░░█▀" }]); }, 27000);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _____________________________█░░░░░█▀" }]); }, 27300);
                        setTimeout(function() { client.sendArray([{ m: "a", message: " _______________________________▀▀▀▀" }]); }, 27600);
                    } else {
                        sendchat("I need the crown for you to use large chat art.");
                    }
                } else {
                    sendchat('You can\'t use this command. Type /rank for more information.');
                }
}});

function spam(x) {
    setInterval(() => {
        press("b1",1000000)
    }, x)
}

BallArray = [
	"It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - definately.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful."
]

insult = [
  "You're as useless as the 'ueue' in 'queue'.",
  "Mirrors can't talk, and lucky for you, they can't laugh either.",
  "You're the reason the gene pool needs a lifeguard.",
  "If laughter is the best medicine, your face must be curing the world.",
  "Is your ass jealous of the shit that comes out of your mouth?",
  "If I had a dollar for every time you say something smart, I'd be broke.",
  "The back of your head frowns at me.",
  "Your genitals smile at me but frown at you.",
  "You look like a fire hazard."
]

motivate = [
  "You can do it!",
  "You'll make it!",
  "I believe in you!",
  "mōdəˈvāSH(ə)n"
]

joke = [
  "What's the difference between Paul Walker and a computer? I give a fuck when my computer crashes.",
  "My Grandpa said, \"Your generation relies too much on technology!\" I replied, \"No, your generation relies too much on technology!\" Then I unplugged his life support.",
  "What do you call a five year old with no friends? A sandy hook survivor.",
  "Jesus Christ fed 2,000 people with 5 loaves of bread and 2 fish, but Adolf Hitler made 6 million Jews toast.",
  "What's the worst thing about breaking up with a Japanese girl? You have to drop the bomb twice before she gets the message.",
  "What's got 5 arms, 3 legs and 2 feet? The finish line at the Boston Marathon.",
  "What did the boy with no hands get for Christmas? GLOVES! Nah, just kidding... He still hasn't unwrapped his present.",
  "How do Ethiopians celebrate their kids first birthday? By putting flowers on the grave.",
  "How did Rihanna find out Chris Brown was cheating on her? She found another woman's lipstick on his knuckles.",
  "How can you tell if your wife is dead? The sex is the same but the dishes start piling up.",
  "Why do Mexicans never have Sex Ed and Driver's Ed on the same day? They have to give the donkey a break at some point.",
  "Feminism.",
  "So I suggested to my wife that she'd look sexier with her hair back… Which is apparently an insensitive thing to say to a cancer patient.",
  "Most black 15 year-olds in this country are decent, law abiding citizens. It's their kids who cause all the trouble.",
  "How many feminists does it take to change a light bulb? Don't be stupid, feminists can't change anything.",
  "What is a pedophiles favorite part about Halloween? Free delivery.",
  "So I painted my laptop black, hoping it would run faster… Now it doesn't work.",
  "How do you kill a redneck? Wait 'till he fucks his sister then cut the brakes on his house.",
  "What's the difference between a gay man and a freezer? Freezer doesn't fart when you pull the meat out.",
  "What do you tell a woman with two black eyes? Nothing you already done told her twice.",
  "How do you fit 4 queers on a barstool? Flip it upside-down.",
  "Why do Jews have big noses? Because air is free.",
  "What happened when the jew walked into the wall with a hard-on? He broke his nose.",
  "How long does it take for a black woman to take a shit? Nine months.",
  "How do you get a nun pregnant? Dress her up like an altarboy.",
  "What do you call 40 mexicans buried up to their neck in sand? A spicket fence.",
  "How many women does it take to screw in a lightbulb? None,they just sit in the dark and bitch.",
  "Did you hear about the two car pile up in Mexico? 200 Mexicans died.",
  "What kind of file do you need to turn a 15mm hole into a 40mm hole? A pedophile.",
  "What's a pedophile's favorite part of a hockey game? Before the First Period.",
  "How do you swat 200 flies at one time? Hit an Ethiopian in the face with a frying pan.",
  "What is a redneck virgin? A seven year old that can run faster than her brothers.",
  "How many feminists does it take to change a light bulb? One, she just holds the bulb to the socket and waits for the world to revolve around her.",
  "Girls are like blackjack… I'm trying to go for 21 but I always hit on 14.",
  "Why does Stephen Hawking do one-liners? Because he can't do stand up.",
  "Did you hear the Score of the Egypt vs Ethiopia soccer game? Egypt 8, Ethiopia didn't.",
  "How many cops does it take to change a light bulb? They don't. They arrest the bulb for being broke and beat the room for being black.",
  "What's 9 inches long, pink, and makes my girlfriend scream when I put it in her mouth? Her miscarriage.",
  "A Jew, a black, and a Muslim are on a frozen lake, not talking to each other, so I thought I would go over there and break the ice.",
  "What's the difference between dollars and Jews? I'd give a shit if I lost 6 million dollars.",
  "How does a black woman know she is pregnant? When she pulls her tampon out the cotton is already picked.",
  "Whats the difference between George Zimmerman and Trayvon Martin? Zimmerman knew how to dodge a bullet.",
  "One time I fucked this chick so hard, she almost came back to life.",
  "I don't understand why Obama has to give his speeches behind bullet proof glass. I mean, I know he's black and all, but I doubt he'll shoot anyone.",
  "What's the difference between a Jew and harry potter? Harry can escape the chamber.",
  "What do you call a woman who thinks she can do anything a man can do? Wrong.",
  "What's the difference between a hippie chick and a hockey player? A hockey player showers after 3 periods.",
  "What's the difference between cancer and Black people? Cancer got Jobs.",
  "What do Sarah Palin and Iron Man have in common? They both had a downey jr inside of them.",
  "What's a word that white people can call white people, but black people can't call black people? Dad.",
  "What do you say when you see your T.V. floating in the middle of the night? Drop it nibba!!",
  "Whats the difference between a truckload of bowling balls and a truckload of dead babies? I can't unload a truckload of bowling balls with a pitchfork.",
  "How do you blindfold a Chinese man? Dental floss!",
  "Why are black people so fast? Because all the slow one are in the jail.",
  "What's the difference between a drug dealer and a hooker? A hooker can wash her crack and sell it again.",
  "Why do brides wear a white dress? So that the dishwasher matches the washing machine.",
  "What do you call a bunch of black people running down a hill? A jail break.",
  "What's faster than a nigga stealing your TV? His brother with your xbox.",
  "What's the toughest thing about eating bald pussy? Putting the diaper back on.",
  "What do you call an ethiopian with a bag of rice? A restaurant owner.",
  "How can you tell if a nigga is pregnant? Have her squat on a watermelon and check it for teeth marks.",
  "What's 7 inches long and hasn't been sucked in over 2 years? Whitney Houston's crack pipe.",
  "What's the difference between a 4 year old boy and a bag of cocaine? Eric Clapton wouldn't let a bag of cocaine fall out a window.",
  "What's the difference between a woman and a computer? You can punch information into a computer.",
  "How do you make a gay fuck a woman? Shit in her cunt.",
  "What's better than winning a gold medal at the Special Olympics? Not being retarded.",
  "What does a nigga and an apple have in common? Both look great hanging from a tree.",
  "The parents of the sandy hook victims should of kept the Christmas receipts.",
  "Have you ever had Ethiopian food? Neither have they.",
  "How do you start a rave in Ethiopia? Staple food to the ceiling.",
  "Why don't black people go on cruises? They're not falling for that one again.",
  "What's the most confusing day in Detroit? Father's day.",
  "What's the hardest part of watching a school bus full of kindergarteners go off a cliff? The erection.",
  "What's black and blue, and scares mothers everywhere? Crib death.",
  "What's the difference between a pair of jeans and an ethiopian? A pair of jeans only has one fly on it.",
  "Fat logic.",
  "What's faster than a speeding bullet? A jew with a coupon.",
  "How did Hitler kill so many Jews? Free transportation.",
  "What's the difference between a baby and a watermelon? One is fun to shoot and the other is fun to eat.",
  "How do you stop a baby from crawling in circles? Nail it's other hand to the floor.",
  "Black dads coming home.",
  "How do you get a dead baby out of a blender? Nachos.",
  "How do you stop a Mexican tank? You shoot the guy pushing it.",
  "I just gave my sister head. First time eating cheese.",
  "How do you fuck a special person? You go down.",
  "Why can't you fool an aborted baby? Cause it wasn't born yesterday.",
  "Why did Hitler kill himself? He got the gas bill.",
  "How do you turn a fruit into a vegetable? AIDS.",
  "How did Jesus walk on water? Shit floats.",
  "How does a black woman fight crime? She gets an abortion.",
  "How do you drown a nigga? You pop their lips.",
  "Why can't Mexicans play UNO? They steal all of green cards.",
  "What's the worst thing about being black and Jewish? Having to sit in the back of the oven.",
  "What do you get if you put a baby in a blender? An erection.",
  "What do fat chicks and bricks have in common? They both get laid by Mexicans.",
  "What's pale, white, and bounces up and down in a baby's crib? A pedophile's ass.",
  "What's the difference between a jew and a pizza? A pizza doesn't scream when you put it in the oven.",
  "How do you get a white girl to suck your dick? Put mayonnaise on it.",
  "What's the difference between a nibba and a pile of dog shit? Eventually the pile of dog shit will turn white and stop stinking.",
  "What's the difference between jelly and jam? I can't jelly my dick down a baby's throat.",
  "What do you call a guy with a rubber toe? Roberto.",
  "A blind man walks into a bar. And a table. And a chair.",
  "What did the fireman name his twin sons? José and Hose-B.",
  "What washes up on tiny beaches? Microwaves."
]