var conf = require('../config/config.json');

var Player = function(name, id) {
    this.angle = 0;
    this.color = getRandomColor();
    this.id = id;
    this.life = 100;
    this.name = name;
    this.power = 0;
    this.prevpower = 0;
    this.side = 'right';
    this.x = 0;
    this.y = 0;
};

/* ****************************************************************************************************************** *
 * FUNC:
 *          down
 * DESC:
 *          Cambia el ángulo descendiendolo un grado respecto a la horizontal
 * ****************************************************************************************************************** */
Player.prototype.down = function() {
    var side = this.side;
    var angle = this.angle;
    if (side == 'right' && angle > -Math.PI/2) {
        this.angle -= Math.PI/180;
    } else if (side == 'left' && angle < 3*Math.PI/2) {
        this.angle += Math.PI/180;
    }
};

/* ****************************************************************************************************************** *
 * FUNC:
 *          flip
 * DESC:
 *          Cambia el valor de "side" y "angle" del jugador de acuerdo a la flecha presionada.
 * ARGS:
 *          map : Map
 * ****************************************************************************************************************** */
Player.prototype.flip = function() {
    this.angle = Math.PI - this.angle;      // Refleja el ángulo verticalmente
    if (this.side == 'right')               // Si está apuntando hacia la derecha
        this.side = 'left';                 // Ahora apunta hacia la izquierda
    else                                    // Si está apuntando hacia la izquierda
        this.side = 'right';                // Ahora apunta hacia la derecha
};

/* ****************************************************************************************************************** *
 * FUNC:
 *          getRandomColor
 * DESC:
 *          Genera un color en formato hexadecimal (#RRGGBB) aleatoriamente.
 * ****************************************************************************************************************** */
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/* ****************************************************************************************************************** *
 * FUNC:
 *          lstep
 * DESC:
 *          Cambia los valores de posición en los ejes X e Y para simular un paso a la izquierda.
 * ARGS:
 *          map : Map
 * ****************************************************************************************************************** */
Player.prototype.lstep = function(map) {
    var i     = map.getIntervalIdx(this.x);     // Intervalo del mapa donde está el jugador
    var m     = map.points[i].m;                // Pendiente del intervalo
    var theta = Math.atan(m);                   // Ángulo del intervalo
    var step  = conf.movestep;                  // Tamaño del paso
    this.x   -= step*Math.cos(theta);           // Paso en el eje X
    this.y   -= step*Math.sin(theta);           // Paso en el eje Y
};

/* ****************************************************************************************************************** *
 * FUNC:
 *          putOnMapRandomly
 * DESC:
 *          Establece los valores de "x" e "y" de este jugador de manera que concuerde con el mapa establecido en el 
 *          juego.
 * ARGS:
 *          map : Map
 * ****************************************************************************************************************** */
Player.prototype.putOnMapRandomly = function(map) {
    var n  = map.points.length;                         // Número de puntos angulares en el mapa
    console.log("Player.putOnMapRandomly, n = " + n);
    var x  = Math.random()*(conf.width);                // Genera un número aleatorio dentro del ancho del mapa
    console.log("Player.putOnMapRandomly, x = " + x);
    var y  = map.getY(x);                               // Valor "y" del mapa en "x"
    this.x = x;                                         // Establece la posición horizontal del jugador
    this.y = y - conf.radius;                           // Establece la posición vertical del jugador
};

/* ****************************************************************************************************************** *
 * FUNC:
 *          rstep
 * DESC:
 *          Cambia los valores de posición en los ejes X e Y para simular un paso a la derecha.
 * ARGS:
 *          map : Map
 * ****************************************************************************************************************** */
Player.prototype.rstep = function(map) {
    var i     = map.getIntervalIdx(this.x);     // Intervalo del mapa donde está el jugador
    var m     = map.points[i].m;                // Pendiente del intervalo
    var theta = Math.atan(m);                   // Ángulo del intervalo
    var step  = conf.movestep;                  // Tamaño del paso
    this.x   += step*Math.cos(theta);           // Paso en el eje X
    this.y   += step*Math.sin(theta);           // Paso en el eje Y
};

/* ****************************************************************************************************************** *
 * FUNC:
 *          up
 * DESC:
 *          Cambia el ángulo elevandolo un grado respecto a la horizontal
 * ****************************************************************************************************************** */
Player.prototype.up = function() {
    var side = this.side;
    var angle = this.angle;
    if (side == 'right' && angle < Math.PI/2) {
        this.angle += Math.PI/180;
    } else if (side == 'left' && angle > Math.PI/2) {
        this.angle -= Math.PI/180;
    }
};

module.exports = Player;