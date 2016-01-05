var midi = function () {
    var api = {};
    var loader = require('./midi/loader')();
    console.log(loader);
    var config = {};

    return api;
};
module.exports = midi;
window.globalmidi = midi;