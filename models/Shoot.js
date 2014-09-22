var conf = require('../config/config.json');
var io = GLOBAL.io;
var game = GLOBAL.game;

var Shoot = function(player) {
    this.angle = player.angle;
    this.x0 = player.x + (conf.radius + conf.rshoot)*Math.cos(this.angle);
    this.y0 = player.y - (conf.radius + conf.rshoot)*Math.sin(this.angle);
    console.log("Shoot, x0 = " + this.x0);
    console.log("Shoot, y0 = " + this.y0);
    this.x = this.x0;
    this.y = this.y0;
    this.v = player.power;
};

Shoot.prototype.detectCollision = function() {
    var x = this.x;
    var y = this.y;
    var mapy = game.map.getY(x);
    
    if (Math.abs(mapy - y) < conf.rshoot) {
        return true;
    }
    
    var players = game.players;
    var nplayers = game.players.length;
    
    for (var i = 0; i < nplayers; i++) {
        var dx = players[i].x - x;
        var dy = players[i].y - y;
        if (Math.sqrt(dx*dx + dy*dy) < conf.radius + conf.rshoot) {
            return true;
        }
    }
    
    return false;
}

Shoot.prototype.step = function() {
    var delta = conf.shootstep;
    var x0 = this.x0;
    var y0 = this.y0;
    console.log("Shoot.step, x0 = " + this.x0);
    console.log("Shoot.step, y0 = " + this.y0);
    var x = this.x;
    var a = this.angle;
    var v = this.v;
    var g = 10*conf.gravity;
    this.x = x + delta*v*Math.cos(a);
    x = this.x;
    console.log("Shoot.step, x = " + x);
    console.log("Shoot.step, a = " + a);
    this.y = y0 - (x-x0)*Math.tan(a) + (g*(x-x0)*(x-x0))/(2*v*v*Math.cos(a)*Math.cos(a));
    console.log("Shoot.step, y = " + this.y);
};

module.exports = Shoot;