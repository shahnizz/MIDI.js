var midi = function () {
    var api = {};
    var loader = require('./midi/loader')();
    var player = require('./midi/player')();
    return loader;
};

module.exports = midi;
window.globalmidi = midi;