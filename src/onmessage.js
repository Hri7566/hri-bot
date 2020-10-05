//* this file listens for chat messages

class onmessage {
    constructor (bot) {
        this.bot = bot;
        this.temparr = [];
        this.initListeners();
    }
    initListeners() {
        this.bot.client.on("a", msg => {
            msg.p.rank = this.bot.getRank(msg.p._id);
            msg.data = this.bot.cmode.data;
            msg.args = msg.a.split(" ");
            msg.input = n => msg.args.slice(n).join(" ");
            msg.cmd = msg.args[0].split(this.bot.prefix).slice(1).join(this.bot.prefix).toLowerCase();
            msg.argcat = msg.a.substring(msg.args[0].toLowerCase().length).trim();
            this.bot.time = msg.t;
            if (msg.a.includes("https://www.youtube.com/watch?v=dQw4w9WgXcQ")) {
                this.bot.chat("Rickrolling is SOOOO 2007.");
            }
            try {
                this.bot.cmds.forEach(commandobj => {
                    switch (typeof(commandobj.cmd)) {
                        case "string":
                            switch (msg.cmd) {
                                case commandobj.cmd:
                                    if (msg.p.rank.id >= commandobj.minrank) {
                                        if (msg.args.length - 1 < commandobj.minargs) {
                                            this.bot.chat(this.bot.getUsage(commandobj.cmd));
                                        } else {
                                            if (!(commandobj.secondfunc != null && this.bot.cmode.mode != "cmd")) {
                                                if (commandobj.highscore) {
                                                    if (!this.bot.highscores[commandobj.cmd]) {
                                                        this.bot.highscores[commandobj.cmd] = {
                                                            user: {_id: "", name:"Anonymous", color:"#777"}
                                                        }
                                                        this.bot.updatedb();
                                                    }
                                                }
                                                if (!msg.a.startsWith(this.bot.prefix)) return;
                                                commandobj.func(msg);
                                            } else {
                                                this.bot.chat("The bot is busy.");
                                            }
                                        }
                                    } else {
                                        if (msg.p.rank.name == "Banned") {
                                            this.bot.chat(this.bot.banmsg);
                                        } else {
                                            switch (this.bot.getRankName(commandobj.minrank)) {
                                                case "Owner":
                                                    this.bot.chat(`You must be the owner to use this command.`);
                                                    break;
                                                default:
                                                    this.bot.chat(`You must be ${this.bot.getRankName(commandobj.minrank)} or higher to use this command.`);
                                                    break;
                                            }
                                        }
                                    }
                                    break;
                            }
                            break;
                        case "object":
                            commandobj.cmd.forEach(cmdobj => {
                                switch (msg.cmd) {
                                    case cmdobj:
                                        if (msg.p.rank.id >= commandobj.minrank) {
                                            if (msg.args.length - 1 < commandobj.minargs) {
                                                this.bot.chat(this.bot.getUsage(commandobj.cmd[0]));
                                            } else {
                                                if (!(commandobj.secondfunc != null && this.bot.cmode.mode != "cmd")) {
                                                    if (commandobj.highscore) {
                                                        if (!this.bot.highscores[commandobj.cmd]) {
                                                            this.bot.highscores[commandobj.cmd] = {
                                                                user: {_id: "", name:"Anonymous", color:"#777"}
                                                            }
                                                            this.bot.updatedb();
                                                        }
                                                    }
                                                    if (!msg.a.startsWith(this.bot.prefix)) return;
                                                    commandobj.func(msg);
                                                } else {
                                                    this.bot.chat("The bot is busy.");
                                                }
                                            }
                                        } else {
                                            if (msg.p.rank.name == "Banned") {
                                                this.bot.chat(this.bot.banmsg);
                                            } else {
                                                switch (this.bot.getRankName(commandobj.minrank)) {
                                                    case "Owner":
                                                        this.bot.chat(`You must be the owner to use this command.`);
                                                        break;
                                                    default:
                                                        this.bot.chat(`You must be ${this.bot.getRankName(commandobj.minrank)} or higher to use this command.`);
                                                        break;
                                                }
                                            }
                                        }
                                        break;
                                }
                            });
                    }
                });
            } catch (err) {
                console.log(err);
                this.bot.chat("An error has occurred.");
            }
            if (this.bot.cmode.mode != "cmd" && !msg.a.startsWith(this.bot.prefix)) {
                if (this.bot.cmode.user._id == msg.p._id || this.bot.cmode.type == "all") this.bot.getCommandObj(this.bot.cmode.cmd).secondfunc(msg);
            }
        });
    }
}

module.exports = (bot) => {
    return new onmessage(bot);
}