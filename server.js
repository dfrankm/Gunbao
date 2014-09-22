var conf = require('./config/config.json');
var Game = require('./models/Game.js');
var Map  = require('./models/Map.js');

GLOBAL.map  = new Map('metamine');
GLOBAL.game = new Game(map);

// **************************************************** // Configuración de Express
var Express = require('express');                       // Carga el módulo Express
var Jade    = require('jade');                          // Carga el módulo Jade
var app     = Express();                                // Crea la aplicación Express
app.use(Express.static(__dirname + '/public'));         // Servidor de archivos de la carpeta "public"
app.set('view engine', 'jade');                         // Establece Jade como motor de vistas
app.engine('jade', Jade.__express);                     // Procesa los archivos ".jade" con "Jade.__express()"
app.set('views', __dirname + '/views');                 // Establece la carpeta de las vistas

// **************************************************** // Manejadores de rutas
var routes = require('./controllers/routes.js');
app.get('/', routes.index);
app.get('/gumbao', routes.gumbao);
app.get('/config', routes.config);

// **************************************************** // Configuración de Socket.io
var SocketIO = require('socket.io');                    // Carga el módulo Socket.io
var io       = SocketIO.listen(app.listen(conf.port));  // Instancia el objeto Socket.io
GLOBAL.io    = io;                                      // Hace visible la variable io globalmente

// **************************************************** // Manejador de eventos
var events = require('./controllers/events.js');

console.log('escuchando en el puerto ' + conf.port);    // LOG