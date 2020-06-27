process.title = 7566;
const Bot = require("./src/bot.js")

var bot = new Bot("7566");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
global.fs = require('fs');
fs = require('fs');
global.Bot = Bot;
Bot.rooms = require("./src/db/rooms.json");
Bot.bots = [];
Bot.frooms = [];
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

rl.on('line', function (line) {
    bot.client.sendArray([{m:'a', message:line}]);
});

function getChEvent(room) {
    return new Promise(function(resolve, reject) {
        let bot = new Bot("7566", room);
        Bot.bots.push(bot)
        bot.client.once('ch', () => {
            resolve(bot);
        });
    });
}

async function startBots() {
    for (let room in Bot.rooms) {
        let data = await getChEvent(room);
        console.log("Bot connected at " + data.room);
        await waitFor(2000 + data.client.serverTimeOffset);
    }
}
/*
startBots().then(() => {

});
*/

Bot.startBot = async function (room) {
    let returntype;
    let data = await getChEvent(room);
    console.log("Bot connected at " + data.room);
    await waitFor(2000 + data.client.serverTimeOffset);
    returntype = {
        "type": "resolve",
        "data": data
    };
    return new Promise(function (resolve, reject) {
        returntype.type == "resolve" ? resolve({
            "connected": true,
            "data": returntype.data
        }) : reject({
            "connected": false,
            "err": returntype.e
        });
    });
}

global.replaceAt = function (string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function getRooms() {
    return new Promise(function (resolve, reject) {
        Bot[0].once("ls", msg => {
            resolve(msg.u);
            Bot[0].sendArray([{
                m: "-ls"
            }]);
        });
        Bot[0].sendArray([{
            m: "+ls"
        }]);
    });
}

global.replaceAt = function (string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

global.request = require('request');

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (n) {
        return Array.from(Array(Math.ceil(this.length / n)), (_, i) => this.slice(i * n, i * n + n));
    }
});

bot.client.on('a', msg => {
    console.log(`[${msg.p._id}] ${msg.p.name}: ${msg.a}`);
    fs.appendFileSync('chat.log', `(${bot.getUptime()}) [${msg.p._id}] ${msg.p.name}: ${msg.a}\n`);
});