var Game = function(map) {
    this.map     = map;
    this.players = [];
    this.shoot   = null;
};

Game.prototype.addPlayer = function(player) {
    this.players.push(player);
};

Game.prototype.delPlayer = function(player) {
    var id = player.id;
    var nplayers = this.players.length;
    for (var i = 0; i < nplayers; i++) {
        if (this.players[i].id == id) {
            this.players.splice(i, 1);
            return;
        }
    }
};

module.exports = Game;