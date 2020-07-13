class CursorHandler {
    constructor(bot) {
        this.bot = bot;
        this.toggle = true;
        this.cmode = {
            pos: {x: 0, y: 0},
            vel: {x: 0, y: 0},
            a: 0,
            func: function(){}
        };
        this.modes = [];
        this.addmode = function(mode, defaults, func) {
            this.modes.push({
                mode: mode,
                defaults: defaults,
                func: func
            });
        }
        
        this.load = function (mode) {
            if (this.update) {
                clearInterval(this.update);
            }
            this.cmode = {
                pos: {x: 0, y: 0},
                vel: {x: 0, y: 0},
                a: 0,
                func: function(){}
            };
            if (mode) {
                this.modes.forEach(md => {
                    if (md.mode == mode) {
                        this.cmode.mode = md.mode;
                        this.cmode.func = md.func,
                        this.cmode.pos = md.defaults.pos,
                        this.cmode.vel = md.defaults.vel
                    }
                });
            }
            this.update = setInterval(() => {
                if (this.cmode.func) {
                    this.cmode.func();
                }
                if (this.toggle == true) {
                    this.bot.client.sendArray([{m:'m', x: this.cmode.pos.x, y: this.cmode.pos.y}]);
                }
            }, 25);
        }

        this.addmode("off", {
            pos: {x: -50, y: -50},
            vel: {x: 0, y: 0}
        }, function () {});

        this.addmode("dvd", {
            pos: {x:Math.random()*100, y: Math.random()*100},
            vel: {x: 2/5, y: 2/7}
        }, function () {
            if (this.pos.x < 0 || this.pos.x > 100) this.vel.x = -this.vel.x;
            if (this.pos.y < 0 || this.pos.y > 100) this.vel.y = -this.vel.y;
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        });

        this.addmode("vsine", {
            pos: {x: 50, y: 50},
            vel: {x: 0, y: 1/8}
        }, function () {
            this.pos.y += this.vel.y;
            this.pos.x = 5 * Math.sin(this.pos.y / 2) + 50;
            if (this.pos.y > 100 || this.pos.y < 0) {
                this.vel.y = -this.vel.y;
            }
        });

        this.addmode("sine", {
            pos: {x: 50, y: 50},
            vel: {x: 1/8, y: 0}
        }, function () {
            this.pos.x += this.vel.x;
            this.pos.y = 5 * Math.sin(this.pos.x / 2) + 50;
            if (this.pos.x > 100 || this.pos.x < 0) {
                this.vel.x = -this.vel.x;
            }
        });

        this.addmode("tan", {
            pos: {x: 50, y: 50},
            vel: {x: 1/8, y: 0}
        }, function () {
            this.pos.x += this.vel.x;
            this.pos.y = 5 * Math.tan(this.pos.x / 2) + 50;
            if (this.pos.x > 100 || this.pos.x < 0) {
                this.vel.x = -this.vel.x;
            }
        });

        this.addmode("vtan", {
            pos: {x: 50, y: 50},
            vel: {x: 0, y: 1/8}
        }, function () {
            this.pos.y += this.vel.y;
            this.pos.x = 5 * Math.tan(this.pos.y / 2) + 50;
            if (this.pos.y > 100 || this.pos.y < 0) {
                this.vel.y = -this.vel.y;
            }
        });

        this.addmode("ermahgerd", {
            pos: {x: 50, y: 50},
            vel: {x: 1, y: 1}
        }, function () {
            this.vel.x = (Math.random()*10)-5;
            this.pos.x += this.vel.x;
            this.vel.y = (Math.random()*10)-5;
            this.pos.y += this.vel.y;
            if (this.pos.x > 100) {
                this.pos.x = 100;
            }
            if (this.pos.y < 0) {
                this.pos.y = 0;
            }
            if (this.pos.y > 100) {
                this.pos.y = 100;
            }
        });

        this.addmode("random", {
            pos: {x: Math.random()*100, y: Math.random()*100},
            vel: {x: 0, y: 0}
        }, function () {
            this.pos.x = Math.random()*100;
            this.pos.y = Math.random()*100;
        });

        this.addmode("secant", {
            pos: {x: 50, y: 50},
            vel: {x: 1/8, y: 0}
        }, function () {
            this.pos.x += this.vel.x;
            this.pos.y = 1/(Math.cos(this.pos.x/10)/10) + 50;
            if (this.pos.x > 100 || this.pos.x < 0) {
                this.vel.x = -this.vel.x;
            }
        });

        this.addmode("cotan", {
            pos: {x: 50, y: 50},
            vel: {x: 1/8, y: 0}
        }, function () {
            this.pos.x += this.vel.x;
            this.pos.y = 1/(Math.tan(this.pos.x/10)/10) + 50;
            if (this.pos.x > 100 || this.pos.x < 0) {
                this.vel.x = -this.vel.x;
            }
        });

        this.addmode("vsec", {
            pos: {x: 50, y: 50},
            vel: {x: 0, y: 1/8}
        }, function () {
            this.pos.y += this.vel.y;
            this.pos.x = 1/(Math.cos(this.pos.y/10)/10) + 50;
            if (this.pos.y > 100 || this.pos.y < 0) {
                this.vel.y = -this.vel.y;
            }
        });

        this.addmode("vcot", {
            pos: {x: 50, y: 50},
            vel: {x: 0, y: 1/8}
        }, function () {
            this.pos.y += this.vel.y;
            this.pos.x = 1/(Math.tan(this.pos.y/10)/10) + 50;
            if (this.pos.y > 100 || this.pos.y < 0) {
                this.vel.y = -this.vel.y;
            }
        });

        this.addmode("ellipse", {
            pos: {x: 50, y: 50},
            vel: {x: 0, y: 0},
            a: 0
        }, function () {
            this.a += .005;
            if (this.a > 360) {
                this.a = 0;
            }
            this.pos.x = Math.cos(this.a) * 25 + 50;
            this.pos.y = Math.sin(this.a) * 25 + 50;
        });
        
        this.load(this.modes[Math.floor(Math.random()*this.modes.length)].mode);
    }
}

module.exports = (bot) => {
    return new CursorHandler(bot);
}