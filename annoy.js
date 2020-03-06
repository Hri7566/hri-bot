/*
 ______   _____     __      __   
|____  | | ____|   / /     / /   
    / /  | |__    / /_    / /_   
   / /   |___ \  | '_ \  | '_ \  
  / /     ___) | | (_) | | (_) | 
 /_/     |____/   \___/   \___/  
                                 
by Hri7566

This bot is a continuation of Karl Marx's MarxBot.
Discord: Hri7566#3409
GitHub: https://github.com/Hri7566/hri-bot
My Website: http://hri7566.tk
*/

const MPPClient = require('./client.js');
const mysql = require('mysql');

client = new MPPClient('ws://www.multiplayerpiano.com', undefined);

client.start();

function setName(string) {
  setTimeout(() => {
    client.sendArray([{ m: 'userset', set: { name: string } }]);
  }, 100);
}

var name = "hri's copycat";
var channel = "✧𝓡𝓟 𝓡𝓸𝓸𝓶✧";


client.on("hi", () => {
  console.log("Online");

  client.setChannel(channel);

  setName(name);
});

client.on("a", (msg) => {
  if (msg.p._id !== client.getOwnParticipant()._id) {
    client.sendArray([{m:'a', message:msg.a}]);
  }
});