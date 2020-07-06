class Economy {
    constructor(bot) {
        this.bot = bot;
        this.db = require("./db/economy.json");
        this.config = require("./db/economyconfig.json");
    }
    updatedb() {
        fs.writeFile('src/db/economy.json', JSON.stringify(this.db, null, 2), (err) => {
            if(err) {
                throw err;
              }
        });
    }

    getEconomyUserBy_id(_id) {
        return Object.values(this.db.users).find((prsn) => prsn._id == _id);
    }
    AttemptToGetMoney(name, _id, type, rob_id) {
        if (!this.getEconomyUserBy_id(_id)) {
            //add to db
            this.db.users[_id] = {
                name: name,
                _id: _id,
                types: {},
                money: 0
            }
            this.updatedb();
        }
        //set timestamp
        if (!this.db.users[_id].types[type]) {
            this.db.users[_id].types[type] = {
                timestamp: Date.now() - 10000000000000
            }
            this.updatedb();
        }


        //add money to account
        var moneyz = this.canGetMoney(type, _id, rob_id);
        if (!moneyz) console.log("MONEYZBAD: " + moneyz)
        if (moneyz.canGetMoney) {
            if (moneyz.good == "good") {
                if (moneyz.rob && moneyz.rob_id) {
                    // if we're robbing someone
                    if (this.db.users[moneyz.rob_id]) {
                        if (this.db.users[moneyz.rob_id].money - moneyz.moneygot < 0) {
                            var moneygot2 = this.db.users[moneyz.rob_id].money;
                        } else {
                            var moneygot2 = this.db.users[rob_id].money - moneyz.moneygot;
                        }
                        //console.log("ROBMONEY2: " + moneygot2);
                        if (this.db.users[moneyz.rob_id].money - moneyz.moneygot < 0) {
                            this.db.users[rob_id].money = 0;
                        } else {
                            //console.log(this.db.users[rob_id].money)
                            this.db.users[rob_id].money -= moneygot2;
                            //console.log(this.db.users[rob_id].money)
                        }
                        moneyz.moneygot = moneygot2;
                        //console.log("MONEYZ: " + JSON.stringify(moneyz))
                    } else {
                        //user doesn't exist
                        moneyz.moneygot = 0;
                        //console.log("MONEYZ: " + JSON.stringify(moneyz))
                    }
                    this.db.users[_id].money += moneyz.moneygot;
                } else {
                    //just getting money
                    this.db.users[_id].money += moneyz.moneygot;
                }
                this.updatedb();
            } else {
                if (moneyz.rob && moneyz.rob_id) {
                    // if we're robbing someone but fail
                    if (this.db.users[_id].money - moneyz.moneygot < 0) {
                        var moneygot3 = this.db.users[_id].money;
                    } else {
                        var moneygot3 = this.db.users[_id].money - moneyz.moneygot;
                    }
                    //console.log("ROBFAILMONEY2: " + moneygot3);
                    if (moneygot3 < 0) {
                        this.db.users[_id].money = 0
                    } else {
                        this.db.users[_id].money -= moneyz.moneygot;
                    }
                    moneyz.moneygot = moneyz.moneygot;
                    //console.log("MONEYZ: " + JSON.stringify(moneyz))
                } else {
                    //just losing money
                    if (this.db.users[_id].money - moneyz.moneygot < 0) {
                        var moneygot4 = this.db.users[_id].money;
                    } else {
                        var moneygot4 = this.db.users[_id].money - moneyz.moneygot;
                    }
                    //console.log("LOSEMONEY2: " + moneygot4);
                    if (this.db.users[_id].money - moneyz.moneygot < 0) {
                        this.db.users[_id].money = 0;
                    } else {
                        this.db.users[_id].money -= moneygot4;
                        //console.log("MONEYZ: " + JSON.stringify(moneyz))
                    }
                    moneyz.moneygot = moneygot4;
                }
            }          
    }
    this.updatedb();
    return moneyz;
}
    canGetMoney(type, _id, rob_id) {
        if (Date.now() - this.getEconomyUserBy_id(_id).types[type].timestamp >= this.config.times[type]) {
            this.db.users[_id].types[type] = {
                timestamp: Date.now()
            }
            if (Math.round(Math.random() * 2) != 0) {
                return {
                    _id: _id,
                    money: this.db.users[_id].money,
                    moneygot: this.getMoneyByType(type),
                    good: "good",
                    canGetMoney: true,
                    rob: type == "rob",
                    rob_id: rob_id
                }
            } else {
                return {
                    _id: _id,
                    money: this.db.users[_id].money,
                    moneygot: this.getMoneyByType(type),
                    good: "bad",
                    canGetMoney: true,
                    rob: type == "rob",
                    rob_id: rob_id
                }
            }
        } else {
            return {
                _id: _id,
                money: this.db.users[_id].money,
                moneygot: null,
                canGetMoney: false,
                whenGetMoney: this.config.times[type] - (Date.now() - (this.getEconomyUserBy_id(_id).types[type].timestamp)),
                good: null,
                rob: type == "rob",
                rob_id: null
            }
            }
        }
    

    getMoneyByType(type) {
        return Math.round(Math.random() * this.config.amounts[type]);
    }
    getMoneyMessageByType(type, good) {
        return this.config.moneymessages[type][good][Math.floor(Math.random() * this.config.moneymessages[type][good].length)];
    }
    convertMS(milliseconds) {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
    }
    convertMSToString(when) {
        let tosend = "";
        when.day > 0 ? tosend += when.day + " Days, " : {};
        when.hour > 0 ? tosend += when.hour + " Hours, " : {};
        when.minute > 0 ? tosend += when.minute + " Minutes, " : {};
        when.seconds || when.seconds === 0 ? tosend += when.seconds + " Seconds, " : {};
        tosend = tosend.trim();
        tosend = replaceAt(tosend, tosend.length - 1, ".");
        return tosend;
    }
}

module.exports = (bot) => {
    return new Economy(bot)
}

/*
module.exports = function() {
    return {
    db: require("./db/economy.json"),
    config: require("./db/economyconfig.json"),
    updatedb: () => {
        fs.writeFile('./db/economy.json', JSON.stringify(this.Economy.db,null,2), function () { });
      },
    getEconomyUserBy_id: (_id)  => {
        return Object.values(this.Economy.db.users).find((prsn) => prsn._id == _id);
    },
    AttemptToGetMoney: (name,_id,type) => {
        if (!this.Economy.getEconomyUserBy_id(_id)) {
            //add to db
            this.Economy.db.users[_id] = {name: name, _id: _id, types: {}, money: 0}
            this.Economy.updatedb();
        }   
                //set timestamp
                if (!this.Economy.db.users[_id].types[type]) {
                    this.Economy.db.users[_id].types[type] = {
                        timestamp: Date.now() - 10000000000000
                    }
                    this.Economy.updatedb();
                }
            

            //add money to account
            let moneyz = this.Economy.canGetMoney(type,_id);
            if (moneyz.canGetMoney) {
            this.Economy.db.users[_id].money += moneyz.moneygot
            } 
            this.Economy.updatedb();
            return moneyz;
    },
    canGetMoney: (type, _id) => {
                if (Date.now() - this.Economy.getEconomyUserBy_id(_id).types[type].timestamp >= this.Economy.config.times[type]) { 
                    this.Economy.db.users[_id].types[type] = {
                        timestamp: Date.now()
                    }
                    return {_id: _id, money: this.Economy.db.users[_id].money, moneygot: this.Economy.getMoneyByType(type), canGetMoney: true}
                } else {
                    return {_id: _id, money: this.Economy.db.users[_id].money, canGetMoney: false, whenGetMoney:  this.Economy.config.times[type] - (Date.now()  - (this.Economy.getEconomyUserBy_id(_id).types[type].timestamp))}
                }      
    },
    getMoneyByType: (type) => {
                return Math.round(Math.random() * this.Economy.config.amounts[type]);
    },
    getMoneyMessageByType: (type) => {
                return this.Economy.config.moneymessages[type][Math.round(Math.random() * this.Economy.config.moneymessages[type].length -1)] 
    },
    convertMS: ( milliseconds ) => {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
    },
    convertMSToString: (when) => {
        let tosend = "";
        when.day > 0 ? tosend += when.day + " Days, " : {};
        when.hour > 0 ? tosend += when.hour + " Hours, " : {};
        when.minute > 0 ? tosend += when.minute + " Minutes, " : {};
        when.seconds || when.seconds === 0 ? tosend += when.seconds + " Seconds, " : {};
        tosend = tosend.trim();
        tosend = replaceAt(tosend, tosend.length - 1, ".");
        console.log(when)
        return tosend;
    }
    }
}*/