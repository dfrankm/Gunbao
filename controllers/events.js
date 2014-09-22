var Player = require('../models/Player.js');
var Shoot = require('../models/Shoot.js');

var game = GLOBAL.game;
var io   = GLOBAL.io;

var names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');  

io.sockets.on('connection', function(socket) {
    var id = socket.id;
    var player = null;
    console.log("Nueva conexión entrante: " + id);
    socket.on('newclient', function() {                 // EVENTO:  Nuevo cliente
        var name = names.shift();                       //          Saca el primer nombre de la lista
        player = new Player(name, id);                  //          Crea el objeto Jugador
        player.putOnMapRandomly(game.map);              //          Posiciona al jugador aleatoriamente en el mapa
        game.addPlayer(player);                         //          Agrega el nuevo jugador al juego
        socket.emit('setid', id);                       //          Envía el id al cliente
        io.sockets.emit('refresh', game);               //          Refrescar a los clientes
    });
    socket.on('leftkey', function() {                   // EVENTO:  Tecla izquierda presionada
        if (player.side == 'right')                     //          Si el jugador está mirando hacia la derecha
            player.flip();                              //          ...Voltear a la izquierda
        player.lstep(game.map);                         //          Dar un paso a la izquierda
        io.sockets.emit('refresh', game);               //          Refrescar a los clientes
    });
    socket.on('upkey', function() {                     // EVENTO:  Tecla arriba presionada
        player.up();                                    //          Elevar el ángulo un grado
        io.sockets.emit('refresh', game);               //          Refrescar a los clientes
    });
    socket.on('rightkey', function() {                  // EVENTO:  Tecla derecha presionada
        if (player.side == 'left')                      //          Si el jugador está mirando hacia la izquierda
            player.flip();                              //          ...Voltear a la derecha
        player.rstep(game.map);                         //          Dar un paso a la derecha
        io.sockets.emit('refresh', game);               //          Refrescar a los clientes
    });
    socket.on('downkey', function() {                   // EVENTO:  Tecla abajo presionada
        player.down();                                  //          Disminuye el ángulo un grado
        io.sockets.emit('refresh', game);               //          Refrescar a los clientes
    });
    socket.on('spacekey', function() {                  // EVENTO:  Barra espaciadora presionada
        if (player.power < 100) {                       //          Si el poder cargado es menor al máximo
            player.power += 1;                          //          Aumentar el poder en uno
            if (player.power == 100) {                  //          Si el poder llega al máximo
                var motion = setInterval(function() {
                    game.shoot.step();
                    if (game.shoot.detectCollision()) {
                        clearInterval(motion);
                        player.power = 0;
                    }
                    io.sockets.emit('refresh', game);
                }, 30);
            }
        }
        io.sockets.emit('refresh', game);
    });
    socket.on('shoot', function() {
        game.shoot = new Shoot(player);
        var motion = setInterval(function() {
            game.shoot.step();
            if (game.shoot.detectCollision()) {
                clearInterval(motion);
                player.power = 0;
            }
            io.sockets.emit('refresh', game);
        }, 30);
    });
    socket.on('disconnect', function() { 
        console.log("Conexión saliente: " + id);
        game.delPlayer(player);
        io.sockets.emit('refresh', game);
    });
});