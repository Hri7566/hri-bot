/*
7566
by Hri7566
Many thanks to Karl Marx, Karma, Hue/Man, BopBot, Raven, lamp, Vincent, and users like you.
*/
const MPPClient = require("./client.js");
const mysql = require('mysql');

client = new MPPClient('ws://multiplayerpiano.com', undefined);

client.start();

function setName(string) {
    setTimeout(() => {
        client.sendArray([{ m:'userset', set:{name:string} }]);
    }, 100);
}

var name = "7566 (^help)";
var channel = "7566 (^help)";

client.on("hi", () => {
    console.log("Online");

    client.setChannel(channel);

    setName(name);
});

// Uptime
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

function kickban(id, ms) {
    client.sendArray([{m: "kickban", _id: id, ms: ms}]);
};

var fs = require('fs');
fs.writeFile("test.js", "TEST", function(err) {
    if(err) {
        return console.log(err);
    } console.log("The file was saved!");
});



client.on("a", (msg) => {
    if(msg.a.toLowerCase() == "ping"){
        client.sendArray([{ m:'a', message:"pooooong" }]);
    }
});

const Math = require('mathjs')

function chat(string){
    client.sendArray([{ m:'a', message:string }]);
}

var Kings = [
    "29587fe40f6bd85fc757cc2d",
    "170c83a5e8f1bdafc11a936f",
    "09743d6dceefb17f1fa8aa2d",
    "8ab89bf2447486172314356a",
    "1edbe529529e31a69bb3bcbd",
    "8da283c3cf82e722513b106d"
]
//7863d120dc46276c8ca42a09 emily the crazy lady

var Nobles = [
]

var blacklist = [
    "d1d35248d9c16f778c8d4b02", // jpdld
    "90b5a0bee7cfc3b32c252e0b"
]

var toggle = 1;
//cursor vars
var cursorMode = "dvd";
var pos = {x: Math.random()*100, y: Math.random()*100};
var pos2 = {x: 50, y: 50};
var vel = {x: .025, y: .035};
var vel2 = {x: 0, y: 0};
var acc = {x: 0, y: 0};
var follower = "7504f8a8bb9e7c39ddbcbd27";
var followPos = {x: 50, y: 50};
var d = new Date();
var t = d.getMilliseconds();
var oldt = 0;
var dt = 0;
var g = -10;

function removeFromArray(array, value) {
    var idx = array.indexOf(value);
    if (idx !== -1) {
        array.splice(idx, 1);
    }
    return array;
}


function getPart(boop) {
    for (const id in client.ppl) {
        let part = client.ppl[id];
        if (part.name.toLowerCase().indexOf(boop.toLowerCase()) !== -1) {
            return part;
            break;
        }
    }
}

client.on('a', msg => {
    let args = msg.a.split(' ');
    let cmd = args[0].toLowerCase();
    let argcat = msg.a.substring(cmd.length).trim();
    let part = getPart(argcat);
    var isKing = (Kings.indexOf(msg.p._id) !== -1);
    var isBlocked = (blacklist.indexOf(msg.p._id) !== -1);
    var cursorInvalid =  false;
    cursorMode = "dvd";
    console.log("[" + msg.p._id + "] " + msg.p.name + ": " + msg.a);
    fs.appendFile("log.txt", "[" + msg.p._id + "] " + msg.p.name + ": " + msg.a + "\n", function(err) {
        if(err) {
            return console.log(err);
        };
    });
    if (cmd == "^toggle") {
            if (isKing) {
                if (toggle == 1) {
                    toggle = 0;
                    chat("Chat features disabled");
                } else if (toggle == 0) {
                    toggle = 1;
                    chat("Chat features enabled");
                }
            }
    }
    if (toggle == 1) {
        if (!isBlocked) {
        switch (cmd) {
            case "^help":
                chat("Commands: ^help / ^about / ^8ball / ^quote / ^math / ^kill / ^eat / ^rps / ^magicconchshell / ^simonsays / ^rur (Warning: ^rur Russian Roulette will ban you!)")
                break;
            case '^about':
                setTimeout(() => {chat("This chat bot was made by Hri7566.")}, 0);
                setTimeout(() => {chat("It runs off of nodejs and some npm packages.")}, 1500);
                setTimeout(() => {chat("Many thanks to Karl Marx, Karma, Hue/Man, BopBot, Raven, lamp, Vincent, and users like you.")}, 3000);
                setTimeout(() => {chat("Discord: Hri7566#3409")}, 4500);
                setTimeout(() => {chat("GitHub: https://github.com/Hri7566/hri-bot")}, 6500);
                break;
            case '^name':
                if (!isKing) {
                    chat("You don't have permission to use this feature,")
                } else {
                    if (!argcat) {
                        chat("You need to provide a name.");
                    } else {
                        setName(argcat);
                        chat("Name set to " + argcat + ".");
                    }
                }
                break;
            case '^id':
                chat(msg.p._id);
                break;
            case "^goto":
                if (isKing) {
                    if (argcat.length == 0) {
                        chat("You need to submit a room to move to. Usage: ^goto <room>")
                    } else {
                        chat("Moving to room: \"" + argcat + "\"");
                        client.setChannel(argcat);
                    }
                } else {
                    chat("You can't use this command.");
                }
                break;
            case "^cursor":
                if (argcat == "") {
                    chat("Cursor modes: none / dvd / crazy")
                } else {
                    isPaused = false;
                    switch (argcat) {
                        case "dvd":
                            cursorMode = "dvd";
                            vel = {x:.025,y:.035};
                            pos = {x:Math.random()*100,y:Math.random()*100};
                            break;
                        case "none":
                            cursorMode = "none";
                            isPaused = true;
                            break;
                        case "crazy":
                            cursorMode = "crazy";
                            vel = {x:5,y:7};
                            break;
                        case "spiral":
                            cursorMode = "spiral";
                            pos = {x:10,y:0};
                            pos2 = {x:10,y:0};
                            vel = {x:.020,y:.020};
                            break;
                        default:
                            chat("Invalid cursor type");
                            cursorInvalid = true;
                            break;
                    }
                    if (cursorInvalid == false) {
                        chat("Cursor type changed to " + argcat);
                    }
                }
                break;
            case "^8ball":
                if (argcat.length == 0) {
                    chat("You need to ask a question.");
                } else {
                    chat(Ball[Math.floor(Math.random()*Ball.length)]);
                }
                break;
            case '^magicconchshell':
                if (argcat.length == 0) {
                    chat("You need to ask a question.");
                } else {
                    chat(Shell[Math.floor(Math.random()*Shell.length)]);
                }
                break;
            case "^quote":
                chat(QuoteArray[Math.floor(Math.random()*QuoteArray.length)]);
                break;
            case "^crown":
                if (isKing) {
                    if (client.isOwner()) {
                        chat("Giving ownership to " + msg.p.name);
                        client.sendArray([{ m: "chown", id: msg.p.id }]);
                    } else {
                        chat("I don't have the crown.");
                    }
                } else {
                    chat("You can't use this command.");
                }
                break;
            case "^kill":
                    try {
                        if (!argcat || part._id == msg.p._id) {
                            chat(' In the ancient ritual of seppuku, ' + msg.p.name + ' unsheaths their sword and runs it though their stomach.');
                        } else if (part) {
                            chat(msg.p.name + ' kills '+ client.ppl[part.id].name+' with ' + kills[Math.floor(Math.random()*kills.length)] +'. How? Who knows.');
                        }
                    } catch (e) {
                        chat("The user '"+argcat+"' was not found. Try using part of their username.");
                    }
                break;
            case '^eat':
                try {
                    if (!argcat || part._id == msg.p._id) {
                        chat(msg.p.name+ " eats " + FoodArray[Math.floor(Math.random()*FoodArray.length)] + ". It " + TasteArray[Math.floor(Math.random()*TasteArray.length)] + ".");
                    } else if (part) {
                        chat(msg.p.name+' cannibalizes '+ client.ppl[part.id].name + '. It '  + TasteArray[Math.floor(Math.random()*TasteArray.length)] + ".");
                    }
                } catch (e) {
                    chat(msg.p.name + " ate '"+argcat+"'. It " + TasteArray[Math.floor(Math.random()*TasteArray.length)] + ".");
                }
                break;
            case '^rps':
                try {
                    if (!argcat || part._id == msg.p._id) {
                        chat(msg.p.name+ " plays rock paper sissors alone.");
                    } else if (part) {
                        chat(msg.p.name+': '+rps[Math.floor(Math.random()*rps.length)]+' '+ client.ppl[part.id].name+': ' +rps[Math.floor(Math.random()*rps.length)]);
                    }
                } catch (e) {
                    chat("The user '"+argcat+"' was not found. Try using part of their username.");
                }
                break;
            case '^background':
            case '^bg':
                if (isKing) {
                    if (client.isOwner()) {
                        if (!argcat) {
                            chat("Specify at least one color in hexadecimal.");
                        } else {
                            let color1 = args[1];
                            client.sendArray([{m: "chset", set: {color: color1}}]);
                            if (args[2] !== "") {
                                let color2 = args[2];
                                client.sendArray([{m: "chset", set: {color: color1, color2: color2}}]);
                            }
                        }
                    } else {
                        chat("The bot needs the crown for this feature to work properly.");
                    }
                    break;
                } else {
                    chat("You don't have permission to use this command.")
                }
                break;
            case '^simonsays':
                if (!argcat) {
                    chat("What do I say?");
                } else {
                    chat("\"" + argcat + "\" - " + msg.p.name);
                }
                break;
            case '^say':
                if (isKing) {
                    chat(argcat);
                }
                break;
            case '^art':
                if (!argcat) {
                    chat("List of Art: lenny / guns");;
                } else {
                    switch (argcat) {
                        case 'lenny':
                            chat('( ͡° ͜ʖ ͡°)');
                            break;
                        case 'guns':
                            chat('̿̿ ̿̿ ̿̿ ̿\'̿\'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿');
                            break;
                        
                    }
                }
                break;
            case '^rur':
                var math = Math.random();
                if (math < .167) {
                    chat(msg.p.name + ", you lived.");
                } else if (math >= .167 && math < .333) {
                    chat(msg.p.name + ", you lived.");
                } else if (math >= .5 && math < .667) {
                    chat(msg.p.name + ", you lived.");
                } else if (math >= .667 && math < .833) {
                    chat(msg.p.name + ", you lived.");
                } else {
                    client.sendArray([{m:"kickban", _id: msg.p._id, ms: 0}]);
                    chat(msg.p.name + " died playing Russian Roulette");
                }
                break;
            case '^panic':
                if (isKing) {
                    process.exit();
                }
            case '^rank':
                if (isKing) {
                    chat("Ranks are divided into two sections: Kings and Peasents. " + msg.p.name + ", your rank is Kings.");
                } else {
                    chat("Ranks are divided into two sections: Kings and Peasents. " + msg.p.name + ", your rank is Peasents.");
                }
                break;
            }
        }
    }
});

client.on("m", function(msg) {
    var part = client.findParticipantById(msg.id);
    if (part._id == client.user._id) return;
    followPos.x = +msg.x;
    followPos.y = +msg.y;
});
var cursor = setInterval(function() {
   client.sendArray([{m: "m", x: client.getOwnParticipant().x = pos.x, y: client.getOwnParticipant().y = pos.y}]);
}, 15);

var isPaused = false;

var cusorMath = setInterval(function() {
    if (!isPaused) {
        if (cursorMode == "dvd" || cursorMode == "crazy") {
            pos.x += vel.x;
            pos.y += vel.y;
            if (pos.x >= 100) {
                vel.x = -vel.x;
            }
            if (pos.x <= 0) {
                vel.x = -vel.x;
            }
            if (pos.y >= 100) {
                vel.y = -vel.y;
            }
            if (pos.y <= 0) {
                vel.y = -vel.y;
            }
        } else if (cursorMode == "spiral") {
            pos.x -= vel.x;
            pos.y += vel.y;
            if (pos.x <= 0) {
                pos2.x += 10;
                pos.x = pos2.x;
            }
            if (pos.x >= 100) {
                pos.x = 10;
                pos2.x = 10;
            }
        }
    }
});


client.on('a', function (msg) {
    let args = msg.a.split(' ');
    let cmd = args[0].toLowerCase();
    let isKing = (Kings.indexOf(msg.p._id) !== -1);
    
    if(cmd == "^js"){
        if (isKing) {
            let i = msg.a.substring(msg.a.split(" ")[0].length+1);
            try{
                chat("Console: "+eval(i.toString()));
            }catch(e){
                chat(e+".");
            }
        }
    }
});

client.on("a", function(msg) {
    let args = msg.a.split(' ');
    let cmd = args[0].toLowerCase();
    let argcat = msg.a.substring(cmd.length).trim();
    let a,b;
    var isBlocked = (blacklist.indexOf(msg.p._id) !== -1);
    if (toggle == 1) {
        if (!isBlocked) {
            if (cmd == "^math") {
                chat("Math Functions: ^add | ^sub | ^mult | ^div | ^pow  | ^exp | ^atan | ^atanh | ^atan2 | ^acos | ^acosh | ^cos | ^cosh | ^asin | ^asinh | ^cbrt | ^sqrt | ^tan | ^tanh | ^sin | ^sinh | ^string");
            }
            let a = args[1]
            let b = args[2]

            switch (cmd) {
                case '^add':
                    if (args[1] == "help") {
                        chat("Adds two numbers together. Usage : ^add x y");
                    } else if(!a || !b || isNaN(a) || isNaN(b)) {
                        chat("Invalid Usage. Need help? Use ^add help");
                    } else {
                        chat(`Answer: ${parseInt(a) + parseInt(b)}`);
                    }
                    break;
                case '^sub':
                    if (args[1] == "help") {
                        chat("Subtracts two numbers together. Usage : ^sub x y");
                    } else if(!a || !b || isNaN(a) || isNaN(b)) {
                        chat("Invalid Usage. Need help? Use ^sub help");
                    } else {
                        chat(`Answer: ${parseInt(a) - parseInt(b)}`);
                    }
                    break;
                case '^mult':
                    if (args[1] == "help") {
                        chat("Multiples two numbers together. Usage : ^mult x y");
                    } else if(!a || !b || isNaN(a) || isNaN(b)) {
                        chat("Invalid Usage. Need help? Use ^mult help");
                    } else {
                        chat(`Answer: ${parseInt(a) * parseInt(b)}`);
                    }
                    break;
                case '^div':

                    if (args[1] == "help") {
                        chat("Divides two numbers from eachother. Usage : ^div x y");
                    } else  if(!a || !b || isNaN(a) || isNaN(b)) {
                        chat("Invalid Usage. Need help? Use ^div help");
                    } else if(b == 0) {
                        chat(`Answer: 69420`);
                    } else {
                        chat(`Answer: ${parseInt(a) ^ parseInt(b)}`);
                    }
                    break;
                case '^pow':
                    if (args[1] == "help") {
                        chat("  Returns the value of x to the power of y. Usage : ^pow x y");
                    } else if(!a || !b || isNaN(a) || isNaN(b)) {
                        chat("Invalid Usage. Need help? Use ^pow help");
                    } else {
                        chat(`Answer: ${(parseInt(a) ** parseInt(b))}`);
                    }
                    break;
                case '^exp':
                    if (args[1] == "help") {
                        chat("  Returns the value of E^x. Usage : ^exp x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use ^exp help");
                    } else {
                        chat(`Answer: ${Math.exp(parseInt(a))}`);
                    }
                    break;
                case '^atan':
                    if (args[1] == "help") {
                        chat(" Returns the arctangent of a number as a value between -PI^2 and PI^2 radians. Usage : ^atan x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use ^atan help");
                    } else {
                        chat(`Answer: ${Math.atan(parseInt(a))}`);
                    }
                    break;
                case '^atanh':
                    if (args[1] == "help") {
                        chat("  Returns the hyperbolic tangent of a number. Usage : ^tanh x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use ^tanh help");
                    } else {
                        chat(`Answer: ${Math.tanh(parseInt(a))}`);
                    }
                    break;
                case '^atan2':
                    if (args[1] == "help") {
                        chat("  Returns the arctangent of the quotient of its arguments. Usage : ^atan2 x y");
                    } else if(!a || !b || isNaN(a) || isNaN(b)) {
                        chat("Invalid Usage. Need help? Use ^atan2 help");
                    } else {
                        chat(`Answer: ${Math.atan2(parseInt(a) + parseInt(b))}`);
                    }
                    break;
                case '^acos':
                    if (args[1] == "help") {
                        chat("Returns the arccosine of x, in radians. Restrictions: x must be less then or equal to 1  Usage : /acos x");
                    } else if(!a || isNaN(a) || a > 1) {
                        chat("Invalid Usage. Need help? Use /acos help");
                    } else {
                        chat(`Answer: ${Math.acos(parseInt(a))}`);
                    }
                    break;
                case '^acosh':
                    if (args[1] == "help") {
                        chat("Returns the arccosine of x, in radians. Restrictions: x must be less then or equal to 1  Usage : /acos x");
                    } else if(!a || isNaN(a) || a > 1) {
                        chat("Invalid Usage. Need help? Use /acos help");
                    } else {
                        chat(`Answer: ${Math.acosh(parseInt(a))}`);
                    }
                    break;
                case '^cos':
                    if (args[1] == "help") {
                        chat("  Returns the cosine of x (x is in radians). Usage : /cos x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /cos help");
                    } else {
                        chat(`Answer: ${Math.cos(parseInt(a))}`);
                    }
                    break;
                case '^cosh':
                    if (args[1] == "help") {
                        chat("  Returns the hyperbolic cosine of x. Usage : /cosh x");
                    } else  if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /cosh help");
                    } else {
                        chat(`Answer: ${Math.cosh(parseInt(a))}`);
                    }
                    break;
                case '^asin':
                    if (args[1] == "help") {
                        chat("The asin() method returns the arcsine of a number as a value between -PI/2 and PI/2 radians. Restrictions: x must be within the range -1, 1  Usage : /acos x");
                    } else if(!a || isNaN(a) || a > 1 || a < -1) {
                        chat("Invalid Usage. Need help? Use /acos help");
                    } else {
                        chat(`Answer: ${Math.asin(parseInt(a))}`);
                    }
                    break;
                case '^asinh':
                    if (args[1] == "help") {
                        chat("  Returns the hyperbolic arcsine of x. Usage : /acos x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /asinh help");
                    } else {
                        chat(`Answer: ${Math.asinh(parseInt(a))}`);
                    }
                    break;
                case '^cbrt':
                    if (args[1] == "help") {
                        chat("Returns the cubic root of x. Usage : /cbrt x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /cbrt help");
                    } else {
                        chat(`Answer: ${Math.cbrt(parseInt(a))}`);
                    }
                    break;
                case '^sqrt':
                    if (args[1] == "help") {
                        chat("  Returns the square root of x. Usage : /sqrt x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /sqrt help");
                    } else {
                        chat(`Answer: ${Math.sqrt(parseInt(a))}`);
                    }
                    break;
                case '^tan':
                    if (args[1] == "help") {
                        chat("  Returns the tangent of an angle. Usage : /tan x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /tan help");
                    } else {
                        chat(`Answer: ${Math.tan(parseInt(a))}`);
                    }
                    break;
                case '^tanh':
                    if (args[1] == "help") {
                        chat("  Returns the hyperbolic tangent of a number. Usage : /tanh x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /tanh help");
                    } else {
                        chat(`Answer: ${Math.tanh(parseInt(a))}`);
                    }
                    break;
                case '^sin':
                    if (args[1] == "help") {
                        chat("  Returns the sine of x (x is in radians). Usage : /sin x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /sin help");
                    } else {
                        chat(`Answer: ${Math.sin(parseInt(a))}`);
                    }
                    break;
                case '^sinh':
                    if (args[1] == "help") {
                        chat("  Returns the hyperbolic sine of x. Usage : /sinh x");
                    } else if(!a || isNaN(a)) {
                        chat("Invalid Usage. Need help? Use /sinh help");
                    } else {
                        chat(`Answer: ${Math.sinh(parseInt(a))}`);
                    }
                    break;
                case '^string':
                    if (args[1] == "help") {
                        chat("Solves strings, such as (1+2(2*2)). Usage : ^string x");
                    } else if(!a) {
                        chat("Invalid Usage. Need help? Use ^string help");
                    } else {
                        try{
                            chat(`Answer: ${Math.evaluate(argcat)}`);
                        }
                        catch(err) {
                            chat("Invalid Usage. Need help? Use ^string help");
                        }
                    }
                    break;
            }
        }
    }
});

client.on("a", function(msg){
    if (!msg.a.toLowerCase().startsWith("^kickban")) return;
    if(Nobles.includes(msg.p._id) || Kings.includes(msg.p._id)) {
        var input = msg.a.split(" ").slice(1).join(" ");
        if (!input) return chat("Kickban who?");
        var target = client.ppl[input] || findParticipantByName(input);
        if (!target) return chat("Person not found.");
        client.sendArray([{m:"kickban", _id: target._id, ms: 20 * 60 * 1000}]);
    } else return chat("You can\'t use this command.");
});

Ball = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
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

Shell = [
    "Maybe someday.",
    "Nothing.",
    "Neither.",
    "Follow the seahorse.",
    "I don't think so.",
    "No.",
    "Yes.",
    "Try asking again."
]

QuoteArray = ['"Fuck my ass!"- Raven',
              '"Men make their own history, but they do not make it as they please." - Karl Marx.',
              '"Victory goes to the player who makes the next-to-last mistake."- Chessmaster Savielly Grigorievitch Tartakower',
              '"Happiness equals reality minus expectations." - Tom Magliozzi',
              '"Black holes are where God divided by zero." - Steven Wright',
              '"Once you eliminate the impossible, whatever remains, no matter how improbable, must be the truth."- Sherlock Holmes',
              '"I love Mickey Mouse more than any woman I have ever known." - Walt Disney',
              '"Get busy living or get busy dying." -Stephen King',
              '"Education is the most powerful weapon which you can use to change the world." ― Nelson Mandela',
              '"Don\'t cry because it\'s over, smile because it happened." ― Dr. Seuss',
              '"I live by Music on, world off. Music relates to the soul." - Raven',
              '"You have NO idea how fast my heartbeats when I see you." - Unknown',
              '"I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best."― Marilyn Monroe',
              '"Be yourself; everyone else is already taken." ― Oscar Wilde',
              '"Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe."― Albert Einstein',
              '"Be who you are and say what you feel, because those who mind don\'t matter, and those who matter don\'t mind." ― Bernard M. Baruch',
              '"You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams." ― Dr. Seuss',
              '"In three words I can sum up everything I\'ve learned about life: it goes on." ― Robert Frost',
              '"Friendship is born at the moment when one man says to another "What! You too? I thought that no one but myself." ― C.S. Lewis',
              '"No one can make you feel inferior without your consent." ― Eleanor Roosevelt',
              '"A friend is someone who knows all about you and still loves you." ― Elbert Hubbard',
              '"I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel." ― Maya Angelou',
              '"Always forgive your enemies; nothing annoys them so much." ― Oscar Wilde',
              '"Live as if you were to die tomorrow. Learn as if you were to live forever." ― Mahatma Gandhi',
              '"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that." ― Martin Luther King Jr.',
              '"Without music, life would be a mistake." ― Friedrich Nietzsche',
              '"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment." ― Ralph Waldo Emerson',
              '"We accept the love we think we deserve." ― Stephen Chbosky',
              '"Insanity is doing the same thing, over and over again, but expecting different results." ― Narcotics Anonymous',
              '"I believe lies so you eventually learn to trust no one but yourself, and sometimes good things fall apart so better things can fall together." ― Marilyn Monroe',
              '"Deep into that darkness peering, long I stood there, wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before." - Edgar Allan Poe',
              '"Your deeds are your monuments." - An Egyptian tomb inscription',
              '"The Way Get Started Is To Quit Talking And Begin Doing." - Walt Disney',
              '"The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty." - Winston Churchill',
              '"Don\'t let yesterday take up too much of today." - Will Rogers',
              '"You learn more from failure than from success. Don\'t let it stop you. Failure builds character." - Unknown',
              '"It\'s not whether you get knocked down, It\'s whether you get up." – Vince Lombardi',
              '"If You Are Working On Something That You Really Care About, You Don\'t Have To Be Pushed. The Vision Pulls You."- Steve Jobs',
              '"People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do."- Rob Siltanen',
              '"Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough."- Og Mandino',
              '"Entrepreneurs Are Great At Dealing With Uncertainty And Also Very Good At Minimizing Risk. That\'s The Classic Entrepreneur."- Mohnish Pabrai',
              '"We May Encounter Many Defeats But We Must Not Be Defeated."- Maya Angelou',
              '"Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do."- Johann Wolfgang Von Goethe',
              '"Imagine Your Life Is Perfect In Every Respect; What Would It Look Like?"- Brian Tracy',
              '"We Generate Fears While We Sit. We Overcome Them By Action."- Dr. Henry Link',
              '"Whether You Think You Can Or Think You Can\'t, You\'re Right."- Henry Ford',
              '"Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing."- Helen Keller',
              '"The Man Who Has Confidence In Himself Gains The Confidence Of Others."- Hasidic Proverb',
              '"The Only Limit To Our Realization Of Tomorrow Will Be Our Doubts Of Today."- Franklin D. Roosevelt',
              '"Creativity Is Intelligence Having Fun."- Albert Einstein',
              '"What You Lack In Talent Can Be Made Up With Desire, Hustle And Giving 110% All The Time."- Don Zimmer',
              '"Do What You Can With All You Have, Wherever You Are."- Theodore Roosevelt',
              '"Develop An Attitude Of Gratitude. Say Thank You To Everyone You Meet For Everything They Do For You."- Brian Tracy',
              '"You Are Never Too Old To Set Another Goal Or To Dream A New Dream."- C.S. Lewis',
              '"To See What Is Right And Not Do It Is A Lack Of Courage."- Confucious',
              '"Reading Is To The Mind, As Exercise Is To The Body."- Brian Tracy',
              '"Fake It Until You Make It! Act As If You Had All The Confidence You Require Until It Becomes Your Reality."- Brian Tracy',
              '"The Future Belongs To The Competent. Get Good, Get Better, Be The Best!"- Success Quote By Brian Tracy',
              '"For Every Reason It\'s Not Possible, There Are Hundreds Of People Who Have Faced The Same Circumstances And Succeeded." – Jack Canfield',
              '"Things Work Out Best For Those Who Make The Best Of How Things Work Out." – Positive Quote By John Wooden',
              '"A Room Without Books Is Like A Body Without A Soul." – Marcus Tullius Cicero',
              '"I Think Goals Should Never Be Easy, They Should Force You To Work, Even If They Are Uncomfortable At The Time." – Michael Phelps',
              '"One Of The Lessons That I Grew Up With Was To Always Stay True To Yourself And Never Let What Somebody Else Says Distract You From Your Goals." Michelle Obama',
              '"Today\'s Accomplishments Were Yesterday\'s Impossibilities." – Robert H. Schuller',
              '"The Only Way To Do Great Work Is To Love What You Do. If You Haven\'t Found It Yet, Keep Looking. Don\'t Settle." – Steve Jobs',
              '"You Don\'t Have To Be Great To Start, But You Have To Start To Be Great." – Zig Ziglar',
              '"A Clear Vision, Backed By Definite Plans, Gives You A Tremendous Feeling Of Confidence And Personal Power." – Brian Tracy',
              '"There Are No Limits To What You Can Accomplish, Except The Limits You Place On Your Own Thinking." – Brian Tracy',
              '"You are today where your thoughts have brought you; you will be tomorrow where your thoughts take you." - James Allen',
              '"You can\'t depend on your eyes when your imagination is out of focus." - Mark Twain',
              '"Stop worrying about the potholes in the road and enjoy the journey." - Babs Hoffman',
              '"Our greatest glory is not in never falling but in rising every time we fall." - Confucius',
              '"A man is literally what he thinks." - James Allen',
              '"A danger foreseen is half avoided." - Thomas Fuller',
              '"Finding a way to live the simple life today is man\'s most complicated task." - Henry A. Courtney',
              '"Yesterday is but today\'s memory, tomorrow is today\'s dream." - Kahlil Gibran',
              '"In the middle of difficulty lies opportunity." - Albert Einstein',
              '"Everyone needs to be valued. Everyone has the potential to give something back." - Diana Princess of Wales',
              '"Things do not happen. Things are made to happen." - John F Kennedy',
              '"Life is like riding a bicycle. To keep your balance, you must keep moving." - Albert Einstein',
              '"What we think determines what happens to us, so if we want to change our lives, we need to stretch our minds." -Wayne Dyer',
              '"Be kind, for everyone you meet is fighting a hard battle." - Plato',
              '"Being challenged in life is inevitable, being defeated is optional." - Roger Crawford',
              '"Not everything that can be counted counts, and not everything that counts can be counted." - Albert Einstein',
              '"You cannot perform in a manner inconsistent with the way you see yourself." - Zig Ziglar',
              '"No pressure, no diamonds." - Mary Case',
              '"Our chief want is someone who will inspire us to be what we know we could be." - Ralph Waldo Emerson',
              '"Don\'t limit yourself. Many people limit themselves to what they think they can do." - Mary Kay Ash',
              '"If you want to achieve widespread impact and lasting value, be bold." - Howard Schultz',
              '"If you wish to know the mind of a man, listen to his words." - Johann Wolfgang von Goethe',
              '"Never stand begging for that which you have the power to earn." - Miguel de Cervantes',
              '"Know yourself and you will win all battles."  - Sun Tzu',
              '"For every minute you are angry you lose sixty seconds of happiness." - Ralph Waldo Emerson',
              '"There is no such thing in anyone\'s life as an unimportant day." - Alexander Woollcott',
              '"An expert is a man who has made all the mistakes which can be made, in a narrow field." - Niels Bohr',
              '"As soon as you trust yourself, you will know how to live." - Johann Wolfgang von Goethe',
              '"To conquer fear is the beginning of wisdom." - Bertrand Russell',
              '"Striving for excellence motivates you; striving for perfection is demoralizing." - Harriet Braiker',
              '"Whatever you believe with feeling becomes your reality." - Brian Tracy',
              '"We are all in the gutter, but some of us are looking at the stars." - Oscar Wilde',
              '"Management is doing things right; leadership is doing the right things." - Peter Drucker',
              '"It is not enough to be busy. So are the ants. The question is: What are we busy about?" - Henry David Thoreau',
              '"Only he who can see the invisible can do the impossible." - Frank L. Gaines',
              '"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it." - Henry Ford',
              '"If you would be wealthy, think of saving as well as getting." - Benjamin Franklin',
              '"Be like a postage stamp, stick to one thing until you get there." - Josh Billings',
              '"Everyday, give yourself a good mental shampoo." - Dr. Sara Jordan',
              '"Live out of your imagination, not your history." - Stephen Covey',
              '"Life\'s Tragedy is that we get old too soon and wise too late." - Benjamin Franklin',
              '"If at first you don\'t succeed, try, try, again. Then quit. There\'s no use being a damn fool about it." - W.C.Fields.',
              '"If you are working on something exciting that you really care about, you don\'t have to be pushed. The vision pulls you." - Steve Jobs',
              '"He who enjoys doing and enjoys what he has done is happy." - Johann Wolfgang von Goethe',
              '"Opportunities multiply as they are seized." - Sun Tzu',
              '"The human mind treats a new idea the same way the body treats a strange protein; it rejects it." - P. B. Medawar',
              '"The difference between the impossible and the possible lies in a person\'s determination." - Tommy Lasorda',
              '"He who is not courageous enough to take risks will accomplish nothing in life." - Muhammad Ali',
              '"High achievement always takes place in the framework of high expectation." - Charles F. Kettering',
              '"There is only one thing that makes a dream impossible to achieve: the fear of failure." - Paulo Coelho',
              '"There is real magic in enthusiasm. It spells the difference between mediocrity and accomplishment." - Norman Vincent Peale',
              '"Doing your best is more important than being your best." - Shannon Miller',
              '"Sometimes it is not enough to do our best; we must do what is required." - Winston Churchill',
              '"Do not let what you cannot do interfere with what you can do." - John Wooden',
              '"A ship is safe in harbor, but that\'s not what ships are for." - William Shedd',
              '"When we can no longer change a situation, we are challenged to change ourselves." - Viktor Frankl',
              '"Believe that life is worth living and your belief will help create the fact." - William James',
              '"Minds are like parachutes. They only function when they are open." - James Dewar',
              '"Better to do something imperfectly than to do nothing flawlessly." - Dr. Robert Schuller',
              '"Get your ideas on paper and study them. Do not let them go to waste!" - Les Brown',
              '"If you hear a voice within you say \"you cannot paint,\" then by all means paint, and that voice will be silenced." - Vincent Van Gogh',
              '"Even if you\'re on the right track, you\'ll get run over if you just sit there." - Will Rogers',
              '"The greatest weapon against stress is our ability to choose one thought over another." - William James',
              '"Happiness is not something ready-made. It comes from your own actions." - Dalai Lama',
              '"The time is always right to do what is right. - Martin Luther King Jr.',
              '"Be who you are and say what you feel because those who mind don\'t matter and those who matter don\'t mind." - Dr Seuss',
              '"Happiness is not a station you arrive at, but a manner of travelling." - Margaret B. Runbeck',
              '"If you take responsibility for yourself you will develop a hunger to accomplish your dreams." - Les Brown',
              '"The important thing is not to stop questioning." - Albert Einstein',
              '"It is our choices...that show what we truly are, far more than our abilities." - J. K. Rowling.',
              '"There are no secrets to success. It is the result of preparation, hard work and learning from failure." - Colin L. Powell',
              '"The best is yet to be." - Robert Browning',
              '"The tragedy of life is not that it ends so soon, but that we wait so long to begin it." - W.M. Lewis',
              '"The most delightful surprise in life is to suddenly recognise your own worth." - Maxwell Maltz',
              '"We build too many walls and not enough bridges." - Isaac Newton',
              '"If your plan isn\'t working, adjust your plan. Never give up." - Matt Martin',
              '"Trust yourself. You know more than you think you do." - Benjamin Spock',
              '"There is no greater agony than bearing an untold story inside you." - Maya Angelou',
              '"Will you look back on life and say, I wish I had, or I\'m glad I did?" - Zig Ziglar',
              '"Always forgive your enemies; nothing annoys them so much." - Oscar Wilde',
              '"It does not matter how slowly you go as long as you do not stop." - Confucius',
              '"The human mind will not be confined to any limits." - Johann Wolfgang von Goethe',
              '"Go as far as you can see; when you get there you\'ll be able to see farther." - Thomas Carlyle']

pokearray=['arm.',
           'leg.',
           'nose, boop!',
           'neck.',
           'back.',
           'eye.',
           'ear.',
           'foot.',
           'chest.',
           'ass.',
           'forehead.',
           'crotch. What a pervert!',
           'knee.',
           'shoulder.',
           'mouth.',
           'ankle.'
          ]

kills=['a screw',
       ' a bow',
       'a magnet',
       'a nail file',
       'coasters',
       'deodorant',
       'headphones',
       'pants',
       'a chair',
       'a hanger',
       'an ipod',
       'an outlet',
       'lip gloss',
       'soap',
       'a hair brush',
       'a credit card',
       'a blanket',
       'chalk',
       'perfume',
       'a puddle',
       'a paint brush',
       'nail clippers',
       'twister™','a slipper',
       'a USB drive',
       'a pair of glasses',
       'a computer',
       'a cell phone',
       'a box',
       'some clothes',
       'a lamp shade',
       'a buckel',
       'eye linertable',
       'a washing machine',
       'a zipper',
       'teddies',
       'a door',
       'a bed',
       'video games',
       'socks',
       ' street lights',
       'a key chain',
       ' tooth picks',
       'an eraser',
       'a sketch pad',
       'a keyboard',
       'a sandal',
       'a piano',
       'a clay pot'
      ]

knifes=['butterfly knife',
        ' long sword',
        'dagger',
        'Boning Knife',
        'Bread Knife',
        'Butcher Knife',
        'Breaking Knife',
        'Chef\'s Knife',
        'Cimeter',
        'Cleaver'
       ]

sreason=['the FBI was after them',
         ' they were sad',
         ' gave a bad hand shake',
         ' forgot to flush',
         '"It\'s the  Best way to make sure I\'m not dead already."',
         '"They\'re waiting on me down below to start the party."',
         '"The cost of living rises, but death remains affordable."'
        ]

ureason=['they ate my oreos',
         'they stole their walmat gift card',
         'they said they were fat',
         'they told someone who their crush is',
         'The bartender put Clamato in their beer when they wanted tomato juice',
         'they were wearing a bulletproof vest, they still died'
        ]

slapitem=['20in dildo',
          'the Holy Bible',
          'pattle ',
          'large mouthed bass',
          'rubber glove',
          'pillow pet\u2122',
          'sandale',
          'belt',
          'small dog',
          'dish rag',
          'small automotive'
         ]

fights=['won!',
        'lost, boo!'
       ]

rps=['Rock!',
     'Paper!',
     'Scissors!'
    ]

BallArray = ["It is certain.",
             "It is decidedly so.",
             "Without a doubt.",
             "Yes - definitely.",
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

/*WelcomeArray=[' walks in with a big smile. Unfortunately, their pants are unzipped.',
              ' flies through the door, destroying the thriving weed farm. This is the third time this week...',
              ' joins the club. Time to party!',
              ', the manager of this establishment, walks in swiftly with their briefcase.',
              ' enters the building. Everyone, act natural. ',
              ' smashes through a window on a out-of-control hose. ',
              ' waltz into the room. Get it waltz, because ... oh forget it.',
              ' bursts thought the wall dressed as the Kool-aid man. "OH YEAH!!!"',
              ', you\'re late, get to work, slave.'
             ]
*/
FoodArray = ["a bowl of spaghetti",
             "some chicken strips",
             "some watermelon",
             "a yellow tail",
             "a loaded sweet potato",
             "a belgium waffle",
             "a roll","shrimp",
             "a s'more",
             "a chorizo",
             "a corndog",
             "a frisco melt",
             "a loaf of bread",
             "a balanced breakfast",
             "a tub of ice cream",
             "a fortune cookie",
             "a bowl of lo mein",
             "a ripe mango",
             "a bowl of ravioli",
             "an eggroll",
             "a bag of gummy bears",
             "a bag of stale cheetos",
             "a stack of pancakes",
             "Gramdma's cookies & pie\u2122",
             "a boston creme donut",
             "a wheel of cheddar cheese",
             "a bin of mozzarella sticks",
             "a platter of buffalo chicken",
             "a bowl of cereal"
            ]

TasteArray = ["tasted like dirt",
              "was quite dry",
              "was very spicy",
              "was freezer burnt",
              "reminded them of their mothers cooking",
              "was amazing, Gordon Ramsay would be proud",
              "tasted like chicken",
              "had gone bad",
              "was to hot to enjoy",
              "was poisoned",
              "wasn't the spaghetti I asked for",
              "tasted bland",
              "was mediocre",
              "was far too salty",
              "was a bit tart",
              "tasted rancid",
              "was full of snot. Zoo-Wee-Mama",
              "was pretty goo... AHHHHH IT BURNS HELP",
              "was uncooked",
              "was burnt",
              "was very greasy",
              "was covered in may-o"
             ]

/*
case 'mario':
                            setTimeout(function() { client.sendArray([{ m: "a", message: " ___________________▄▄▄▀▀▀▀▀▀▀▄" }]); }, 360);
                            setTimeout(function() { client.sendArray([{ m: "a", message: " _______________▄▀▀____▀▀���▀▄____█" }]); }, 900);
                            setTimeout(function() { client.sendArray([{ m: "a", message: " ___________▄▀▀__▀▀▀▀▀▀▄___▀▄___█" }]); }, 1200);
                            setTimeout(function() { client.sendArray([{ m: "a", message: " __________█▄▄▄▄▄▄_______▀▄__▀▄__█" }]); }, 1500);
                            setTimeout(function() { client.sendArray([{ m: "a", message: " _________█_________▀▄______█____█_█" }]); }, 2800);
                            setTimeout(function() { client.sendArray([{ m: "a", message: " ______▄█_____________▀▄_____▐___▐_▌" }]); }, 3100);
                            setTimeout(function() { client.sendArray([{ m: "a", message: " ______██_______________▀▄___▐_▄▀▀▀▄" }]); }, 3400);
                            setTimeout(function() { client.sendArray([{ m: "a", message: " ______█________██_______▌__▐▄▀______█" }]); }, 3700);
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
                            break;
                            */