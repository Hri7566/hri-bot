//! This file is incomplete
//* this file is for giving players a database to have consistent money (and maybe inventory in the future)

Economy = class {
    constructor (bot) {
        this.bot = bot;
        this.data = require('./db/economy.json');
    }

    save() {
        fs.writeFile('./db/economy.json', JSON.stringify(this.data));
    }

    giveMoney(_id, amount) {
        try {
            this.data[_id].bal += amount;
            this.save();
        } catch (e) {
            this.bot.chat("Could not give money! Check if user exists.");
        }
    }

    setMoney(_id, amount) {
        try {
            this.data[_id].bal = amount;
            this.save();
        } catch (e) {
            this.bot.chat("Could not set money! Check if user exists.");
        }
    }

    getMoney(_id) {
        try {
            return this.data[_id].bal;
        } catch (e) {
            return "Could not find user! Check if user exists.";
        }
    }

    startAccount(_id) {
        if (typeof(this.data[_id]) !== "object") {
            this.data[_id] = {
                bal: 100
            }
        }
    }
}

module.exports = (bot) => {
    return new Economy(bot);
}