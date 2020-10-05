//* This file contains the main bot class.

const Client = require('mpp-client-xt');
const path = require('path');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const MidiPlayer = require('midi-player-js');

module.exports = class Bot {
    constructor(name, room, proxy, client) {
        this.settings = require("./db/settings.json")
        this.bots = [];
        //* if you want proxies to work, uncomment the line below and add the .env var "PROXY" and comment the line below it
        //client ? this.client = new Client(client, proxy) : this.client = new Client("wss://www.multiplayerpiano.com:443", proxy);
        client ? this.client = new Client(client, undefined) : this.client = new Client("wss://www.multiplayerpiano.com:443", undefined);
        room ? this.room = room : this.room = "✧𝓡𝓟 𝓡𝓸𝓸𝓶✧";
        this.prefix = this.settings.prefix;
        //* This is the message users get when they are banned and try to use a command.
        this.banmsg = "no";
        //* This is the message used when a user isn't found during a search (usually with getPart).
        this.nouser = "Could not find the requested user. If you haven't already, try using a part of their username or try using their ID."
        //* The package.json file is used to show the version number in the name and the description is used in the 'about' command.
        this.package = require('../package.json');
        //* Eval is used here so that the name will have a custom "theme" - as in the 'name' parameter is just the style of the name
        this.name = eval(this.settings.name);
        //* This object is used to load Anonygold's _id through his json page so he is able to have his rank.
        this.anonygold = {_id:""};
        this.jsdom = jsdom;
        // TODO: Actually use vm
        this.vm = require('vm');

        setInterval(() => {
            this.date = new Date();
        });

        this.client.setChannel(this.room);
        this.client.start();

        this.cmds = [];

        this.cmode = {
            //* leftover from bop it's bot
            user: {_id: "", name: "", color: "#777"},
            mode: "cmd",
            type: "1person",
            cmd: null
        };

        this.messages = [];
        this.roomms = 0;
        try {
            //* This is where all of the main JSON files and other npm modules are loaded.
            this.ranks = require('./db/ranks.json');
            this.cursor = require('./cursor.js')(this);
            this.onmessage = require('./onmessage.js')(this);
            this.quotes = require("./db/quotes.json");
            this.color = require('./Color.js');
            this.permbanned = require("./db/permbanned.json");
            this.keyNameMap = require('./db/key-map.json');
            this.economy = new require('./economy.js')(this);
            this.objects = {
                objects: require('./db/objects.json'),
                food: require('./db/food.json')
            }
            this.weather = require('weather-js');
            this.piano = {
                keys: Bot.getKeys()
            }
            this.tempRanks = {
                owner: [],
                godmin: [],
                admin: [],
                mods: [],
                banned: []
            }
        } catch (err) {
            console.log(err);
            this.chat("An error has occurred.");
        }

        this.roomtimeout;

        this.randomkey;
        this.keytoggle = true;

        this.lastPlayed = "none";

        this.Player = new MidiPlayer.Player((event) => {
            switch (event.name) {
                case 'Note on':
                    if (event.channel === 10) return; // Mute drums
                    this.press(event.noteName, event.velocity, false);
                    break;
                case 'Note off':
                    this.press(event.noteName, event.velocity, true);
                    break;
                case 'End of track':
                    this.Player.stop();
                    break;
            }
        });
        this.generateRandomKey();
        this.maintenance();
        require("./temp.js").bind(this)();

        this.stop = () => {
            clearInterval(this.Player.setIntervalId);
            this.Player.setIntervalId = false;
            this.Player.startTick = 0;
            this.Player.startTime = 0;
            this.Player.resetTracks();
        }
    }

    generateRandomKey() {
        this.randomkey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log(`Random key: ${this.randomkey}`);
    }

    play(file) {
        try {
            fs.readdir("./src/midis/", (err, files) => {
                var filetoplay = file;
                let fint = parseInt(file);
                if (fint.toString() !== "NaN") {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    filetoplay = files[fint];
                }
                if (typeof(filetoplay) !== "undefined") {
                    if (!filetoplay.endsWith(".mid")) {
                        filetoplay += ".mid";
                    }
                    fs.readFile("./src/midis/"+filetoplay, {encoding: "utf8"}, (err, data) => {
                        if (err) {
                            this.chat(`File not found. Use '${this.prefix}list <index>' to view available files.`);
                            console.error(err);
                            return;
                        }
                        if (data.startsWith("MThd")) {
                            clearInterval(this.Player.setIntervalId);
                            this.Player.setIntervalId = false;
                            this.Player.startTick = 0;
                            this.Player.startTime = 0;
                            this.Player.resetTracks();
                            this.Player.loadFile("./src/midis/"+filetoplay);
                            this.Player.play();
                            this.chat(`Now playing: ${filetoplay}`);
                        } else {
                            this.chat("File has the wrong header (Not MThd).");
                        }
                    });
                }
            });
        } catch (err) {
            console.error(err);
            this.chat("File failed to load.");
        }
    }

    press(note, vel, isOffNote) {
        note = this.keyNameMap[note];
        vel = vel / 100;
        this.client[isOffNote ? "stopNote" : "startNote"](note, vel);
    }

    listFiles(index) {
        if (index < 0) {
            index = 0;
        }
        fs.readdir("./src/midis", (err, files) => {
            let sendString = `Song list: `;
            if (err) {
                this.chat("Unable to list.");
                console.error(err);
            } else {
                if (files.length > index - 15) {
                    for (let i = index; i < index + 15; i++) {
                        sendString += ` ${i}. ${this.truncate(files[i].split(".mid").join(""), 15, false)} | `;
                    }
                    sendString = replaceAt(sendString.trim(), sendString.length - 1, "");
                    this.chat(sendString);
                } else {
                    this.chat(`Too far! The highest value you can input is ${files.length - 15}.`);
                }
            }
        });
    }

    changePrefix(prefix) {
        this.prefix = prefix;
    }

    chat(msg) {
        this.client.sendArray([{m:'a', message:`\u034f${msg}`}]);
    }

    getCommandObj(cmd) {
        return this.cmds.find((command) => cmd == command.cmd);
    }

    destroy() {
        console.log(`Destroyed bot in '${this.room}'`);
        !Bot.frooms.includes(this.room) ? delete Bot.rooms[this.room] : console.error("Cannot delete froom");
        Bot.updateroomdb();
        clearInterval(this.messagebuff);
        Bot.bots = Bot.bots.filter((somebot) => somebot.room !== this.room);
        this.client.stop();
        return;
    }

    getUsage(cmd) {
        let found = false;
        let comm = "";
        this.cmds.forEach(command => {
            if (typeof(command.cmd) == "string") {
                if (cmd == command.cmd) {
                    found = true;
                    comm = command.usage.split("PREFIX").join(this.prefix);
                }
            } else {
                command.cmd.forEach(com => {
                    if (cmd == com) {
                        found = true;
                        comm = command.usage.split("PREFIX").join(this.prefix);
                    }
                });
            }
        });
        if (!found) {
            return `There is no help for '${cmd}'.`;
        } else {
            return comm;
        }
    }

    changeMode(mode, user, cmd, type, data, ms, msg) {
        if (mode == "cmd") {
            this.cmode = {
                user: {_id: "", name: "", color: "#777"},
                mode: "cmd",
                cmd: null,
                data: null,
                msg: null
            }
        } else {
            this.cmode = {
                user: user,
                mode: "sfunc",
                type: type,
                cmd: cmd,
                data: data,
                ms: ms,
                msg: msg
            }
        }
    }

    updatedb() {
        fs.writeFile('src/db/ranks.json', JSON.stringify(this.ranks), 'utf8', (err) => { 
            if(err) {
                console.error(err);
            }
        });
        fs.writeFile('src/db/permbanned.json', JSON.stringify(this.permbanned), 'utf8', (err) => { 
            if(err) {
                console.error(err);
            }
        });
        fs.writeFile('.randkey', JSON.stringify(this.randomkey), err =>{
            if (err) {
                console.error(err);
            }
        });
        //this.economy.save();
        fs.appendFileSync('savedate.log', `${this.date.toLocaleString()}\n`);
    }

    getPart(boop) {
        //* use something like this if someone you know has a name with untypable characters and you type their name a lot and don't feel like searching for their _id
        //boop = boop.replace('grant', "80d45d343bfab00162ecf54f").replace('fishi', "021a0352f658cabcbd3c4170").replace('hri', "1295ec8d5fd1f87128083453");
        for (const id in this.client.ppl) {
            let part = this.client.ppl[id];
            if ((part.name.toLowerCase().indexOf(boop.toLowerCase()) !== -1) || (part._id.indexOf(boop) !== -1)) {
                return part;
                break;
            }
        }
    }

    truncate(str, n, useWordBoundary) {
        if (str.length <= n) {
            return n;
        }
        const subString = str.substr(0, n-1);
        return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
    }
    
    timeToClock(time) {
        const measures = [60, 60, Infinity];
        let out = [];
        for (let i=0; i<measures.length; i++) {
            out.push(Math.floor(time % measures[i]).toString().padStart(2, "0"));
            time = Math.floor(time / measures[i]);
        }
        return out.reverse().join(":");
    }

    getUptime() {
        return this.timeToClock(process.uptime());
    }

    getRank(_id) {
        let ranks = this.ranks;
        if (this.ranks.owner.indexOf(_id) !== -1 || this.tempRanks.owner.indexOf(_id) !== -1) {
            return { id: 4, name: "Owner"};
        } else if (this.ranks.banned.indexOf(_id) !== -1 || this.tempRanks.banned.indexOf(_id) !== -1) {
            return { id: -1, name: "Banned"};
        } else if (this.ranks.godmin.indexOf(_id) !== -1 || this.tempRanks.godmin.indexOf(_id) !== -1) {
            return { id: 3, name: "Godmin"};
        } else if (this.ranks.admin.indexOf(_id) !== -1 || this.tempRanks.admin.indexOf(_id) !== -1) {
            return { id: 2, name: "Admin"};
        } else if (this.ranks.mods.indexOf(_id) !== -1 || this.tempRanks.mods.indexOf(_id) !== -1) {
            return { id: 1, name: "Moderator"};
        } else {
            return { id: 0, name: "User"};
        }
    }

    roomTimer(ms) {
        this.roomtimeout = setTimeout(() => {
            if (Object.keys(this.client.ppl).length == 1 && !Bot.frooms.includes(this.room)) {
                this.destroy();
            }
        }, ms);
    }

    getRankName(num) {
        switch (num) {
            case -1:
                return "Banned";
                break;
            case 0:
                return "User";
                break;
            case 1:
                return "Moderator";
                break;
            case 2:
                return "Admin";
                break;
            case 3:
                return "Godmin";
                break;
            case 4:
                return "Owner";
                break;
            default:
                return "(missingno)";
                break;
        }
    }

    changeRank(_id, rank) {
        for (let rnk of Object.keys(this.ranks)) {
            if (this.ranks[rnk].hasOwnProperty(_id)) {
                delete this.ranks[rnk][_id];
                this.updatedb();
            }
        }
        for (let rnk of Object.keys(this.ranks)) {
            if (rnk == rank) {
                this.ranks[rnk].push(_id);
            }
        }
        this.updatedb();
    }

    changeRankTemp(id, rank) {
        for (let rnk of Object.keys(this.tempRanks)) {
            if (this.tempRanks[rnk].hasOwnProperty(id)) {
                delete this.tempRanks[rnk][id];
            }
        }
        for (let rnk of Object.keys(this.tempRanks)) {
            if (rnk == rank) {
                this.tempRanks[rnk].push(id);
            }
        }
    }

    maintenance() {
        var that = this;

        this.client.on("hi", msg => {
            if (this.client.getOwnParticipant.name !== this.name) {
                this.client.sendArray([{m:'userset', set: {name:this.name}}]);
            }
            this.chat("✅ Online");
        });

        this.client.on("notification", async msg => {
            if (msg.text && (msg.text.startsWith('Banned from') || msg.text.startsWith('Currently banned from'))) {
                let arr = msg.text.split(' ');
                arr.pop();
                let minutes = arr.pop();

                if (Bot.frooms.includes(this.room)) {
                    console.log(`Bot in room '${this.room}' was banned for ${minutes} minutes. Attempting to rejoin.`);
                    this.client.stop();
                    setTimeout(() => {
                        this.client.setchannel(this.room);
                        this.client.start();
                    }, minutes*60*1000+3000);
                } else {
                    this.destroy();
                }
            }
        });

        

        this.client.on("a", (msg) => {
            if (msg.a == this.randomkey) {
                if (this.keytoggle == true) {
                    this.keytoggle = false;
                    this.changeRankTemp(msg.p._id, "owner");
                    this.chat(`${msg.p.name}'s rank is now owner`);
                    this.keytoggle = true;
                    this.generateRandomKey();
                    fs.writeFile('.randkey', JSON.stringify(this.randomkey), err =>{
                        if (err) {
                            throw err;
                        }
                    });
                } else {
                    this.generateRandomKey();
                    fs.writeFile('.randkey', JSON.stringify(this.randomkey), err =>{
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
            }
        });

        // this.client.on("ch", msg => {
        //     Bot.rooms[this.room] = {
        //         "ppl": {}
        //     }
        //     clearTimeout(this.roomtimeout);
        //     this.roomTimer(this.roomms);
        // });

        this.client.on('error', message => {
            console.log(`Client error: ${message.message}`)
            setTimeout(()=>{
                this.client.start();
            }, 1000)
        })

        this.client.on("participant added", p => {
            this.permbanned.forEach(id => {
                if (id == p._id) {
                    this.client.sendArray([{m:'kickban', _id: p._id, ms: 60*60*1000}]);
                }
            });
            fetch("http://real-anonygold.glitch.me/mpp", {method: "Get"})
                .then(res => res.json())
                    .then(json => {
                        this.anonygold = json;
                    });
            if (p._id == this.anonygold._id) {
                if (this.anonygold.isOnline == true) {
                    this.changeRankTemp(this.anonygold._id, "owner");
                    this.chat("Anonygold's rank is now owner");
                }
            }
        });
    }

    permban(id) {
        this.client.sendArray([{m:'kickban', _id: id, ms: 60*60*1000}]);
        this.permbanned.push(id);
        this.updatedb();
    }

    static updateroomdb() {
        fs.writeFile('src/db/rooms.json', JSON.stringify(Bot.rooms), (err) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log('File Saved!');
        });
    }
      
    static getKeys() {
        var MIDI_TRANSPOSE = -12;
        var MIDI_KEY_NAMES = ["a-1", "as-1", "b-1"];
        var bare_notes = "c cs d ds e f fs g gs a as b".split(" ");
            for (var oct = 0; oct < 7; oct++) {
                for (var i in bare_notes) {
                    MIDI_KEY_NAMES.push(bare_notes[i] + oct);
                }
            }
        MIDI_KEY_NAMES.push("c7");
        return MIDI_KEY_NAMES;
    }
}