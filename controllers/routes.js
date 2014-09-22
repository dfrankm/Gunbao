var conf = require('../config/config.json');

exports.config = function(req, res) {
    res.json(conf);
};

exports.gumbao = function(req, res) {
    res.render('gumbao');
};

exports.index = function(req, res) {
    res.render('index');
};