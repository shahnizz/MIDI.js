var midi = function () {
    var api = {};
    var loader = require('./midi/loader')();


    loader.loadPlugin({
        soundfontUrl: "./soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {
            var delay = 0; // play one note every quarter second
            var note = 50; // the MIDI note
            var velocity = 127; // how hard the note hits
            console.log(loader);
            // play the note
            loader.player.setVolume(0, 127);
            loader.player.noteOn(0, note, velocity, delay);
            loader.player.noteOff(0, note, delay + 0.75);
        }


    });
    var config = {};

    return api;
};
module.exports = midi;
window.globalmidi = midi;