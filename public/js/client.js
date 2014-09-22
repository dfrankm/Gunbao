var conf = null;                                    // Objeto con las configuraciones del juego
var addr = document.location.host;                  // Dirección del servidor (dominio o IP:PORT)

$.getJSON('config', function(res) {
    conf = res;
});

var socket = null;

window.onload = function() {
    console.log("addr = " + addr);
    socket  = io.connect(addr);
    socket.emit('newclient');
    socket.on('setid', setid);
    
    // **************************************************** // Truco para hacer que el canvas posea eventos de teclado
    var canvas = document.getElementById('playground');
    canvas.tabIndex = 1000;
    canvas.style.outline = 'none';
    console.log(socket.id);
    // **************************************************** // Registro de eventos
    socket.on('refresh', function(game) {
        drawGame(game, socket.id);
    });
    socket.on('update', drawCharge);
    canvas.addEventListener('keydown', function(e) {
        if (e.which == 37)
            socket.emit('leftkey');
        else if (e.which == 38)
            socket.emit('upkey');
        else if (e.which == 39)
            socket.emit('rightkey');
        else if (e.which == 40)
            socket.emit('downkey');
        else if (e.which == 32)
            socket.emit('spacekey');
    });
    canvas.addEventListener('keyup', keyup);
};

function setid(id) {
    socket.id = id;
}

function keyup(e) {
    if (e.which == 32)
        socket.emit('shoot');
}