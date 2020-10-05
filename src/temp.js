//* this file contains all of the commands (this style of export is from bop it)

const math = require('mathjs');

module.exports = function () {
    this.addcmd = async (cmd, usage, minargs, func, minrank, hidden, secondfunc, highscore) => {
        this.cmds.push({
            cmd: cmd,
            usage: usage,
            minargs: minargs,
            func: func,
            minrank: minrank,
            hidden: hidden,
            secondfunc: secondfunc,
            highscore: highscore
        });
    }

    this.disablecmd = (cmd) => {
        this.cmds.forEach(commandobj => {
            if (typeof(commandobj.cmd) == "string") {
                if (commandobj.cmd == cmd) {
                    commandobj.func = msg => {
                        this.chat("This command has been disabled.");
                    }
                }
            } else if (typeof(commandobj.cmd) == "object") {
                commandobj.cmd.forEach(cmdstr => {
                    if (cmd == cmdstr) {
                        commandobj.func = msg => {
                            this.chat("This command has been disabled.");
                        };
                    }
                });
            }
        });
    }

    this.addcmd(["help","h", "cmds", "commands"], `Usage: PREFIXhelp <cmd>`, 0, msg => {
        if (msg.args.length - 1 > 0) {
            this.chat(this.getUsage(msg.args[1]));
        } else {
            let tosend = `Commands:`;
            this.cmds.forEach((command) => {
                if (!command.hidden) {
                    if (msg.p.rank.id >= command.minrank) {
                        if (typeof(command.cmd) == "string") {
                            tosend += ` ${this.prefix}${command.cmd} | `;
                        } else {
                            tosend += ` ${this.prefix}${command.cmd[0]} |`;
                        }
                    }
                }
            });
            tosend = tosend.trim();
            tosend = replaceAt(tosend, tosend.length - 1, "");
            this.chat(tosend);
        }
    }, 0, false);

    this.addcmd(["about","a"], `Usage: PREFIXabout | These quotes are from Karl's bot.`, 0, msg => {
        this.chat(this.package.description);
    }, 0, false);

    this.addcmd("js", `Usage: PREFIXjs <eval>`, 1, msg => {
        if (!msg.argcat.includes("process")) {
            let i = msg.a.substring(msg.a.split(" ")[0].length + 1);
            if ((i.includes("process") == false) && (i.includes("stop") == false)) {
                try {
                    this.chat("Console: " + eval(i.toString()));
                } catch (e) {
                    this.chat(e + ".");
                }
            }
        } else {
            this.chat(`You can't use '${msg.argcat}' because it violates security.`);
        }
    }, 3, false);

    this.addcmd("id", `Usage: PREFIXid <user> | Shows a user's _id and color.`, 0, msg => {
        if (msg.args[1]) {
            let p = this.getPart(msg.argcat);
            if (p) {
                this.chat(`${p.name}'s _id: ${p._id} | ${p.name}'s color: ${this.color.getNearestColor(p.color)} [${p.color}]`);
            } else {
                this.chat(this.nouser);
            }
        } else {
            this.chat(`Your _id: ${msg.p._id} | Your color: ${this.color.getNearestColor(msg.p.color)} [${msg.p.color}]`);
        }
    }, 0, false);

    this.addcmd(["crown","c"], `Usage: PREFIXcrown | Grants ownership of the channel.`, 0, msg => {
        if (this.client.isOwner()) {
            this.client.sendArray([{m:'chown', id:msg.p.id}]);
            this.chat(`Giving ownership to ${msg.p.name}.`);
        } else {
            this.chat("no crown :(");
        }
    }, 2, false);

    this.addcmd(["quote","q"], `Usage: PREFIXquote <quote number>`, 0, msg => {
        if (msg.args[1]) {
            if (this.quotes[msg.args[1]]) {
                this.chat(this.quotes[msg.args[1]]);
            } else {
                this.chat("The quote you requested doesn't exist.");
            }
        } else {
            this.chat(this.quotes[Math.floor(Math.random()*this.quotes.length)]);
        }
    }, 0, false);

    this.addcmd(["weather","w"], `Usage: PREFIXweather <place>`, 1, msg => {
        let res = [];
        this.weather.find({search: msg.argcat.toLowerCase(), degreeType: 'F'}, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            if (!result[0]) {
                return this.chat("No such place.");
            }
            res = result;
            if (res[0].current.skytext.toLowerCase() == "rain") {
                res[0].current.skytext += "ing";
            }
            this.chat(`It is ${res[0].current.skytext.toLowerCase()} in ${res[0].location.name} and the temperature is ${res[0].current.temperature}\u00b0F. The 'feels like' temperature is ${res[0].current.feelslike}\u00b0F and the humidity is ${res[0].current.humidity}%. The wind speed is ${res[0].current.windspeed}.`);
        });
    }, 0, false);

    this.addcmd(["weatherc","wc"], `Usage: PREFIXweatherc <place>`, 1, msg => {
        let res = [];
        this.weather.find({search: msg.argcat.toLowerCase(), degreeType: 'C'}, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            if (!result[0]) {
                return this.chat("No such place.");
            }
            res = result;
            if (res[0].current.skytext.toLowerCase() == "rain") {
                res[0].current.skytext += "ing";
            }
            this.chat(`It is ${res[0].current.skytext.toLowerCase()} in ${res[0].location.name} and the temperature is ${res[0].current.temperature}\u00b0F. The 'feels like' temperature is ${res[0].current.feelslike}\u00b0F and the humidity is ${res[0].current.humidity}%. The wind speed is ${res[0].current.windspeed}.`);
        });
    }, 0, false);

    this.addcmd(["follow","f"], `Usage: PREFIXfollow <user> | The cursor will follow the user.`, 1, msg => {
        let p = this.getPart(msg.argcat);
        if (p) {
            this.cursor.load("off");
            this.cursor.cmode.func = function () {
                this.pos.x = p.x;
                this.pos.y = p.y;
            }
            this.chat(`Now following ${p.name}.`);
        } else {
            this.chat(this.nouser);
        }
    }, 0, false);

    this.addcmd(["followme","fme"], `Usage: PREFIXfollowme | The cursor will follow you.`, 0, msg => {
        let p = this.getPart(msg.p._id);
        if (p) {
            this.cursor.load("off");
            this.cursor.cmode.func = function () {
                this.pos.x = p.x;
                this.pos.y = p.y;
            }
            this.chat(`Now following ${p.name}.`);
        } else {
            this.chat(this.nouser);
        }
    }, 0, false);

    this.addcmd(["ballonstring","bos"], `Usage: PREFIXballonstring <user> | The cursor will follow the user using electrashave's BallOnString.js`, 1, msg => {
        let p = this.getPart(msg.argcat);
        if (p) {
            let pos2 = {x: 50, y: 50};
            let mass = 100;
            let gravity = 5;
            let friction = 4;
            let acc = {x: 0, y: 0};
            this.cursor.load("off");
            this.cursor.cmode.func = function () {
                pos2.x = p.x;
                pos2.y = p.y;
                acc.x = ((pos2.x-this.pos.x) - (friction*this.vel.x))/mass;
                acc.y = ((pos2.y-this.pos.y) - (friction*this.vel.y) + gravity)/mass;
                this.vel.x += acc.x;
                this.vel.y += acc.y;
                this.pos.x += this.vel.x;
                this.pos.y += this.vel.y;
            }
            this.chat(`Now following ${p.name}.`)
        } else {
            this.chat(this.nouser);
        }
    }, 0, false);

    this.addcmd(["ballonstringme","bosme"], `Usage: PREFIXballonstringme | The cursor will follow you using electrashave's BallOnString.js`, 0, msg => {
        let p = this.getPart(msg.p._id);
        if (p) {
            let pos2 = {x: 50, y: 50};
            let mass = 100;
            let gravity = 5;
            let friction = 4;
            let acc = {x: 0, y: 0};
            this.cursor.load("off");
            this.cursor.cmode.func = function () {
                pos2.x = p.x;
                pos2.y = p.y;
                acc.x = ((pos2.x-this.pos.x) - (friction*this.vel.x))/mass;
                acc.y = ((pos2.y-this.pos.y) - (friction*this.vel.y) + gravity)/mass;
                this.vel.x += acc.x;
                this.vel.y += acc.y;
                this.pos.x += this.vel.x;
                this.pos.y += this.vel.y;
            }
            this.chat(`Now following ${p.name}.`)
        } else {
            this.chat(this.nouser);
        }
    }, 0, false);

    this.addcmd("balloonstring", null, 0, msg => {
        this.chat("it's ball on string, not balloon string");
    }, 0, true);

    this.addcmd("balloonstringme", null, 0, msg => {
        this.chat("it's ball on string, not balloon string");
    }, 0, true);

    this.addcmd("string", `Usage PREFIXstring <eval>`, 1, msg => {
        try {
            this.chat(`Answer: ${math.evaluate(msg.argcat)}`);
        } catch (err) {
            if (err) {
                this.chat("Invalid usage.");
            }
        }
    }, 0, false);

    //* Disabled for various reasons (not working being one of them).
    // this.addcmd("room", `Usage: PREFIXroom <room> | Connects the bot to another room.`, 1, msg => {
    //     if (Bot.bots.find((bot) => bot.room == msg.args[1])) {
    //         this.chat(`The Bot is already connected in room ${msg.input(1)}.`);
    //         return;
    //     }
    //     Bot.rooms[msg.args[1]] = {
    //         "ppl": {}
    //     }
    //     Bot.updateroomdb();
    //     this.chat(`Connecting Bot to room ${msg.input(1)}`);
    //     Bot.startBot(msg.args[1]).then((a) => {
    //         if (a.connected) {
    //             a.data.client.on("hi", () => {
    //                 this.chat(`Connected Bot in room ${a.data.client.channel._id}.`);
    //             }) 
    //         } else {
    //             this.chat(`Failed to connect bot.`);
    //             console.error(a.err);
    //         }
    //     });
    // }, 2, false);

    this.addcmd("bonk", `Usage: PREFIXbonk <user> | hammer time`, 1, msg => {
        let p = this.getPart(msg.argcat);
        if (p) {
            this.chat(`🔨 ${msg.p.name} bonked ${p.name}!`);
        } else {
            this.chat(this.nouser);
        }
    }, 0, false);

    this.addcmd("kill", `Usage: PREFIXkill <user> | Shut up before I stab you!`, 0, msg => {
        suicide = () => {
            let rsuicide = [
                `${msg.p.name} shot themselves.`,
                `${msg.p.name} strangled themselves to sleep.`,
                `${msg.p.name} hung themselves.`,
                `${msg.p.name} jumped off a bridge.`,
                `${msg.p.name} drank the Kool-Aid.`,
                `${msg.p.name} used the grill in the living room.`,
                `${msg.p.name} took too many painkillers.`,
                `Following the ancient samurai ritual of Seppuku, ${msg.p.name} unsheathed their sword and plunged it into their abdomen.`,
                `${msg.p.name} slit their own neck.`,
                `${msg.p.name} stopped eating.`,
                `${msg.p.name} asked a police officer to shoot them,`,
                `${msg.p.name} detonated a bomb attatched to their genetalia.`,
                `${msg.p.name} jumped in front of a train.`,
                `${msg.p.name} crashed their car into someone else's house.`,
                `${msg.p.name} jumped out of a plane.`,
                `Following the ancient buddhist ritual of self-immolation, ${msg.p.name} set themselves on fire in an act of protest.`,
                `${msg.p.name} stuck a fork in an outlet.`,
                `${msg.p.name} jumped into the lion's cage at the zoo.`,
                `${msg.p.name} waded into an alligator infested river.`,
                `${msg.p.name} eliminated their own blood flow by ripping their own heart out.`
            ];
            this.chat(rsuicide[Math.floor(Math.random()*rsuicide.length)]);
        }
        if (msg.args[1]) {
            let p = this.getPart(msg.argcat);
            if (p) {
                if (msg.p.id == p.id) {
                    suicide();
                    return;
                }
                let rdeath = [
                    `${msg.p.name} hit ${p.name} with a car.`,
                    `${msg.p.name} slit ${p.name}'s neck.`,
                    `${msg.p.name} decapitated ${p.name}.`,
                    `${msg.p.name} set ${p.name} on fire.`,
                    `${msg.p.name} fed ${p.name} to the alligators.`,
                    `${msg.p.name} poisoned ${p.name}.`,
                    `${msg.p.name} left ${p.name} to die.`,
                    `${msg.p.name} threw a grenade at ${p.name}.`,
                    `${msg.p.name} stopped feeding ${p.name}.`,
                    `${msg.p.name} pushed ${p.name} off the plane.`,
                    `${msg.p.name} sliced ${p.name} in half.`,
                    `${msg.p.name} eliminated their mortal enemy ${p.name}.`,
                    `${msg.p.name} sunk ${p.name}'s ship and stole their booty.`,
                    `${msg.p.name} kidnapped ${p.name}, but they were left in the bag for too long.`,
                    `${msg.p.name} sent ${p.name} to the depths of hell just to rip their screaming soul back from the dead and do it again.`,
                    `${msg.p.name} crushed ${p.name} in an epic battle.`,
                    `${msg.p.name} launched a(n) ${this.objects.objects[Math.floor(this.objects.objects.length*Math.random())]} at ${p.name}'s head.`,
                    `${msg.p.name} cut ${p.name} in half with a chainsaw.`,
                    `${msg.p.name} ripped ${p.name}'s spine out.`,
                    `${msg.p.name} left ${p.name} in the freezer for too long.`,
                    `${msg.p.name} bonked ${p.name} in the head really hard.`,
                    `${msg.p.name} dropped a fridge on ${p.name}'s head.`,
                    `${msg.p.name} snuck some cyanide in ${p.name}'s drink while they weren't looking.`
                ];
                let rreas = [
                    `${p.name} stole their oreos.`,
                    `${p.name} shot first.`,
                    `${p.name} weren't very good roommates in college.`,
                    `${p.name} forgot to wear the right color hat on school shooting day.`,
                    `${p.name} walked into the wrong part of town.`,
                    `${p.name} didn't wash their hands after going to the bathroom.`,
                    `${p.name} woke up and it was all a dream.`,
                    `${p.name} changed the TV channel.`,
                    `Nobody cared about ${p.name} anyway.`,
                    `${msg.p.name} is dumb.`,
                    `${msg.p.name} doesn't regret their decision.`,
                    `Did you hear? ${p.name} is dead.`,
                    `${p.name} did not survive the attack.`,
                    `${msg.p.name} forgot to take their meds this morning.`,
                    `${msg.p.name} is off their rocker!`,
                    `${msg.p.name} was arrested by the cops.`,
                    `Check for ${msg.p.name} in the newspaper soon!`,
                    `${p.name} dies in endgame.`
                ]
                this.chat(`${rdeath[Math.floor(Math.random()*rdeath.length)]} ${rreas[Math.floor(Math.random()*rreas.length)]}`);
            } else {
                this.chat(this.nouser);
            }
        } else {
            suicide();
        }
    }, 0, false);

    this.addcmd("clonk", `Usage: PREFIXclonk <user> | Forcibly impact a blunt object into someone's head.`, 1, msg => {
        let p = this.getPart(msg.argcat);
        if (p) {
            let object = this.objects.objects[Math.floor(this.objects.objects.length*Math.random())];
            if (object.split(" ")[0].endsWith("s")) {
                this.chat(`🔨 ${msg.p.name} clonked ${p.name} with ${object}!`);
            } else {
                if (object.match(/^[aeiouAEIOU]/)) {
                    this.chat(`🔨 ${msg.p.name} clonked ${p.name} with an ${object}!`);
                } else {
                    this.chat(`🔨 ${msg.p.name} clonked ${p.name} with a ${object}!`);
                }
            }
        } else {
            this.chat(this.nouser);
        }
    }, 0, false);

    this.addcmd("cursor", `Usage: PREFIXcursor <mode> | Use without any arguments to list cursor modes.`, 0, msg => {
        if (msg.args.length - 1 > 0) {
            let found = false;
            this.cursor.modes.forEach(mode => {
                if (msg.argcat == mode.mode) {
                    found = true;
                }
            });
            if (found) {
                this.chat(`Cursor set to '${msg.argcat}'.`);
                this.cursor.load(msg.argcat);
            } else {
                this.chat(`Invalid cursor mode.`);
            }
        } else {
            let tosend = `Cursor modes:`;
            this.cursor.modes.forEach((mode) => {
                tosend += ` ${mode.mode} | `
            });
            tosend = tosend.trim();
            tosend = replaceAt(tosend, tosend.length - 1, "");
            this.chat(tosend);
        }
    }, 0, false);

    this.addcmd(["rank","r"], `Usage: PREFIXrank | Checks the rank of a user currently in the room.`, 0, msg => {
        if (msg.args[1]) {
            let p = this.getPart(msg.argcat);
            if (p) {
                this.chat(`${p.name}'s rank: ${this.getRank(p._id).name} | Rank id: ${this.getRank(p._id).id}`);
            } else {
                this.chat(this.nouser);
            }
        } else {
            this.chat(`Your rank: ${msg.p.rank.name} | Rank id: ${msg.p.rank.id}`);
        }
    }, 0, false);

    this.addcmd("uptime", `Usage: PREFIXuptime | Prints the total uptime`, 0, msg => {
        this.chat(this.getUptime());
    }, 0, true);

    this.addcmd("helpmewhattheheckisgoingon", `Usage: PREFIXhelpmewhatheheckisgoingon`, 0, msg => {
        this.chat("f i x e d m o m e n t");
    }, 0, true);

    this.addcmd(["russianroulette","rur"], `Usage: PREFIXrussianroulette`, 0, msg => {
        var math = Math.random();
        if (math < 0.167) {
            this.chat(msg.p.name + ", you lived.");
        } else if (math >= 0.167 && math < 0.333) {
            this.chat(msg.p.name + ", you lived.");
        } else if (math >= 0.5 && math < 0.667) {
            this.chat(msg.p.name + ", you lived.");
        } else if (math >= 0.667 && math < 0.833) {
            this.chat(msg.p.name + ", you lived.");
        } else {
            this.client.sendArray([{ m: "kickban", _id: msg.p._id, ms:60*60*1000 }]);
            this.client.sendArray([{m:'unban', _id: msg.p._id}]);
            this.chat(msg.p.name + " died playing Russian Roulette");
        }
    }, 0, false);
    
    this.addcmd("wave", `Usage: PREFIXwave | This command was made by BopItFreak.`, 0, msg => {
        let delay = Math.floor(Math.random() * 100);
        let k = this.piano.keys;

        function wave(i, bot) {
            let up = i == 0;
            let x = setInterval(() => {
                bot.client.startNote(k[Math.abs(i)], 10);
                if ((up && i == k.length - 1) || (!up && i == 0)) clearInterval(x);
                else i++;
            }, delay);
        }

        let aa = Math.round(Math.random());
        if (aa == 1) {
            for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
                setTimeout(() => {
                    wave(0, this)
                }, Math.floor(Math.random() * 500) * i)
            }
        } else {
            for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
                setTimeout(() => {
                    wave(-k.length + 1, this)
                }, Math.floor(Math.random() * 500) * i)
            }
        }
    }, 1, false);

    this.addcmd(["play","p"], `Usage: PREFIXplay <file>`, 1, msg => {
        this.play(msg.argcat);
        this.lastPlayed = msg.argcat;
    }, 0, false);

    this.addcmd(["stop","s"], `Usage: PREFIXstop`, 0, msg => {
        clearInterval(this.Player.setIntervalId);
        this.Player.setIntervalId = false;
        this.Player.startTick = 0;
        this.Player.startTime = 0;
        this.Player.resetTracks();
        // this.stop();
    }, 0, false);

    this.addcmd(["replay","rp"], `Usage: PREFIXreplay | Replay the last played track.`, 0, msg => {
        if (this.lastPlayed !== "none") {
            this.chat("Replaying last song...");
            this.play(this.lastPlayed);
        } else {
            this.chat("No song was played yet.");
        }
    }, 0, false);

    this.addcmd(["list","l"], `Usage: PREFIXlist | List the playable *.mid files.`, 0, msg => {
        if (msg.argcat) {
            this.listFiles(parseInt(msg.argcat));
        } else {
            this.listFiles(0);
        }
    }, 0, false);

    this.addcmd("kickban", `Usage: PREFIXkickban <minutes> <user>`, 2, msg => {
        let p = this.getPart(msg.args[2]);
        if (p) {
            this.client.sendArray([{m:'kickban', _id:p._id, ms:msg.args[1]*60*1000}]);
        } else {
            this.chat(this.nouser);
        }
    }, 2, false);

    this.addcmd("kickbanid", `Usage: PREFIXkickbanid <minutes> <id>`, 2, msg => {
        this.client.sendArray([{m:'kickban', _id:msg.args[2], ms:msg.args[1]*60*1000}]);
    }, 2, false);

    this.addcmd("thisdot", `Usage: PREFIXthisdot`, 0, msg => {
        this.chat("♫ 𝓽𝓱𝓲𝓼 𝓭𝓸𝓽 ♫ 𝓽𝓱𝓲𝓼 𝓭𝓸𝓽 ♫ 𝓽𝓱𝓲𝓼 𝓭𝓸𝓽 ♫ 𝓽𝓱𝓲𝓼 𝓭𝓸𝓽 ♫ 𝓽𝓱𝓲𝓼 𝓭𝓸𝓽 ♫");
    }, 0, true);

    this.addcmd("reverse", `Usage: PREFIXreverse <string> | Reverses the given string.`, 1, msg => {
        this.chat(`\u034f\u034f     `+(msg.argcat.split("").reverse().join("")));
    }, 0, false);

    this.addcmd("eat", `Usage: PREFIXeat <food> | Eat whatever you want. If you don't provide a food to eat, one will be generated for you.`, 0, msg => {
        if (!msg.args[1]) {
            this.chat(`${msg.p.name} ate ${this.objects.food[Math.floor(Math.random()*this.objects.food.length)].name.toLowerCase()}.`);
        } else {
            let p = this.getPart(msg.argcat);
            if (p) {
                this.chat(`${msg.p.name} cannibalized ${p.name}.`);
            } else {
                this.chat(`${msg.p.name} ate '${msg.argcat}'.`);
            }
        }
    }, 0, false);

    this.addcmd("ingredients", `Usage: PREFIXingredients <food> | Returns the ingredients of a pregenerated food.`, 1, msg => {
        let triggered = false;
        this.objects.food.forEach(food => {
            if (food.name.toLowerCase().includes(msg.argcat.toLowerCase())) {
                this.chat(`Ingredients of ${food.name}: ${food.ingredients}`);
                triggered = true;
            }
        });
        if (!triggered) {
            this.chat(`Couldn't find the ingredients of the specified food. Try to eat some random food to see what there is.`);
        }
    }, 0, false);

    this.addcmd("permban", `Usage: PREFIXpermban <id> | Permanantly ban a user.`, 1, msg => {
        this.permban(msg.args[1]);
    }, 3, true);
    
    this.addcmd("unkickban", `Usage: PREFIXunkickban <id> | Unbans a user from the channel.`, 1, msg => {
        this.client.sendArray([{m:'unban', _id: msg.args[1]}]);
    }, 2, false);

    this.addcmd("bg", `Usage: PREFIXbg <color> <color 2> | Changes the background hex colors. The crown is required for this command to work. One color is needed, but two will also work.`, 1, msg => {
        let reghex = /^#[0-9A-Fa-f]{6}$/;
        if (this.client.isOwner()) {
            if (msg.args[2]) {
                let color = msg.args[1];
                let color2 = msg.args[2];
                let test1 = reghex.test(color);
                let test2 = reghex.test(color2);
                if (test1 == true) {
                    if (test2 == true) {
                        this.client.sendArray([{m:'chset', set:{color:color, color2:color2}}]);
                    } else {
                        this.chat("The second color you entered isn't a valid hex color.");
                    }
                } else {
                    this.chat("The first color you entered isn't a valid hex color.");
                }
            } else {
                let color = msg.args[1];
                let test = reghex.test(color);
                if (test == true) {
                    this.client.sendArray([{m:'chset', set:{color:color}}]);
                } else {
                    this.chat("The color you entered isn't a valid hex color.");
                }
            }
        } else {
            this.chat("no crown :(");
        }
    }, 0, false);

    this.addcmd("ban", `Usage: PREFIXban <id> | Bans a user from using the bot. (NOT ban from the room)`, 1, msg => {
        this.changeRank(msg.args[1], "banned");
        this.chat("ID added to ban list. That user can no longer use any commands.");
    }, 1, false);

    this.addcmd("unban", `Usage: PREFIXunban <id> | Unbans a user from the bot. (NOT unban from the room)`, 1, msg => {
        if (this.ranks.banned.indexOf(msg.args[1]) !== -1) {
            this.ranks.banned.splice(this.ranks.banned.indexOf(msg.args[1]));
            this.chat("User unbanned.");
        } else {
            this.chat("That user isn't banned!");
        }
    }, 1, false);

    this.addcmd("8ball", `Usage: PREFIX8ball <polar question>`, 1, msg => {
        let answers = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes – definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Don’t count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful",
            "Reply hazy, try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again"
        ]
        this.chat(answers[Math.floor(Math.random()*answers.length)] + `, ${msg.p.name}.`);
    }, 0, false);

    this.addcmd("time", `Usage: PREFIXtime | Returns system time.`, 0, msg => {
        this.chat(this.date.toLocaleString());
    }, 0, false);

    this.addcmd(["object","obj"], `Usage: PREFIXobj | Generates a random object.`, 0, msg => {
        this.chat(this.objects.objects[Math.floor(Math.random()*this.objects.objects.length)]);
    }, 0, false);

    this.addcmd("setrank", `Usage: PREFIXsetrank <rank name> <user> | Sets the rank of a user.`, 2, msg => {
        let p = this.getPart(msg.args[2]);
        if (p) {
            try {
                if (msg.args[1] == "owner") {
                    this.chat("Changing ranks to owner requires a key.");
                    return;
                }
                this.changeRank(p._id, msg.args[1]);
                this.chat(`${p.name}'s rank is now ${msg.args[1]}`);
            } catch (err) {
                console.error(err);
                this.chat("There was an error with your request.");
            }
        } else {
            this.chat(this.nouser);
        }
    }, 3, false);

    this.addcmd("isperm", `Usage: PREFIXisperm <id>`, 0, msg => {
        let regperm = /[0-9A-f]{24}/;
        if (!msg.args[1]) {
            this.chat(`Total permbanned users: ${this.permbanned.length} | Use this command with an _id to see if they are permbanned.`);
        } else {
            let check = regperm.test(msg.args[1]);
            if (check) {
                if (this.permbanned.indexOf(msg.argcat) !== -1) {
                    this.chat("That user is permbanned.");
                } else {
                    this.chat("That user is NOT permbanned.");
                }
            } else {
                this.chat(`The value you entered is not a valid _id.`);
            }
        }
    }, 2, false);

    this.addcmd(["roominfo","rinfo"], `Usage: PREFIXroominfo <room>`, 1, msg => {
        let ch = "";
        let found = false;
        this.client.sendArray([{m: '+ls'}]);
        this.client.on('ls', ls => {
            ls.u.forEach(room => {
                if (room._id.toLowerCase().includes(msg.argcat.toLowerCase()) && found == false) {
                    ch = room;
                    console.log(room);
                    found = true;
                    this.client.sendArray([{m: '-ls'}]);
                    sendstring = `Channel _id: ${ch._id}`;
                    for (set in ch.settings) {
                        sendstring += ` | ${set}: ${ch.settings[set]}`;
                    }
                    this.chat(sendstring);
                }
            });
        });
    }, 0, false);

    this.addcmd("mbwg545rtv7horwkgxg4m", null, 0, msg => {this.chat("smartass");}, 0, true);
}