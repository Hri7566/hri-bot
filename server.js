/*
███████╗███████╗ ██████╗  ██████╗ 
╚════██║██╔════╝██╔════╝ ██╔════╝ 
    ██╔╝███████╗███████╗ ███████╗ 
   ██╔╝ ╚════██║██╔═══██╗██╔═══██╗
   ██║  ███████║╚██████╔╝╚██████╔╝
   ╚═╝  ╚══════╝ ╚═════╝  ╚═════╝ 
                                  
by Hri7566

A quick word: I'm putting this on GitHub and I'm probably going to rewrite the bot from scratch again.

This bot is a continuation of the original 7566 bot, which was a complete rewrite of Karl Marx's MarxBot.
It was written entirely by Hri7566 and some conventions taken from Karl, Bop It, Charsy, Nebula, and Lamp.
Sadly, Heroku and Glitch are no longer available to use with MPP without the use of proxies, which I have no clue how to use.
This bot was written for https://www.multiplayerpiano.com in node.js.
Updates are not being marked by date because I'm really lazy and Git seems to have stopped working some time ago.
As of writing this, this script is not available on GitHub. The original script that this script is based off of can be found on my github page.
If you have this script and I am still around, please let me know that you have it.
Usually, I'm on Discord every now and then. If I'm not there, then best of luck finding me.
List of people from MPP: Karma, Karl, Sindall, Lonely (Uranus), Nebula (Fennece), Caution, Wolfy, fishi (integer), DJDan, alex (madi), Shadow, Anonygold,
Lamp, Grant, Daisy, Lemon, Matsuno, abrilfelix, soup, large mound of feces, Bop It Freak, peegee (pgfamilyfriendly), and Anonymous
Discord: Hri7566#3409
My Website: http://hri7566.tk
*/

const MPP = require('mpp-client-xt');
const client = new MPP("wss://www.multiplayerpiano.com:443");
const fs = require("fs");
const color = require("./Color.js");
const math = require("mathjs");
const readline = require('readline');
const https = require('https');
function arrayRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}

/*
let url = {
    host:"hri7566.tk",
    path:"/mpp.json",
    port: 443
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    try {
        https.get(url, (res) => {
            let body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                try {
                    return JSON.parse(body);
                } catch (err) {
                    if (err) {
                        console.log(err);
                    }
                }
            });
        });
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
*/
replaceAt = function (string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

//var name = "๖ۣۜṂᾄʀẋ☭𝔅𝔬𝔱";
var name = "7566"
var ranksj = fs.readFileSync('ranks.json')
var ranks = JSON.parse(ranksj);
var package = JSON.parse(fs.readFileSync('package.json'));
var config = JSON.parse(fs.readFileSync('config.json'));
//var prefix = "/";
var prefix = "^";
var cmds = [];
var banmsg = "no, u is banned";
var bgmode = config.bgmode || static; //modes: static, black, player, rainbow
var lockdown = false;

client.start();
client.setChannel("✧𝓡𝓟 𝓡𝓸𝓸𝓶✧");
client.on("hi", () => {
    console.log("Connected");
    setTimeout(() => {client.sendArray([{m:'userset', set:{name:`${name} [${prefix}help] (v${package.version})`}}])}, 2000);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ranksj = JSON.stringify(ranks);
fs.writeFileSync('ranks.json', ranksj, (err) => {
    if (err) {
        console.log(err);
        return;
    }
});

function getRooms() {
    return new Promise(function (resolve, reject) {
        client.once("ls", msg => {
            resolve(msg.u);
            client.sendArray([{
                m: "-ls"
            }]);
        });
        client.sendArray([{
            m: "+ls"
        }]);
    });
}

function savedb() {
    ranksj = JSON.stringify(ranks);
    fs.writeFileSync('ranks.json', ranksj, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    ranksj = fs.readFileSync('ranks.json');
    ranks = JSON.parse(ranksj);
}

function chat(string) {
    client.sendArray([{m:'a', message:'\u034f'+string}]);
}

function warning(string) {
    client.sendArray([{m:'a', message:`[WARNING] \u034f \u034f ${string}`}]);
}

function kickban(id, ms) {
    client.sendArray([{ m: "kickban", _id: id, ms:ms }]);
}

function addcmd(cmd, usage, minargs, func, rank, hidden) {
    cmds.push({
        cmd: cmd,
        usage: usage,
        minargs: minargs,
        func: func,
        rank: rank,
        hidden: hidden
    });
}

function getUsage(cmd) {
    let found = cmds.find((command) => cmd == command.cmd);
    if (found) {
        return found.usage.replace("PREFIX", prefix)
    } else {
        return `There is no help for '${cmd}'.`;
    }
}

function setName(thisname) {
    name = thisname;
    client.sendArray([{m:'userset', set:{name:`${thisname} [${prefix}help] (v${package.version})`}}]);
}

function getRank(id) {
    if (ranks.owner.indexOf(id) !== -1) {
        return 2;
    } else if (ranks.admin.indexOf(id) !== -1) {
        return 1;
    } else if (ranks.banned.indexOf(id) !== -1) {
        return -1;
    } else {
        return 0;
    }
}

function rankToName(rank) {
    if (rank == 2) {
        return "Owner";
    } else if (rank == 1) {
        return "Admin";
    } else if (rank == -1) {
        return "Banned";
    } else {
        return "User";
    }
}

function getPart(boop) {
    for (const id in client.ppl) {
        let part = client.ppl[id];
        if ((part.name.toLowerCase().indexOf(boop.toLowerCase()) !== -1) || (part._id.indexOf(boop) !== -1)) {
            return part;
            break;
        }
    }
}

function HSLToRGB(h, s, l) {
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

addcmd("help", `Usage: PREFIXhelp <command>`, 0, msg => {
    if (msg.args.length - 1 > 0) {
        chat(getUsage(msg.args[1]));
    } else {
        let tosend = "Accessible Commands: ";
        cmds.forEach((command) => {
            if (!command.hidden) {
                if (msg.rank >= command.rank) {
                    tosend += ` ${prefix}${command.cmd} |`;
                }
            }
        });
        tosend = tosend.trim();
        chat(tosend);
    }
}, 0, false);

addcmd("id", `Usage: PREFIXid <user>`, 0, msg => {
    if (msg.args[1]) {
        let user = getPart(msg.argcat);
        chat(`${user.name}'s _id: ${user._id} | ${user.name}'s color: ${color.getNearestColor(user.color)} [${user.color}]`);
    } else {
        chat("Your _id: " + msg.p._id + " | Your color: " + color.getNearestColor(msg.p.color) + ` [${msg.p.color}]`);
    }
}, 0, false);

/*
addcmd("id", `Usage: PREFIXid <user>`, 0, msg => {
    if (msg.args[1]) {
        for (var id in getUserData()) {
            if (msg.args[1] == id._id || msg.args[1] == id.name) {
                chat(`${id.name}'s _id: ${id._id} | ${id.name}'s color: ${color.getNearestColor(id.color)} [${id.color}]`);
            }
        }
    } else {
        chat(`Your _id: ${msg.p._id} | Your color: ${color.getNearestColor(msg.p.color)} [${msg.p.color}]`);
    }
}, 0, false);
*/

var Ball = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes - definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
]

addcmd('getrooms', `Usage: PREFIXgetrooms`, 0, msg => {
    getRooms().then((result) => chat(result));
}, 2, true);

addcmd("8ball", `Usage: PREFIX8ball <polar question>`, 1, msg => {
    chat(`${Ball[Math.floor(Math.random()*Ball.length)]}, ${msg.p.name}.`);
}, 0, false);

addcmd("quote", `Quotes supplied by Karl. Usage: PREFIXquote <quote number>`, 0, msg => {
    if (!msg.args[1]) {
        chat(QuoteArray[Math.floor(Math.random()*QuoteArray.length)]);
    } else {
        if (msg.args[1] > QuoteArray.length) {
            chat(`That's not a valid quote. Total number of quotes: ${QuoteArray.length}`);
        } else {
            chat(`${QuoteArray[msg.args[1]]}`);
        }
    }
}, 0, false);

addcmd("about", `Usage: PREFIXabout`, 0, msg => {
    chat(package.description);
}, 0, false);

addcmd("hsl2rgb", `Usage: PREFIXhsl2rgb <hue> <saturation> <lightness>`, 3, msg => {
    chat(HSLToRGB(parseFloat(msg.args[1]), parseFloat(msg.args[2]), parseFloat(msg.args[3])));
}, 0, false);

addcmd("punch", `Usage: PREFIXpunch <player>`, 1, msg => {
    let p = getPart(msg.argcat);
    if (p) {
        if (p._id !== msg.p._id) {
            chat(`${msg.p.name} punched ${p.name}.`);
        } else {
            chat(`${msg.p.name} punched themselves.`);
        }
    } else {
        chat("Player not found. Try copying a part of their username.");
    }
}, 0, false);

addcmd("slap", `Usage: PREFIXslap <player> <object>`, 1, msg => {
    let p = getPart(msg.args[1]);
    if (p) {
        if (!msg.args[2]) {
            if (p._id !== msg.p._id) {
                chat(`${msg.p.name} slapped ${p.name}.`);
            } else {
                chat(`${msg.p.name} slapped themselves.`);
            }
        } else {
            if (p._id !== msg.p._id) {
                chat(`${msg.p.name} slapped ${p.name} with ${msg.args[2]}.`);
            } else {
                chat(`${msg.p.name} slapped themselves with ${msg.args[2]}.`);
            }
        }
    } else {
        chat("Player not found. Try copying a part of their username.");
    }
}, 0, false);

addcmd("name", `Usage: PREFIXname <name>`, 1, msg => {
    setName(msg.argcat);
    chat(`Name has been set to: ${msg.argcat}`);
}, 1, false);

addcmd("kick", `Usage: PREFIXkick <minutes> <player>`, 2, msg => {
    argcat2 = msg.a.substring(msg.args[0].length + msg.args[1].length + 2).trim();
    p = getPart(argcat2);
    if (p) {
        kickban(p._id, msg.args[1]*60*1000);
    } else {
        chat("Player not found. Try copying a part of their username.");
    }
}, 1, false);

addcmd("kill", `Usage: PREFIXkill <player>`, 0, msg => {
    
    function suicide() {
        this.msg = msg;
        chat(suicides[Math.floor(Math.random() * suicides.length)]);
    }
    if (msg.args[1]) {
        var suicides = [
            `In the ancient ritual of seppuku, ${msg.p.name} unsheaths their sword and runs it though their stomach.`,
            `${msg.p.name} committed toaster-bath.`,
            `${msg.p.name} shot themselves.`,
            `${msg.p.name} injected themselves with the coronavirus.`,
            `${msg.p.name} electrocuted themselves.`,
            `Due to a war in Saigon, ${msg.p.name} burned themselves to death like a Buddhist monk.`,
            `${msg.p.name} jumped off the roof.`,
            `${msg.p.name} took cyanide.`,
            `${msg.p.name} " took the easy way out.`,
            `${msg.p.name} " overdosed on drugs.`,
            `${msg.p.name} " left their car on in the garage.`,
            `Following the practices that started in Mesoamerica, ${msg.p.name} performed self-decapitation with an obsidian axe.`,
            `${msg.p.name} chained an anvil to their foot and drowned themselves.`,
            `${msg.p.name} splattered their own brains across the street.`,
            `${msg.p.name} jumped off of a bridge.`,
            `${msg.p.name} went skydiving without their parachute.`,
            `${msg.p.name} stuck nails in their own eyes and bled to death.`,
            `${msg.p.name} died while having surgery.`,
            `${msg.p.name} sliced themselves in half with a buzzsaw. Their reproductive organs will be donated to the nearest Chuck E. Cheese.`,
            `${msg.p.name} starved to death.`,
            `${msg.p.name} crashed their car into someone's living room while assuming a 69 sex position with their cousin while 27.5 times over the legal alcohol limit. A 22-inch dildo, anal beads, a bible, a crack pipe, and meth were found at the scene.`
        ]
        let p = getPart(msg.argcat);
        if (p) {
            if (p._id !== msg.p._id) {
                chat(`${msg.p.name} killed ${p.name}.`);
            } else {
                chat("Player not found. Try copying a part of their username.");
            }
        } else {
            chat();
        }
    } else {
        var suicides = [
            `In the ancient ritual of seppuku, ${msg.p.name} unsheaths their sword and runs it though their stomach.`,
            `${msg.p.name} committed toaster-bath.`,
            `${msg.p.name} shot themselves.`,
            `${msg.p.name} injected themselves with the coronavirus.`,
            `${msg.p.name} electrocuted themselves.`,
            `Due to a war in Saigon, ${msg.p.name} burned themselves to death like a Buddhist monk.`,
            `${msg.p.name} jumped off the roof.`,
            `${msg.p.name} took cyanide.`,
            `${msg.p.name} " took the easy way out.`,
            `${msg.p.name} " overdosed on drugs.`,
            `${msg.p.name} " left their car on in the garage.`,
            `Following the practices that started in Mesoamerica, ${msg.p.name} performed self-decapitation with an obsidian axe.`,
            `${msg.p.name} chained an anvil to their foot and drowned themselves.`,
            `${msg.p.name} splattered their own brains across the street.`,
            `${msg.p.name} jumped off of a bridge.`,
            `${msg.p.name} went skydiving without their parachute.`,
            `${msg.p.name} stuck nails in their own eyes and bled to death.`,
            `${msg.p.name} died while having surgery.`,
            `${msg.p.name} sliced themselves in half with a buzzsaw. Their reproductive organs will be donated to the nearest Chuck E. Cheese.`,
            `${msg.p.name} starved to death.`,
            `${msg.p.name} crashed their car into someone's living room while assuming a 69 sex position with their cousin while 27.5 times over the legal alcohol limit. A 22-inch dildo, anal beads, a bible, a crack pipe, and meth were found at the scene.`
        ]
        suicide();
    }
}, 0, false);



eatarray = [
    "an apple",
    "cranberry sauce",
    "chicken and pasta",
    "chilli and lemon pasta",
    "red onion and trragon salad",
    "potato and squash stew",
    "flaxseed and nutmeg loaf",
    "bacon and basil kebab",
    "celeriac and fish wontons",
    "chickpea and cardamom pie",
    "turkey and black pepper panini",
    "sweetcorn and egg vindaloo",
    "coriander and polenta buns",
    "amaretto and crab cake",
    "pear and kumquat soup",
    "pasta and guava salad",
    "pasta",
    "an orange",
    "grapes",
    "pork",
    "pork and pepper vindaloo",
    "tomato salad",
    "a tomato",
    "a golden apple",
    "cranberry salad",
    "raw mutton",
    "almonds",
    "trail mix",
    "chocolate chip cookies",
    "peanut butter cookies",
    "a sandwich",
    "a peanut butter and jelly sandwich",
    "pumpkin seed and date crumble",
    "raisins",
    "an onion",
    "a banana",
    "pomegranate seeds",
    "dubious food",
    "a beesechurger",
    "a cheeseburger",
    "a hamburger",
    "creamy heart soup",
    "pumpkin stew",
    "pumpkin pie",
    "veggie cream soup",
    "cream of mushroom soup",
    "cream of vegetable soup",
    "carrot stew",
    "vegetable risotto",
    "mushroom risotto",
    "curry pilaf",
    "mushroom rice balls",
    "veggie rice balls",
    "curry rice",
    "fried egg and rice",
    "mushroom omelet",
    "mushrooms",
    "strawberries",
    "an omelet",
    "salt",
    "robin eggs",
    "candy",
    "a Hershey bar",
    "celery",
    "a salty bag of dicks"
]

drinkarray = [
    "water",
    "tea",
    "coffee",
    "lemonade",
    "milk",
    "Coca-Cola",
    "Sprite",
    "a pumpkin spice latte",
    "cherry limeade",
    "hot chocolate",
    "apple juice",
    "an iced coffee",
    "butterbeer",
    "root beer",
    "birch beer",
    "cream soda",
    "ginger ale",
    "spruce beer",
    "pumpkin juice",
    "gillywater",
    "firewhisky",
    "gigglewater",
    "Elf wine",
    "rose water",
    "piss",
    "orange juice",
    "river water",
    "a shamrock shake",
    "hot dog water",
    "sugar water"
]

tastes = [
    "metallic.",
    "boring.",
    "smooth.",
    "clammy.",
    "unruly.",
    "foreign.",
    "vulgar.",
    "hot... IT BURNS! HELP!",
    "auspicious.",
    "suspicious.",
    "crazy.",
    "psychedelic.",
    "gnarly.",
    "tubular.",
    "verdant.",
    "honorable.",
    "greedy.",
    "complex.",
    "informal.",
    "judicious.",
    "abnoxious.",
    "salty.",
    "aggressive.",
    "sweet.",
    "misty.",
    "determined.",
    "tame.",
    "nonchalant.",
    "super."
]

addcmd("eat", `Usage: PREFIXeat <food (opt)>`, 0, msg => {
    if (msg.args[1]) {
        chat(`${msg.p.name} ate ${msg.argcat}. It tasted ${tastes[Math.floor(Math.random()*tastes.length)]}`);
    } else {
        chat(`${msg.p.name} ate ${eatarray[Math.floor(Math.random()*eatarray.length)]}. It tasted ${tastes[Math.floor(Math.random()*tastes.length)]}`);
    }
}, 0, false);

addcmd("drink", `Usage: PREFIXdrink <liquid (opt)>`, 0, msg => {
    if (msg.args[1]) {
        chat(`${msg.p.name} drank ${msg.argcat}. It tasted ${tastes[Math.floor(Math.random()*tastes.length)]}`);
    } else {
        chat(`${msg.p.name} drank ${drinkarray[Math.floor(Math.random()*drinkarray.length)]}. It tasted ${tastes[Math.floor(Math.random()*tastes.length)]}`);
    }
}, 0, false);

var rainbowtoggle = false;

addcmd("rainbowtoggle", `Usage: PREFIXrainbow`, 0, msg => {
    if (client.isOwner) {
        switch (rainbowtoggle) {
            case false:
                rainbowtoggle = true;
                bgmode = "rainbow";
                break;
            case true:
                rainbowtoggle = false;
                bgmode = "static";
                break;
        }
    }
}, 2, false);

addcmd("russianroulette", `Usage: PREFIXrussianroulette`, 0, msg => {
    var math = Math.random();
    if (math < 0.167) {
        chat(msg.p.name + ", you lived.");
    } else if (math >= 0.167 && math < 0.333) {
        chat(msg.p.name + ", you lived.");
    } else if (math >= 0.5 && math < 0.667) {
        chat(msg.p.name + ", you lived.");
    } else if (math >= 0.667 && math < 0.833) {
        chat(msg.p.name + ", you lived.");
    } else {
        client.sendArray([{ m: "kickban", _id: msg.p._id, ms:60*60*1000 }]);
        client.sendArray([{m:'unban', _id: msg.p._id}]);
        chat(msg.p.name + " died playing Russian Roulette");
    }
}, 0, false);

let reghex = /^#[0-9A-Fa-f]{6}$/;

addcmd("bg", `Usage: PREFIXbg <color> <color2 (opt)>`, 1, msg => {
    if (client.isOwner()) {
        if (msg.args[2]) {
            let color = msg.args[1];
            let color2 = msg.args[2];
            let test1 = reghex.test(color);
            let test2 = reghex.test(color2);
            if (test1 == true) {
                if (test2 == true) {
                    client.sendArray([{m:'chset', set:{color:color, color2:color2}}]);
                } else {
                    chat("The second color you entered isn't a valid hex color.");
                }
            } else {
                chat("The first color you entered isn't a valid hex color.");
            }
        } else {
            let color = msg.args[1];
            let test = reghex.test(color);
            if (test == true) {
                client.sendArray([{m:'chset', set:{color:color}}]);
            } else {
                chat("The color you entered isn't a valid hex color.");
            }
        }
    } else {
        chat('The crown is needed to change the background color.');
    }
}, 1, false);

addcmd("string", `Usage: PREFIXstring <string to evaluate>`, 1, msg => {
    try {
        chat(`Answer: ${math.evaluate(msg.argcat)}`);
    } catch (err) {
        if (err) {
            chat("Invalid usage.");
        }
    }
}, 0, false);

addcmd("coinflip", `Usage: PREFIXcoinflip`, 0, msg => {
    let r = Math.floor(Math.random() * 2) == 0 ? 'heads' : 'tails';
    chat(`The coin landed on ${r}.`);
}, 0, false);

addcmd("secret", `Usage: PREFIXsecret`, 0, msg => {
    chat('you found the secret :P');
}, 0, true);

addcmd("js", `Usage: PREFIXjs <code>`, 0, msg => {
    if (!msg.argcat.includes("process")) {
        try {
            chat("Console: " + eval(msg.argcat.toString()));
        } catch (e) {
            chat(e + ".");
        }
    } else {
        chat(`You can't use '${msg.argcat}' because it violates security.`);
    }
}, 2, false);

addcmd("crown", `Usage: PREFIXcrown`, 0, msg => {
    if (client.isOwner()) {
        client.sendArray([{ m: "chown", id: msg.p.id }]);
        chat(`Giving ownership to ${msg.p.name}`);
    } else {
        chat("no crown :(");
    }
}, 1, false);

addcmd("prefix", `Usage: PREFIXprefix <new prefix>`, 1, msg => {
    prefix = msg.args[1];
    setTimeout(() => {setName(name)}, 2000);
    chat(`The prefix is now '${prefix}'.`);
}, 1, false);

addcmd("rank", `Usage: PREFIXrank <user>`, 0, msg => {
    if (msg.args[1]) {
        let user = getPart(msg.args[1]);
        if (user) {
            chat(`${user.name}'s rank: ${rankToName(getRank(user._id))}`);
        }
    } else {
        chat(`Your rank: ${rankToName(msg.rank)}`);
    }
}, 0, false);

addcmd("setrank", `Usage; PREFIXsetrank <user> <rank>`, 2, msg => {
    let user = getPart(msg.args[1]);
    let newRank = parseInt(msg.args[2]);
    if (newRank <= msg.rank) {
        if (msg.rank !== 0) {
            if (newRank == 1) {
                if (ranks.admin.indexOf(user._id) !== -1) {
                    ranks.admin.splice(ranks.admin.indexOf(user._id));
                }
                if (ranks.owner.indexOf(user._id) !== -1) {
                    ranks.owner.splice(ranks.owner.indexOf(user._id));
                }
                ranks.admin.push(user._id);
            } else if (newRank == 0) {
                if (ranks.admin.indexOf(user._id) !== -1) {
                    ranks.admin.splice(ranks.admin.indexOf(user._id));
                }
                if (ranks.owner.indexOf(user._id) !== -1) {
                    ranks.owner.splice(ranks.owner.indexOf(user._id));
                }
            } else if (newRank == 2) {
                if (ranks.admin.indexOf(user._id) !== -1) {
                    ranks.admin.splice(ranks.admin.indexOf(user._id));
                }
                if (ranks.owner.indexOf(user._id) !== -1) {
                    ranks.owner.splice(ranks.admin.indexOf(user._id));
                }
                ranks.owner.push(user._id);
            } else {
                return chat("That's not a rank.");
            }
            chat(`${user.name}'s rank has been set to '${rankToName(newRank)}'.`);
            savedb();
        } else {
            chat("You can't give someone a higher rank than your current rank.");
        }
    } else {
        chat(`You can't set ${user.name}'s rank that high.`);
    }
}, 1, false);

addcmd('rockpaperscissors', `Usage: PREFIXrockpaperscissors <move>`, 1, msg => {
    move = msg.args[1].toLowerCase();
    movearray = ["rock","paper","scissors"]
    cpu = movearray[Math.floor(Math.random()*movearray.length)];
    if (movearray.indexOf(msg.argcat) == -1) return chat("That's not a move! List of legal moves: rock, paper, scissors");
    chat(`${msg.p.name}: ${move} | CPU: ${cpu}`);
    switch (move) {
        case "rock":
            switch (cpu) {
                case "rock":
                    chat("It was a tie!");
                    break;
                case "paper":
                    chat("The CPU won!");
                    break;
                case "scissors":
                    chat(msg.p.name + " won!");
                    break;
            }
            break;
        case "paper":
            switch (cpu) {
                case "paper":
                    chat("It was a tie!");
                    break;
                case "scissors":
                    chat("The CPU won!");
                    break;
                case "rock":
                    chat(msg.p.name + " won!");
                    break;
            }
            break;
        case "scissors":
            switch (cpu) {
                case "scissors":
                    chat("It was a tie!");
                    break;
                case "rock":
                    chat("The CPU won!");
                    break;
                case "paper":
                    chat(msg.p.name + " won!");
                    break;
            }
            break;
    }
}, 0, false);

addcmd('cursor', `Usage: PREFIXcursor <mode>`, 1, msg => {
    if (msg.args[1] == "follow") {
        if (msg.args[2]) {
            argcat2 = msg.a.substring(msg.args[0].length + msg.args[1].length + 2).trim();
            let p = getPart(argcat2);
            if (p) {
                cursor.follower = p._id;
                cursor.mode = "follow";
            } else {
                chat("Player not found. Try copying a part of their username.");
            }
        } else {
            chat("Specify a player to follow.");
        }
    } else {
        switchCursor(msg.argcat);
    }
}, 0, false);

addcmd('lockdown', `Usage: PREFIXlockdown`, 0, msg => {
    if (lockdown == true) {
        lockdown = false;
        warning(`Lockdown aborted. Resuming conventional procedure.`);
    } else {
        lockdown = true;
        warning(`Lockdown initiated. No commands can be accessed.`);
    }
}, 1, false);

addcmd('gay', `Usage: PREFIXgay`, 0, msg => {chat( msg.p._id +' <- dickhead')}, 0, true);

var h = 0;
var s = 1;
var l = .3;

var bgint = setInterval(() => {
    if (bgmode == "rainbow") {
        h += .001;
        if (h >= 1) {
            h = 0;
        }
        hsl = HSLToRGB(h, s, l);
        if (client.isOwner) {
            client.sendArray([{m:'chset', set:{color:rgbToHex(hsl[0]-64,hsl[1]-64,hsl[2]-64),color2:rgbToHex(hsl[0], hsl[1], hsl[2])}}]);
        }
    } else if (bgmode == "black") {
        if (client.isOwner()) {
            if (client.channel.settings.color !== "#000000") {
                client.sendArray([{m:'chset', set:{color:"#000000"}}]);
            }
        }
    }
}, 500);

client.on("a", msg => {
    console.log(`[${msg.p._id}] ${msg.p.name}: ${msg.a}`);
    fs.appendFileSync('chat.log', `[${msg.p._id}] ${msg.p.name}: ${msg.a}\n`, err => { if (err) {return}});
    msg.rank = getRank(msg.p._id);
    msg.args = msg.a.split(" ");
    msg.cmd = msg.args[0].split(prefix).slice(1).join(prefix);
    msg.argcat = msg.a.substring(msg.args[0].length).trim();
    
    if (bgmode == "player") {
        var prevColor = "";
        if (client.isOwner) {
            prevColor = client.channel.settings.color;
            client.sendArray([{m:'chset', set:{color:msg.p.color, color2:prevColor}}]);
        }
    }
    cmds.forEach((cmdobj) => {
        switch (msg.cmd) {
            case cmdobj.cmd.toLowerCase():
                if (lockdown == true && !(msg.rank >= 1)) {
                    
                } else {
                    try {
                        if (msg.rank >= cmdobj.rank) {
                            if (msg.args.length - 1 < cmdobj.minargs) {
                                chat(getUsage(cmdobj.cmd));
                            } else {
                                if (!msg.a.startsWith(prefix)) return;
                                cmdobj.func(msg);
                            }
                        } else {
                            if (msg.rank == -1) {
                                chat(banmsg);
                            } else {
                                switch (rankToName(cmdobj.rank)) {
                                    case "Owner":
                                        chat("This command is owner-only.");
                                        break;
                                    default:
                                        chat(`You must be ${rankToName(cmdobj.rank).toLowerCase()} to use this command.`);
                                        break;
                                }
                            }
                        }
                    } catch (err) {
                        if (err) {
                            chat("An error has occurred. Whatever you just did, don't do it again.");
                            console.log(err);
                        }
                    }
                }
                break;
        }
    });
});

var cursor = {
    pos: {x: 0, y: 0},
    vel: {x:.1, y: .1},
    mode: "vsine",
    g: -.05,
    a: 1,
    follower: ""
};

var cursorsend = setInterval(() => {
    if (cursor.mode !== "off") {
        client.sendArray([{m:'m', x:cursor.pos.x, y:cursor.pos.y}]);
    }
}, 25);

function switchCursor(mode) {
    switch (mode) {
        case "dvd":
            cursor.pos.x = Math.random() * 100;
            cursor.pos.y = Math.random() * 100;
            cursor.vel = {
                x:.1, y: .18
            },
            cursor.mode = "dvd";
            break;
        case "sine":
            cursor.pos.x = 0;
            cursor.pos.y = 50;
            cursor.vel = {
                x:.05, y:0
            },
            cursor.mode = "sine";
            break;
        case "vsine":
            cursor.pos.x = 50;
            cursor.pos.y = 0;
            cursor.vel = {
                x:0, y:.05
            };
            cursor.mode = "vsine";
            break;
        case "off":
            cursor.pos.x = -500;
            cursor.pos.y = -500;
            cursor.mode = "off";
            break;
        case "list":
            chat(`List of cursor modes: off | dvd | sine | vsine`);
            break;
        case "follow":
            if (getPart(cursor.follower)) {
                cursor.pos.x = getPart(cursor.follower).x;
                cursor.pos.y = getPart(cursor.follower).y;
            }
            break;
        default:
            chat("Invalid cursor. Defaulting to DVD.");
            cursor.pos.x = Math.random() * 100;
            cursor.pos.y = Math.random() * 100;
            cursor.vel = {
                x:.1, y: .18
            },
            cursor.mode = "dvd";
            break;
    }
}

switchCursor(cursor.mode);
var cursorupdate = setInterval(() => {
    switch (cursor.mode) {
        case "dvd":
            if (cursor.pos.x > 100 || cursor.pos.x < 0) {
                cursor.vel.x = -cursor.vel.x;
            }
            if (cursor.pos.y > 100 || cursor.pos.y < 0) {
                cursor.vel.y = -cursor.vel.y;
            }
            cursor.pos.x += cursor.vel.x;
            cursor.pos.y += cursor.vel.y;
            break;
        case "sine":
            if (cursor.pos.x > 100 || cursor.pos.x < 0) {
                cursor.vel.x = -cursor.vel.x;
            }
            cursor.pos.x += cursor.vel.x;
            cursor.pos.y = (Math.sin(cursor.pos.x/2) * 10) + 50;
            break;
        case "vsine":
            if (cursor.pos.y > 100 || cursor.pos.y < 0) {
                cursor.vel.y = -cursor.vel.y;
            }
            cursor.pos.x = (Math.sin(cursor.pos.y/2) * 5) + 50;
            cursor.pos.y += cursor.vel.y;
            break;
        case "off":
            cursor.pos.y = 150;
            cursor.pos.x = 150;
            break;
        case "follow":
            if (getPart(cursor.follower)) {
                cursor.pos.x = getPart(cursor.follower).x;
                cursor.pos.y = getPart(cursor.follower).y;
            } else {
                cursor.mode = "off";
            }
            break;
        default:
            cursor.pos.x = -50;
            cursor.pos.y = -50;
            break;
    }
}, 8.33);

rl.prompt(true);

rl.on('line', function (line) {
    if (line[0] == "^" && line.length > 1) {
        var cmd = line.match(/[a-z]+\b/)[0];
        var argcat = line.substr(cmd.length+2, line.length);
        client.sendArray([{m:'a', message:`^${cmd} ${argcat}`}]);
    } else {
        client.sendArray([{m:'a', message:`${line}`}]);
        rl.prompt(true);
    }
});

var QuoteArray = JSON.parse(fs.readFileSync("quotes.json"));

var cusswords = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];

client.on('a', msg => {
    if (client.channel.settings["no cussing"] == true) {

        for (word in cusswords) {
            if (msg.a.includes(word)) {
                if (msg.p._id !== client.getOwnParticipant()._id) {
                    client.sendArray([{m:'kickban', _id: msg.p._id, ms: 60*60*1000}]);
                }
            }
        }
        if (cusswords.indexOf(msg.a) !== -1) {
            client.sendArray([{m:'kickban', _id: msg.p._id, ms: 60*60*1000}]);
        }
    }
});