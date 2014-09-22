var Map = function(name) {
    this.name   = name;
    this.points = require('../data/maps/' + name + '.json');
};

/* ****************************************************************************************************************** *
 * FUNC:
 *          getIntervalIdx
 * DESC:
 *          Dado un valor "x", devuelve el índice del intervalo en el mapa donde cae dicho valor.
 * ARGS:
 *          x : float
 * ****************************************************************************************************************** */
Map.prototype.getIntervalIdx = function(x) {
    var n = this.points.length;                                 // Número de puntos angulares en el mapa
    console.log("Map.getIntervalIdx, x = " + x);
    console.log("Map.getIntervalIdx, n = " + n);
    for (var i = 0; i < n-1; i++)                               // Iteraciones sobre los intervalos
        if (this.points[i].x < x && x < this.points[i+1].x)     // Si el valor de "x" está en el intervalo "i"
            return i;                                           // Devuelve el índice del intervalo "i"
    return n-1;
}

/* ****************************************************************************************************************** *
 * FUNC:
 *          getY
 * DESC:
 *          Dado un valor "x", devuelve el valor "y" del mapa
 * ARGS:
 *          x : float
 * ****************************************************************************************************************** */
Map.prototype.getY = function(x) {
    console.log("Map.getY, x = " + x);
    var i  = this.getIntervalIdx(x);    // Intervalo donde cae "x"
    console.log("Map.getY, i = " + i);
    var x0 = this.points[i].x;          // Punto inicial del intervalo en el eje X
    var y0 = this.points[i].y;          // Punto inicial del intervalo en el eje Y
    var m  = this.points[i].m;          // Pendiente del intervalo
    return y0 + m*(x - x0);             // Ecuación de la linea
};


module.exports = Map;