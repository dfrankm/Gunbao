// Constantes del juego
var WIDTH  = 1024;
var HEIGHT = 512;
var RADIUS = 10;
var RSHOOT = 5;

function drawCharge(data) {
    var game = data.game;
    var player = data.player;
    drawGame(game);
    drawPowerBar(player);
}

function drawGame(game, id) {
    var players  = game.players;
    
    var canvas = document.getElementById('playground');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    for (var i = 0; i < players.length; i++) {
        drawPlayer(players[i]);
        if (players[i].id == id) {
            drawPowerBar(players[i]);
        }
    }
    
    if (game.shoot) {
        drawShoot(game.shoot);
    }
//     drawTimer(game.remtime);
//     drawMessages(game.msgList);
}

function drawPlayer(player) {
    var x = player.x;
    var y = player.y;
    var a = player.angle;
    
    var canvas = document.getElementById('playground');
    var ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, 2*Math.PI, true);
    ctx.fillStyle = player.color;
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + RADIUS*Math.cos(a), y - RADIUS*Math.sin(a));
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = "#000000";
    ctx.fillText(player.name, x - 20, y - 50);
    ctx.fillText(player.life, x - 20, y - 40);
    ctx.fillText(Math.round(a*180/Math.PI) + '°', x - 20, y - 30);
}

function drawMessages(lmssg) {
    var canv = document.getElementById('playground');
    var cntx = canv.getContext('2d');
    for(var i = 0; i < 5; i++) {
        if (lmssg[i]) {
            cntx.fillText(lmssg[i], 5, 30 + 10*i);
        }
    }
}

function drawPowerBar(player) {
    var canvas = document.getElementById('playground');
    var ctx = canvas.getContext('2d')
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 500, 1024, 12);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 500, 10.24*player.power, 12);
}

function drawShoot(shoot) {
    var x = shoot.x;
    var y = shoot.y;
    var canvas = document.getElementById('playground');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x, y, RSHOOT, 0, 2*Math.PI, true);
    ctx.fill();
}

function drawTimer(time) {
    var canv = document.getElementById('playground');
    var cntx = canv.getContext('2d');
    cntx.fillText(time, 1000, 20);
}
