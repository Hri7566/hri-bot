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
    this.addcmd("help", `Usage: PREFIXhelp (cmd)`, 0, msg => {
        if (msg.args.length - 1 > 0) {
            this.chat(this.getUsage(msg.args[1]));
        } else {
            let tosend = `Commands:`;
            this.cmds.forEach((command) => {
                if (!command.hidden) {
                    if (msg.p.rank.id >= command.minrank) {
                        tosend += ` ${this.prefix}${command.cmd} | `;
                    }
                }
            });
            tosend = tosend.trim();
            tosend = replaceAt(tosend, tosend.length - 1, "");
            this.chat(tosend);
        }
    }, 0, false);

    this.addcmd("HELP", `it's case sensitive you idiot`, 0, msg => {
        this.chat(`it's case sensitive you idiot`);
    }, 0, true);

    this.addcmd("about", `Usage: PREFIXabout | These quotes are from Karl's bot.`, 0, msg => {
        this.chat(this.package.description);
    }, 0, false);

    this.addcmd("ping", `Usage: PREFIXping`, 0, msg => {
        this.chat("pooooonnnng");
    }, 0, true);

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

    this.addcmd("crown", `Usage: PREFIXcrown | Grants ownership of the channel.`, 0, msg => {
        if (this.client.isOwner()) {
            this.client.sendArray([{m:'chown', id:msg.p.id}]);
            this.chat(`Giving ownership to ${msg.p.name}.`);
        } else {
            this.chat("no crown :(");
        }
    }, 2, false);

    this.addcmd("follow", `Usage: PREFIXfollow <user> | The cursor will follow the user.`, 1, msg => {
        let p = this.getPart(msg.argcat);
        if (p) {
            this.cursor.load("off");
            this.cursor.cmode.func = function () {
                this.pos.x = p.x;
                this.pos.y = p.y;
            }
        } else {
            this.chat(this.nouser);
        }
    }, 0, false);

    this.addcmd("quote", `Usage: PREFIXquote <quote number>`, 0, msg => {
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

    this.addcmd("ballonstring", `Usage: PREFIXballonstring <user> | The cursor will follow the user using electrashave's BallOnString.js`, 1, msg => {
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

    this.addcmd("rank", `Usage: PREFIXrank | Checks the rank of a user currently in the room.`, 0, msg => {
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

    this.addcmd("test", `Usage: PREFIXtest`, 0, msg => {
        this.chat(process.uptime());
    }, 4, true); 

    this.addcmd("helpmewhattheheckisgoingon", `Usage: PREFIXhelpmewhatheheckisgoingon`, 0, msg => {
        this.chat("f i x e d m o m e n t");
    }, 0, true);

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

    this.addcmd("permban", `Usage: PREFIXpermban <id> | Permanantly ban a user.`, 1, msg => {
        this.permban(msg.args[1]);
    }, 3, true);
    
    this.addcmd("unban", `Usage: PREFIXunban <id> | Unban a user.`, 1, msg => {
        this.client.sendArray([{m:'unban', _id: msg.args[1]}]);
    }, 2, false);

    this.addcmd("bg", `Usage: PREFIXbg <color> <color 2> | Changes the background. The crown is required for this command to work. One color is needed, but two will also work.`, 1, msg => {
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

    this.addcmd("time", `Usage: PREFIXtime`, 0, msg => {
        this.chat(this.date.toLocaleString());
    }, 0, false);

    this.addcmd("setrank", `Usage: PREFIXsetrank <rank name> <user> | Sets the rank of a user.`, 2, msg => {
        let p = this.getPart(msg.args[2]);
        if (p) {
            try {
                this.changeRank(p._id, msg.args[1]);
                this.chat(`${p.name}'s rank is now ${msg.args[1]}`);
            } catch (err) {
                console.log(err);
                this.chat("There was an error with your request.");
            }
        } else {
            this.chat(this.nouser);
        }
    }, 3, false);
}